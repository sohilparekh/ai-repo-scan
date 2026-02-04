import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { QuoteKind } from '@/lib/enums'

export async function POST() {
  try {
    // Add sample quotes
    const quotes = [
      {
        quote: "The only way to do great work is to love what you do.",
        kind: QuoteKind.Opinion
      },
      {
        quote: "The Earth revolves around the Sun.",
        kind: QuoteKind.Fact
      },
      {
        quote: "Innovation distinguishes between a leader and a follower.",
        kind: QuoteKind.Opinion
      },
      {
        quote: "Water boils at 100 degrees Celsius at sea level.",
        kind: QuoteKind.Fact
      },
      {
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        kind: QuoteKind.Opinion
      }
    ];

    for (const quote of quotes) {
      await prisma.quotes.create({
        data: quote
      });
    }

    return NextResponse.json({ message: 'Database seeded successfully!', count: quotes.length })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}
