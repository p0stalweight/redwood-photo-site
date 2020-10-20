import { db } from 'src/lib/db'

export const galleries = () => {
  return db.gallery.findMany()
}

export const gallery = ({ id }) => {
  return db.gallery.findOne({
    where: { id },
  })
}

export const gallerySize = ({ id }) => {
  return db.photo.count({
    where: {
      galleryId: id,
    },
  })
}

export const createGallery = ({ input }) => {
  return db.gallery.create({
    data: input,
  })
}

export const updateGallery = ({ id, input }) => {
  return db.gallery.update({
    data: input,
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
    db.gallery.findOne({ where: { id: root.id } }).photos(),
}
