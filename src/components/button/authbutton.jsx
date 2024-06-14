import { Center } from '@chakra-ui/react'
import PropTypes from 'prop-types';

const AuthButton = ({ icon, text, onClick }) => {
    return (
        <Center
            gap={2}
            mt={3}
            width="100%"
            h="40px"
            fontSize="small"
            onClick={onClick}
            cursor="pointer"
            borderRadius="lg"
            border={'1px'}
            _hover={{ bg: "gray.200" }}
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

export default AuthButton