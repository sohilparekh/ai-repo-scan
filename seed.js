const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Add sample quotes
  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      kind: "Opinion"
    },
    {
      text: "The Earth revolves around the Sun.",
      kind: "Fact"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      kind: "Opinion"
    },
    {
      text: "Water boils at 100 degrees Celsius at sea level.",
      kind: "Fact"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      kind: "Opinion"
    }
  ];

  for (const quote of quotes) {
    await prisma.quotes.create({
      data: quote
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
