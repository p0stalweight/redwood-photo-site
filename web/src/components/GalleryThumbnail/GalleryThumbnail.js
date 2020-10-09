import { Box, AspectRatio, Image } from '@chakra-ui/core'

const GalleryThumbnail = ({ name, src }) => {
  return (
    <Box role="group">
      <AspectRatio maxWidth="400px" ratio={4 / 3}>
        <Image objectFit="cover" src={src} alt={name} />
      </AspectRatio>
      <Box
        as="h2"
        color="white"
        fontWeight="bold"
        display="none"
        position="relative"
        mt="-50px"
        zIndex="1"
        textAlign="center"
        _groupHover={{ display: 'block' }}
      >
        {name}
        <br />
        September 2020
      </Box>
    </Box>
  )
}

export default GalleryThumbnail
