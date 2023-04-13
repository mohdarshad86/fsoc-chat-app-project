import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [phone, setPhone] = useState();
    const [otp, setOtp] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);

    const [isOTPSend, setIsOTPSend] = useState(false);

    const history = useHistory();

    const handleSendOTP = async (e) => {
        e.preventDefault();

        if (phone) {



            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await axios.post(
                    "/api/user/sendOTP",
                    { phone },
                    config
                );

                console.log(JSON.stringify(data));
                setIsOTPSend(data.status);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false);
            }




        } else {
            toast({
                title: "Please Provide Phone Number!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        if (otp) {
            try {


                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await axios.post(
                    "/api/user/verifyOTP",
                    { phone, enteredOTP: otp },
                    config
                );

                console.log(JSON.stringify(data));
                toast({
                    title: "Login Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                await localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false);
                history.push("/chats");

            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false);
            }

        } else {
            toast({
                title: "Please Provide OTP!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the mendatory Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        // console.log(email, password);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            console.log(JSON.stringify(data));
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            await localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
            window.location.reload();
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    return <VStack spacing='5px'>

        <FormControl id='phone' isRequired>
            <FormLabel>Phone</FormLabel>
            <InputGroup>
                <Input placeholder='Enter Your Phone'
                    onChange={(e) => setPhone(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' colorScheme='red' onClick={handleSendOTP}>
                        Send OTP
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        {isOTPSend ?
            <>  <FormControl id='otp' isRequired>
                <FormLabel>Enter OTP:</FormLabel>
                <Input placeholder='Enter Your OTP here'
                    onChange={(e) => setOtp(e.target.value)}
                />
            </FormControl>
                <Button
                    colorScheme='blue'
                    width='100%'
                    style={{ marginTop: 15 }}
                    onClick={handleVerifyOTP}
                >
                    Verify OTP
                </Button>
            </>
            :
            <>
                <b style={{ marginTop: '18px' }}>OR LOGIN USING EMAIL AND PASSWORD</b>
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
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
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
            </>}
    </VStack>
}

export default Login