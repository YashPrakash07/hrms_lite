import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/db/schema';
import { z } from 'zod';
import { desc, eq, or } from 'drizzle-orm';

const employeeSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Department is required"),
});

export async function GET() {
  try {
    const result = await db.query.employees.findMany({
      orderBy: [desc(employees.createdAt)]
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = employeeSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const { employeeId, fullName, email, department } = validatedData.data;

    // Check for duplicates
    const existing = await db.query.employees.findFirst({
      where: or(eq(employees.employeeId, employeeId), eq(employees.email, email))
    });

    if (existing) {
      if (existing.email === email) {
         return NextResponse.json({ error: { email: ['Email already exists'] } }, { status: 409 });
      }
       return NextResponse.json({ error: { employeeId: ['Employee ID already exists'] } }, { status: 409 });
    }

    const [employee] = await db.insert(employees).values({
        employeeId,
        fullName,
        email,
        department
    }).returning();

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("Create Employee API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
