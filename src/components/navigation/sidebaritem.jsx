import { Flex, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const SidebarItem = ({ icon, text, onClick }) => {
    return (
        <Flex onClick={onClick} align={"center"} p={2} w={"full"} as={"icon"} borderRadius={"md"} fontSize={"sm"} gap={2} _hover={{ bg: "gray.100", cursor: "pointer" }}>
            {icon}
            <Text>{text}</Text>
        </Flex>
    );
};

SidebarItem.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default SidebarItem;
