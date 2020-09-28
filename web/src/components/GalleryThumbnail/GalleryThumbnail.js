import { PseudoBox, AspectRatioBox, Image } from '@chakra-ui/core'

const GalleryThumbnail = ({ name, src }) => {
  return (
    <PseudoBox role="group">
      <AspectRatioBox maxWidth="400px" ratio={4 / 3}>
        <Image objectFit="cover" src={src} alt={name} />
      </AspectRatioBox>
      <PseudoBox
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
      </PseudoBox>
    </PseudoBox>
  )
}

export default GalleryThumbnail
