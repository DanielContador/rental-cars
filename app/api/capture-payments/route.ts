import { NextRequest, NextResponse } from 'next/server';

export async function GET(_:any) {
  return NextResponse.json({ success: true, message: 'Ruta básica funcional' });
}
