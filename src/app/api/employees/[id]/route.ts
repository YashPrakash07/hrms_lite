import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const intId = parseInt(id);

    if (isNaN(intId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await db.delete(employees).where(eq(employees.id, intId));

    return NextResponse.json({ success: true });
  } catch (error) {
     console.error("Delete Error:", error);
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
  }
}
