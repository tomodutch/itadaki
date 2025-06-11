const { PrismaClient } = require("../src/db/generated/prisma/client");
const prisma = new PrismaClient()

async function main() {
    const categories = [
        {
            key: "Breakfast",
            order: 0
        },
        {
            key: "Lunch",
            order: 1
        },
        {
            key: "Dinner",
            order: 2
        },
        {
            key: "Snack",
            order: 3
        }
    ];

    const resp = await Promise.all(categories.map(({ key, order }) => {
        return prisma.diaryEntryCategory.upsert({
            where: { key },
            update: {order},
            create: {
                key,
                order
            }
        })
    }))

    console.log(`The following categories have been upserted: ${resp.map((r) => r.key).join(",")}`);
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })