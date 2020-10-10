import { Center, Text, Box, AspectRatio, Image } from '@chakra-ui/core'

const GalleryThumbnail = ({ name, src }) => {
  return (
    <Box role="group">
      <AspectRatio maxWidth="400px" ratio={4 / 3}>
        <Image objectFit="cover" src={src} alt={name} />
      </AspectRatio>

      <Center>
        <Text
          display={{ base: 'block', md: 'none' }}
          _groupHover={{ display: 'block' }}
          color="white"
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
          position="relative"
          mt="-70px"
          zIndex="1"
        >
          {name}
          <br />
          September 2020
        </Text>
      </Center>
    </Box>
  )
}

export default GalleryThumbnail
