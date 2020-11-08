import { memo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { AspectRatio, Image } from '@chakra-ui/core'

const DragPhoto = memo(({ photo, onMovePhoto }) => {
  const ref = useRef(null)

  const [{ isDragging }, connectDrag] = useDrag({
    item: { id: photo.id, type: 'PHOTO' },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  })

  const [, connectDrop] = useDrop({
    accept: 'PHOTO',
    hover(hoveredOverPhoto) {
      if (hoveredOverPhoto.id !== photo.id) {
        onMovePhoto(hoveredOverPhoto.id, photo.id)
      }
    },
  })

  connectDrag(ref)
  connectDrop(ref)

  return (
    <AspectRatio ref={ref} maxWidth="200px" ratio={4 / 3}>
      <Image
        objectFit="cover"
        src={photo.imageURL}
        opacity={isDragging ? 0.5 : 1}
      />
    </AspectRatio>
  )
})

export default DragPhoto
