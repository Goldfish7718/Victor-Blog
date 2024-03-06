import { Box, Heading } from "@chakra-ui/react"

const Navbar = () => {
  return (
    <>
        <Box p={3} bgColor='#1a8cff' display='flex' flexDirection='row' boxShadow="lg" justifyContent='space-between'>
            <Heading color='white' fontSize={32}>Victor Blog</Heading>
        </Box>
    </>
  )
}

export default Navbar