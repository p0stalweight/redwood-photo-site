/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

async function main() {
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:
  //
  //   const existing = await db.user.findMany({ where: { email: 'admin@email.com' }})
  //   if (!existing.length) {
  //     await db.user.create({ data: { name: 'Admin', email: 'admin@email.com' }})
  //   }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  const galleryData = [
    {
      name: 'John Muir Trail',
      iconImageURL: 'https://f002.backblazeb2.com/file/redwood-photo/JMT1.jpg',
    },
    {
      name: 'Sierras',
      iconImageURL: 'https://f002.backblazeb2.com/file/redwood-photo/S1.jpg',
    },
  ]

  const galleries = []

  await asyncForEach(galleryData, async (gallery) => {
    console.log(`Creating ${gallery.name}...`)
    galleries.push(
      await db.gallery.create({
        data: gallery,
      })
    )
  })

  const photoData = [
    // JMT gallery
    {
      order: 1,
      imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/JMT1.jpg',
      gallery: {
        connect: { id: 1 },
      },
    },
    {
      order: 2,
      imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/JMT2.jpg',
      gallery: {
        connect: { id: 1 },
      },
    },
    {
      order: 3,
      imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/JMT3.jpg',
      gallery: {
        connect: { id: 1 },
      },
    },
    {
      order: 4,
      imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/JMT4.jpg',
      gallery: {
        connect: { id: 1 },
      },
    },
    {
      order: 5,
      imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/JMT5.jpg',
      gallery: {
        connect: { id: 1 },
      },
    },

    // Sierras Gallery
    {
      order: 1,
      imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/S1.jpg',
      gallery: {
        connect: { id: 2 },
      },
    },
    {
      order: 2,
      imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/S1.jpg',
      gallery: {
        connect: { id: 2 },
      },
    },
    {
      order: 3,
      imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/S1.jpg',
      gallery: {
        connect: { id: 2 },
      },
    },
    {
      order: 4,
      imageURL: 'https://f002.backblazeb2.com/file/redwood-photo/S1.jpg',
      gallery: {
        connect: { id: 2 },
      },
    },
  ]

  const photos = []

  await asyncForEach(photoData, async (photo, index) => {
    console.log(`Creating photo ${index + 1}...`)
    photos.push(await db.review.create({ data: photo }))
  })

  console.info(`\nSeeded ${photos.length} photos\n`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
