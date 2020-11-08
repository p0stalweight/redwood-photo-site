import { Container, SimpleGrid } from '@chakra-ui/core'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragPhoto from 'src/components/DragPhoto'

const move = (array, oldIndex, newIndex) => {
  if (newIndex >= array.length) {
    newIndex = array.length - 1
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
  return array
}

const moveElement = (array, index, offset) => {
  const newIndex = index + offset

  return move(array, index, newIndex)
}

const DndPhotoGrid = ({ photos, setPhotos }) => {
  const movePhoto = (sourceId, destinationId) => {
    const sourceIndex = photos.findIndex((photo) => photo.id === sourceId)

    const destinationIndex = photos.findIndex(
      (photo) => photo.id === destinationId
    )

    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return
    }

    const offset = destinationIndex - sourceIndex

    const movedPhotos = moveElement(photos, sourceIndex, offset).map(
      (photo, i) => ({
        ...photo,
        order: i + 1,
      })
    )

    setPhotos([...movedPhotos])
  }

  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <SimpleGrid columns={3} spacing={2} mt={8}>
          {photos &&
            photos.map((photo) => (
              <DragPhoto key={photo.id} photo={photo} onMovePhoto={movePhoto} />
            ))}
        </SimpleGrid>
      </DndProvider>
    </Container>
  )
}

export default DndPhotoGrid
