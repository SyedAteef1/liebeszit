import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BookDemo from '@/models/BookDemo';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { name, email, companyName, companyHeadcount } = await request.json();
    
    const bookDemo = new BookDemo({
      name,
      email,
      companyName,
      companyHeadcount,
    });
    
    await bookDemo.save();
    
    return NextResponse.json({ success: true, message: 'Demo booking saved successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
