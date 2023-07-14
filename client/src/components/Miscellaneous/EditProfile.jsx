import { useToast } from "@chakra-ui/toast";
import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";

import { useState } from "react";

const EditModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [pic, setPic] = useState();
    const [name, setName] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const submitHandler = async () => {

        try {
            setPicLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-type": "application/json",
                },
            };
            if (!pic && !name) {
                toast({
                    title: "Enter new Name or Image!",
                    description: "No data found",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setPicLoading(false)
                return
            }
            // eslint-disable-next-line
            const { data } = await axios.put(
                "/api/user",
                {
                    pic,
                    name
                },
                config
            );

            toast({
                title: "Updated Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            var loc = localStorage.getItem('userInfo');
            const existing = JSON.parse(loc)

            if (pic) existing.pic = pic
            if (name) existing.name = name

            localStorage.setItem("userInfo", JSON.stringify(existing));
            setPicLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };

    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "mern-chat-app");
            data.append("cloud_name", "ddkfsxabf");
            fetch("https://api.cloudinary.com/v1_1/ddkfsxabf/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    // console.log(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };


    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            )}
            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent h="410px">
                    <ModalBody
                        d="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <FormControl id='name'>
                            <FormLabel>Update the Name:</FormLabel>
                            <Input
                                d="flex"
                                fontSize="20px"
                                width="100%"
                                style={{ marginTop: 10 }}
                                p={1.5}
                                justifyContent="center"
                                placeholder={`${user.name}...Update this Name`}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <ModalCloseButton />
                        <FormControl id="pic">
                            <FormLabel style={{ marginTop: 10 }}>Update the Picture:</FormLabel>
                            <Input
                                type="file"
                                p={1.5}
                                accept="image/*"
                                onChange={(e) => postDetails(e.target.files[0])}
                            />
                        </FormControl>
                        <Button
                            colorScheme="blue"
                            width="100%"
                            style={{ marginTop: 15 }}
                            onClick={submitHandler}
                            isLoading={picLoading}
                        >
                            Update
                        </Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditModal;