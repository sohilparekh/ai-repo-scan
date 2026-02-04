import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    quotes: [
      { id: 1, quote: "Test quote 1", kind: "Fact" },
      { id: 2, quote: "Test quote 2", kind: "Opinion" }
    ]
  })
}
