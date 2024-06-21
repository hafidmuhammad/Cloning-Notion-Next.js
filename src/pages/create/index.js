// pages/create/index.jsx
import dynamic from 'next/dynamic';
import { Box, Heading, Container, useColorModeValue } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const EditorComponent = dynamic(() => import('../../components/editor/EditorComponent'), { ssr: false });

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CreatePage = () => {
    const bgColor = useColorModeValue('brand.100', 'brand.900'); // Background color based on mode
    const textColor = useColorModeValue('text.light', 'text.dark'); // Text color based on mode
    const boxShadowColor = useColorModeValue('boxShadow.light', 'boxShadow.dark'); // Box shadow based on mode

    return (
        <Container maxW="container.lg" p={4} mt={8}>
            <Box
                bg={bgColor}
                p={6}
                borderRadius="md"
                boxShadow={boxShadowColor}
                animation={`${fadeIn} 0.5s ease-in-out`}
            >
                <Box
                    bg="white"
                    p={6}
                    borderRadius="md"
                    boxShadow="md"
                    color={textColor}
                >
                    <Box>
                        <EditorComponent />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default CreatePage;
