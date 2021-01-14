import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const galleries = () => {
  return db.gallery.findMany()
}

export const gallery = ({ id }) => {
  return db.gallery.findOne({
    where: { id },
  })
}

export const createGallery = ({ input }) => {
  requireAuth()
  return db.gallery.create({
    data: input,
  })
}

export const updateGallery = ({ id, input }) => {
  // format photos for nested write
  requireAuth()
  const photos = {
    update: input.photos.map(({ order, id }) => ({
      data: { order },
      where: { id },
    })),
  }

  return db.gallery.update({
    data: { ...input, photos },
    where: { id },
  })
}

const getNumberOfPhotosInGallery = ( id ) => {
  return db.photo.count({ where: { id } })
}

export const addPhotosToGallery = ({ id, input }) => {
  requireAuth()
  return db.gallery.update({
    where: { id },
    data: {
      photos: {
          create: input.photos.map(({ order, imageURL }) => ({
            order,
            imageURL
          })),
        }
    },
  })
}

export const changeGallery = ({ id, input }) => {
  requireAuth()

  return db.gallery.update({
    data: { ...input },
    where: { id },
  })
}

export const deleteGallery = ({ id }) => {
  requireAuth()
  return db.gallery.delete({
    where: { id },
  })
}

export const Gallery = {
  photos: (_obj, { root }) =>
    db.gallery.findOne({ where: { id: root.id } }).photos({
      orderBy: {
        order: 'asc',
      },
    }),
  size: (_obj, { root }) =>
    db.photo.count({
      where: {
        galleryId: root.id,
      },
    }),
}
