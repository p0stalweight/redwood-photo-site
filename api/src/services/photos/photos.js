import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

const foreignKeyReplacement = (input) => {
  let output = input
  const foreignKeys = Object.keys(input).filter((k) => k.match(/Id$/))
  foreignKeys.forEach((key) => {
    const modelName = key.replace(/Id$/, '')
    const value = input[key]
    delete output[key]
    output = Object.assign(output, {
      [modelName]: { connect: { id: value } },
    })
  })
  return output
}

export const photos = () => {
  return db.photo.findMany()
}

export const photo = ({ id }) => {
  return db.photo.findOne({
    where: { id },
  })
}

export const photoByGalleryIdAndOrder = ({ galleryId, order }) => {
  return db.photo.findFirst({
    where: {
      galleryId,
      order,
    },
  })
}

export const createPhoto = ({ input }) => {
  requireAuth()
  return db.photo.create({
    data: foreignKeyReplacement(input),
  })
}

export const updatePhoto = ({ id, input }) => {
  requireAuth()
  return db.photo.update({
    data: foreignKeyReplacement(input),
    where: { id },
  })
}

export const deletePhoto = ({ id }) => {
  requireAuth()
  return db.photo.delete({
    where: { id },
  })
}

export const Photo = {
  gallery: (_obj, { root }) =>
    db.photo.findOne({ where: { id: root.id } }).gallery(),
}
