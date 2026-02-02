import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { attendance, employees } from '@/db/schema';
import { z } from 'zod';
import { eq, and, desc } from 'drizzle-orm';

// We accept YYYY-MM-DD string or ISO
const attendanceSchema = z.object({
  employeeId: z.number().int(),
  date: z.string(), 
  status: z.enum(["PRESENT", "ABSENT"]),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const employeeId = searchParams.get('employeeId');
  const dateStr = searchParams.get('date');

  try {
     const conditions = [];
     if (employeeId) conditions.push(eq(attendance.employeeId, parseInt(employeeId)));
     if (dateStr) {
        const d = new Date(dateStr);
        d.setHours(0,0,0,0);
        conditions.push(eq(attendance.date, d));
     }
     
    const records = await db.select({
        id: attendance.id,
        date: attendance.date,
        status: attendance.status,
        employeeId: attendance.employeeId,
        employee: {
            fullName: employees.fullName,
            employeeId: employees.employeeId
        }
    })
    .from(attendance)
    .innerJoin(employees, eq(attendance.employeeId, employees.id))
    .where(and(...conditions))
    .orderBy(desc(attendance.date))
    .limit(200);

    return NextResponse.json(records);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = attendanceSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const { employeeId, date, status } = validatedData.data;
    
    // Normalize date to 00:00:00
    const recordDate = new Date(date);
    recordDate.setHours(0, 0, 0, 0);

    // Upsert equivalent in SQLite with Drizzle is not directly one-method, 
    // but since we don't have a unique constraint on DB level for sqlite (complex index),
    // we do check-then-insert/update logic for safety or rely on app logic.
    // However, we can use onConflictDoUpdate if we have the unique constraint.
    // In schema.ts we haven't strictly enforced unique index on [employeeId, date] yet in Drizzle schema definition manner for SQLite specifically easily without raw sql sometimes.
    // Let's do a meaningful check first.
    
    const existing = await db.query.attendance.findFirst({
        where: and(eq(attendance.employeeId, employeeId), eq(attendance.date, recordDate))
    });

    let record;
    if (existing) {
        [record] = await db.update(attendance)
            .set({ status })
            .where(eq(attendance.id, existing.id))
            .returning();
    } else {
        [record] = await db.insert(attendance).values({
            employeeId,
            date: recordDate,
            status
        }).returning();
    }

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Attendance Error:", error);
    return NextResponse.json({ error: 'Failed to mark attendance' }, { status: 500 });
  }
}
