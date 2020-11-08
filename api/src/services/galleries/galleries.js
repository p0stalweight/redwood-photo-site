import { db } from 'src/lib/db'

export const galleries = () => {
  return db.gallery.findMany()
}

export const gallery = ({ id }) => {
  return db.gallery.findOne({
    where: { id },
  })
}

export const createGallery = ({ input }) => {
  return db.gallery.create({
    data: input,
  })
}

export const updateGallery = ({ id, input }) => {
  // format photos for nested write
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

export const deleteGallery = ({ id }) => {
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
