import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import {
    Box, Spinner, Text, useDisclosure, Flex, IconButton, useColorModeValue, Center,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter,
    PopoverArrow, PopoverCloseButton, Button, Input, useToast
} from '@chakra-ui/react';
import { db } from '../../services/firebase';
import dynamic from 'next/dynamic';
import { BiMessage, BiShare, BiTime } from 'react-icons/bi';
import UserDrawer from '@components/drawel/userDrawer';


const EditorComponent = dynamic(() => import('../../components/Editor/EditorComponent'), { ssr: false });

const DetailProject = () => {
    const router = useRouter();
    const { projectId } = router.query;
    const [projectData, setProjectData] = useState(null);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [email, setEmail] = useState('');
    const toast = useToast();

    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!projectId) return;

            try {
                const docRef = doc(db, "editorData", projectId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProjectData(data);
                    await fetchUserData(data.viewerUid);
                } else {
                    setError("No such document!");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [projectId]);

    const fetchUserData = async (uids) => {
        try {
            const userData = [];
            for (const uid of uids) {
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { name, email } = docSnap.data();
                    userData.push({ uid, name, email });
                }
            }
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleInviteUser = async () => {
        try {
            const docRef = doc(db, 'users', email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                await updateDoc(doc(db, "editorData", projectId), {
                    viewerUid: arrayUnion(email)
                });
                setEmail('');
                toast({
                    title: "User invited",
                    description: "The user has been successfully invited.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "User not found",
                    description: "No user found with this email.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to invite user. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Center height="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center height="100vh">
                <Text color="red.500">Error: {error}</Text>
            </Center>
        );
    }

    return (
        <Box bg={useColorModeValue('#F7F7F5', 'gray.900')} minH="100vh" p={4}>
            <Flex gap={4} justify={"flex-end"} align="center" mb={4}>
                {projectData && projectData.viewerUid && projectData.viewerUid.length > 0 && (
                    <Box>
                        <IconButton
                            ref={btnRef}
                            onClick={onOpen}
                            colorScheme="blue"
                            icon={<BiMessage />}
                            aria-label="View Users"
                        />
                        <UserDrawer
                            isOpen={isOpen}
                            onClose={onClose}
                            btnRef={btnRef}
                            projectId={projectId}
                            userData={userData}
                            setUserData={setUserData}
                        />
                    </Box>
                )}

                <Popover>
                    <PopoverTrigger>
                        <IconButton
                            colorScheme='blue'
                            aria-label='Share project'
                            icon={<BiShare />}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Invite User</PopoverHeader>
                        <PopoverBody>
                            <Input
                                placeholder="Enter user email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </PopoverBody>
                        <PopoverFooter display="flex" justifyContent="flex-end">
                            <Button colorScheme="blue" onClick={handleInviteUser}>
                                Invite
                            </Button>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>

                <IconButton
                    colorScheme='blue'
                    aria-label='View history'
                    icon={<BiTime />}
                />
            </Flex>
            <Box
                bg={bg}
                p={8}
                borderRadius="lg"
                boxShadow="2xl"
                border="1px solid"
                borderColor={borderColor}
            >
                {projectData ? (
                    <EditorComponent projectId={projectId} uid={projectData.uid} initialData={projectData.content} />
                ) : (
                    <Text>Project not found</Text>
                )}
            </Box>
        </Box>
    );
}

export default DetailProject;
