import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const SidebarItem = ({ icon, text, onClick }) => {
    const hoverBg = useColorModeValue("gray.100", "gray.700");
    const textColor = useColorModeValue("black", "white");

    return (
        <Flex 
            onClick={onClick} 
            align={"center"} 
            p={2} 
            w={"full"} 
            borderRadius={"md"} 
            fontSize={"sm"} 
            gap={2} 
            _hover={{ bg: hoverBg, cursor: "pointer" }}
            transition="background 0.2s"
        >
            {icon}
            <Text color={textColor}>{text}</Text>
        </Flex>
    );
};

SidebarItem.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default SidebarItem;
