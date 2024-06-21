import { Box, useColorModeValue } from "@chakra-ui/react";
import { IoCreateOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const CreateProjectButton = () => {
    const router = useRouter();
    const bg = useColorModeValue("gray.100", "gray.700");
    const hoverBg = useColorModeValue("gray.200", "gray.600");

    return (
        <Box
            onClick={() => router.push('/create')}
            cursor="pointer"
            ml={2}
            p={2}
            bg={bg}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="background 0.2s, transform 0.2s"
            _hover={{ 
                bg: hoverBg,
                transform: "scale(1.05)"
            }}
            shadow="sm"
        >
            <IoCreateOutline size={24} />
        </Box>
    );
};

export default CreateProjectButton;
