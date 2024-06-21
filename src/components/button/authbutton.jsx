import { Center, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const AuthButton = ({ icon, text, onClick }) => {
    const bg = useColorModeValue("gray.50", "gray.800");
    const hoverBg = useColorModeValue("gray.200", "gray.700");
    const activeBg = useColorModeValue("blue.200", "blue.500");
    const borderColor = useColorModeValue("gray.300", "gray.600");

    return (
        <Center
            gap={2}
            width="100%"
            h="40px"
            fontSize="small"
            onClick={onClick}
            cursor="pointer"
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            bg={bg}
            _active={{ bg: activeBg }}
            transition="background 0.2s, transform 0.2s"
            _hover={{ 
                bg: hoverBg,
                transform: "scale(1.05)"
            }}
            shadow="sm"
        >
            {icon} {text}
        </Center>
    )
}

AuthButton.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default AuthButton;
