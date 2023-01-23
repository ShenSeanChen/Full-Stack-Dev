import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.$connect()
  
    await prisma.user.create({
      data: {
        name: 'Rich',
        email: 'hello@prisma.com',
        posts: {
          create: {
            title: 'My first post',
            body: 'Lots of really interesting stuff',
            slug: 'my-first-post',
          },
        },
      },
    })

    const author = await prisma.author.create({
      data: {
        name: "Shen Sean Chen"
      }
    })
  
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
      },
    })
    console.dir(allUsers, { depth: null })
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