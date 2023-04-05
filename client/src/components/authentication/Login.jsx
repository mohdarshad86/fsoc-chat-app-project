import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
  const [show, setSow] = useState(false)
    const [phone, setPhone] = useState()

    //Not needed but good to have
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleclick = () => setSow(!show)

    const submitHandler=()=>{}

    return <VStack spacing='5px'>
        <FormControl id='phone' isRequired>
            <FormLabel>Phone</FormLabel>
            <Input placeholder='Enter Your Phone'
                onChange={(e) => setPhone(e.target.value)}
            />

        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? "text" : 'password'}
                    placeholder='Enter Your Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleclick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
            colorScheme='blue'
            width='100%'
            style={{ marginTop: 15 }}
            onClick={submitHandler}
        >
            Login
        </Button>
    </VStack>
}

export default Login