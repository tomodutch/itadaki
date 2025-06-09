const { PrismaClient } = require("../src/db/generated/prisma/client");
const prisma = new PrismaClient()

async function main() {
    const categories = [
        {
            key: "Breakfast"
        },
        {
            key: "Lunch"
        },
        {
            key: "Dinner"
        },
        {
            key: "Snack"
        }
    ];

    const resp = await Promise.all(categories.map(({ key }) => {
        return prisma.diaryEntryCategory.upsert({
            where: { key },
            update: {},
            create: {
                key
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