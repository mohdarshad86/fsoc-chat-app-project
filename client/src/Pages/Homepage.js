import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'
import { useHistory } from 'react-router-dom'

const Homepage = () => {

  const history = useHistory()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'))

    if (user) {
      history.push('/chats')
      window.location.reload();
      // history.push('/')
    }

  }, [history]);

  return <Container maxW="xl" centerContent>
    <Box
      display="flex"
      justifyContent="centre"
      p={3}
      bg={"white"}
      w={"100%"}
      m="40px 0 15px 0"
      borderRadius="1g"
      borderWidth="1px"
    >
      <Text fontSize="4xl" fontFamily="work sans" color="black">Chat App</Text>
    </Box>
    <Box bg='white' w='100%' p={4} borderRadius='1g' borderWidth='1px'>
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList mb='1em'>
          <Tab width='50%'>Login</Tab>
          <Tab width='50%'>SignUp</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Container>
}

export default Homepage