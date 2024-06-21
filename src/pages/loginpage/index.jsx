import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../services/firebase';

import {
    Box, FormControl, FormLabel, Input, Stack, Text, Button,
    useToast, Tabs, TabList, TabPanels, Tab, TabPanel,
    useColorMode, useColorModeValue, IconButton
} from "@chakra-ui/react";
import { FaSun, FaMoon } from 'react-icons/fa';
import AuthButton from '../../components/button/authbutton';
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from 'react-icons/io5';
import { BsKey } from 'react-icons/bs';
import useStore from '@components/hooks/useStore';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const setUser = useStore((state) => state.setUser);
    const toast = useToast();
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue("gray.50", "gray.800");
    const boxBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.300", "gray.600");

    async function saveUserData(user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, user);
    }

    function LoginWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (res) => {
                const user = {
                    uid: res.user.uid,
                    email: res.user.email,
                    displayName: res.user.displayName,
                    photoURL: res.user.photoURL,
                };
                setUser(user);
                await saveUserData(user);
                toast({
                    title: "Login Successful",
                    description: `Welcome ${user.displayName || user.email}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                router.push('/');
            })
            .catch((err) => {
                console.error("Error during Google sign-in", err);
                toast({
                    title: "Login Failed",
                    description: "There was an error during the login process.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }

    function LoginWithApple() {
        console.log('LoginWithApple');
        // Implement Apple login functionality
    }

    function LoginWithSSO() {
        console.log('LoginWithSSO');
        // Implement SSO login functionality
    }

    async function registerUser() {
        try {
            // Implement user registration logic
            console.log('Register user with:', registerEmail, registerPassword);
            toast({
                title: "Registration Successful",
                description: "Your account has been created.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            console.error("Error during registration", err);
            toast({
                title: "Registration Failed",
                description: "There was an error during the registration process.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <Stack
            w='100vw'
            h='100vh'
            margin="auto"
            justifyContent={'center'}
            align={'center'}
            bg={bg}
            p={4}
        >
            <Box
                maxW={'90vw'}
                maxH={'90vh'}
                p={6}
                borderRadius="md"
                boxShadow="lg"
                bg={boxBg}
            >
                <IconButton
                    aria-label="Toggle dark mode"
                    icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                    onClick={toggleColorMode}
                    mb={4}
                    alignSelf="flex-end"
                />
                <Tabs isFitted variant="enclosed">
                    <TabList mb="1em">
                        <Tab>Login</Tab>
                        <Tab>Register</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Text
                                w={"300px"}
                                mb={5}
                                fontWeight='bold'
                                fontSize='xl'
                                align={'center'}
                            >
                                LOG IN TO YOUR ACCOUNT
                            </Text>

                            <Stack spacing={2}>
                                <AuthButton icon={<FcGoogle />} text="Continue With Google" onClick={LoginWithGoogle} />
                                <AuthButton icon={<IoLogoApple />} text="Continue With Apple" onClick={LoginWithApple} />
                                <AuthButton icon={<BsKey />} text="Single sign-on (SSO)" onClick={LoginWithSSO} />
                                <FormControl isRequired mt={5}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        borderColor={borderColor}
                                        _hover={{ borderColor: borderColor }}
                                        _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
                                    />
                                </FormControl>

                                <AuthButton  text="Continue With Email" oonClick={() => console.log('Continue with email')} />
                            </Stack>
                        </TabPanel>
                        <TabPanel>
                            <Text
                                w={"300px"}
                                mb={5}
                                fontWeight='bold'
                                fontSize='xl'
                                align={'center'}
                            >
                                REGISTER A NEW ACCOUNT
                            </Text>

                            <Stack spacing={2}>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        borderColor={borderColor}
                                        _hover={{ borderColor: borderColor }}
                                        _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        borderColor={borderColor}
                                        _hover={{ borderColor: borderColor }}
                                        _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
                                    />
                                </FormControl>

                                <AuthButton  text="Register" oonClick={() => console.log('Continue with email')} />
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Stack>
    );
}

export default LoginPage;
