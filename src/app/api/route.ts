// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');
//   const res = await fetch(`https://data.mongodb-api.com/product/${id}`);
//   const product = await res.json();

//   return NextResponse.json({ product });
// }

// export async function POST() {
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     method: 'POST',
//     body: JSON.stringify({ time: new Date().toISOString() }),
//   });

//   const data = await res.json();

//   return NextResponse.json(data);
// }
