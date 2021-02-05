import { Center, Text, Box, AspectRatio, Image } from '@chakra-ui/core'


const GalleryThumbnail = ({ name, iconImageURL, tripDate }) => {
    console.log(tripDate)

    const getYear = () => {
      if (typeof tripDate === 'undefined'){
        return
      }
      return tripDate.slice(0,4)
    }

    const getMonth = () => {
      if (typeof tripDate === 'undefined'){
        return
      }
      let month = tripDate.slice(5,7)
      let months = {
        "01" : "January",
        "02" : "February",
        "03" : "March",
        "04" : "April",
        "05" : "May",
        "06" : "June",
        "07" : "July",
        "08" : "August",
        "09" : "September",
        "10" : "October",
        "11" : "November",
        "12" : "December,"
      }
      return months[month] + " "
    }

  return (
    <Box role="group">
      <AspectRatio maxWidth="400px" ratio={4 / 3}>
        <Image objectFit="cover" src={iconImageURL} alt={name} />
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
          <br/>
          {getMonth()}
          {getYear()}

        </Text>
      </Center>
    </Box>
  )
}

export default GalleryThumbnail
