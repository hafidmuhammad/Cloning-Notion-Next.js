import React, { useState } from 'react';
import {
    Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton,
    DrawerHeader, DrawerBody, VStack, Flex, useColorModeValue, Box, useToast, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Input, Button
} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../services/firebase';

const UserDrawer = ({ isOpen, onClose, btnRef, projectId, userData, setUserData }) => {
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const hoverBg = useColorModeValue('gray.100', 'gray.700');
    const drawerBg = useColorModeValue('white', 'gray.800');
    const drawerHeaderBg = useColorModeValue('gray.50', 'gray.700');
    const toast = useToast();

    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        if (messageInput.trim() === '') {
            toast({
                title: "Message cannot be empty",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        // Here you would typically send the message to a backend or update a database
        // For demonstration, we're updating the local state
        const newMessage = {
            user: 'admin', // Assuming 'admin' is sending the message
            text: messageInput,
            timestamp: new Date().toISOString(),
        };
        setMessages([...messages, newMessage]);
        setMessageInput('');
    };

    const handleDeleteViewer = async (uid) => {
        try {
            const projectRef = doc(db, "editorData", projectId);
            await updateDoc(projectRef, {
                viewerUid: arrayRemove(uid)
            });
            const updatedUserData = userData.filter(user => user.uid !== uid);
            setUserData(updatedUserData);
            toast({
                title: "User deleted",
                description: "The user has been successfully deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete user. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent bg={drawerBg}>
                <DrawerCloseButton />
                <DrawerHeader bg={drawerHeaderBg} borderBottomWidth="1px" borderColor={borderColor}>
                    <Text>User View</Text>
                </DrawerHeader>
                <DrawerBody>
                    <Tabs>
                        <TabList>
                            <Tab>User List</Tab>
                            <Tab>Last Updates</Tab>
                            <Tab>Messages</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VStack align="stretch" spacing={4}>
                                    {userData.map((user) => (
                                        <Flex
                                            key={user.uid}
                                            align="center"
                                            p={3}
                                            w="full"
                                            borderWidth="1px"
                                            borderRadius="md"
                                            borderColor={borderColor}
                                            _hover={{ bg: hoverBg }}
                                            transition="background 0.3s ease"
                                        >
                                            <Box fontSize="sm" flex="1">
                                                {user.email}
                                            </Box>
                                            <Box
                                                aria-label="Delete"
                                                onClick={() => handleDeleteViewer(user.uid)}
                                                _hover={{ cursor: "pointer", color: "red.500" }}
                                                ml={2}
                                            >
                                                <BiTrash />
                                            </Box>
                                        </Flex>
                                    ))}
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack align="stretch" spacing={4}>
                                    {userData.map((user) => (
                                        <Flex
                                            key={user.uid}
                                            align="center"
                                            p={3}
                                            w="full"
                                            borderWidth="1px"
                                            borderRadius="md"
                                            borderColor={borderColor}
                                            _hover={{ bg: hoverBg }}
                                            transition="background 0.3s ease"
                                        >
                                            <Box fontSize="sm" flex="1">
                                                <Text>Email: {user.email}</Text>
                                                <Text>Last Update: {user.lastUpdate || 'No updates available'}</Text>
                                            </Box>
                                        </Flex>
                                    ))}
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack align="stretch" spacing={4}>
                                    {messages.map((message, index) => (
                                        <Box key={index} p={2} bg={index % 2 === 0 ? 'gray.100' : 'transparent'} borderRadius="md">
                                            <Text>{message.text}</Text>
                                            <Text fontSize="xs" color="gray.500">{message.timestamp}</Text>
                                        </Box>
                                    ))}
                                    <Flex>
                                        <Input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type your message" mr={2} />
                                        <Button onClick={handleSendMessage} colorScheme="blue">Send</Button>
                                    </Flex>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default UserDrawer;
