import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';
import useStore from '@/components/hooks/useStore';
import { Box, Center, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import AuthButton from '@/components/button/authbutton';
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from 'react-icons/io5';
import { BsKey } from 'react-icons/bs';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const setUser = useStore((state) => state.setUser);

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
            })
            .catch((err) => {
                console.error("Error during Google sign-in", err);
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

    return (
        <Stack
            w='100vw'
            h='100vh'
            margin="auto"
            justifyContent={'center'}
            align={'center'}
        >
            <Box maxW={'90vw'} maxH={'90vh'} p={'5'} borderRadius="md">
                <Box w={"300px"} mb={5} fontWeight='bold' fontSize='lg' align={'center'}>
                    LOG IN TO YOUR ACCOUNT
                </Box>

                <Box mt={5}>
                    <AuthButton icon={<FcGoogle />} text="Continue With Google" onClick={LoginWithGoogle} />
                    <AuthButton icon={<IoLogoApple />} text="Continue With Apple" onClick={LoginWithApple} />
                    <AuthButton icon={<BsKey />} text="Single sign-on (SSO)" onClick={LoginWithSSO} />
                </Box>
                <FormControl isRequired>
                    <FormLabel mt={5}>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </FormControl>
                <Center bg="blue.400" mt={3}
                    width="100%"
                    h="40px"
                    fontSize="small"
                    cursor="pointer"
                    borderRadius="lg"
                    bgColor="blue.400"
                >
                    Continue
                </Center>
            </Box>
        </Stack>
    );
}

export default LoginPage;
