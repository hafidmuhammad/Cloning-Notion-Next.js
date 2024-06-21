import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Text,
    Flex,
    Box,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaInbox } from "react-icons/fa";
import PropTypes from 'prop-types';

const InboxDrawer = ({ isOpen, onClose }) => {
    const drawerBg = useColorModeValue("white", "gray.800");
    const headerBg = useColorModeValue("gray.100", "gray.700");
    const contentBg = useColorModeValue("gray.50", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={drawerBg}>
                <DrawerCloseButton />
                <DrawerHeader bg={headerBg}>
                    <Flex align="center">
                        <Icon as={FaInbox} boxSize={6} mr={2} />
                        <Text>Inbox</Text>
                    </Flex>
                </DrawerHeader>
                <DrawerBody>
                    <Box
                        bg={contentBg}
                        p={4}
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Text>Inbox content goes here.</Text>
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

InboxDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default InboxDrawer;
