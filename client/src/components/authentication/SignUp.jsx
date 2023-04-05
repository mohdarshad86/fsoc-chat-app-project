import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {

    const [show, setSow] = useState(false)
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmPassword] = useState()
    const [pic, setPic] = useState()

    const handleclick = () => setSow(!show)

    const postDetails = (pics) => { }

    const submitHandler=()=>{}

    return <VStack spacing='5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name'
                onChange={(e) => setName(e.target.value)}
            />

        </FormControl>
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
        <FormControl id='password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? "text" : 'password'}
                    placeholder='Enter Your Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleclick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='pic' isRequired>
            <FormLabel>Upload Your Profile Picture</FormLabel>
            <Input type='file'
                p={1.5}
                accept='image/*'
                onChange={(e) => postDetails(e.target.files[0])}
            />
        </FormControl>
        <Button
            colorScheme='blue'
            width='100%'
            style={{ marginTop: 15 }}
            onClick={submitHandler}
        >
            SignUp
        </Button>
    </VStack>
}

export default SignUp