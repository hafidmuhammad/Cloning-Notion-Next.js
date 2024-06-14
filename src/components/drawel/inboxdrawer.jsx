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
} from "@chakra-ui/react";
import { FaInbox } from "react-icons/fa";
import PropTypes from 'prop-types';

const InboxDrawer = ({ isOpen, onClose }) => {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Flex align="center">
                        <Icon as={FaInbox} boxSize={6} mr={2} />
                        <Text>Inbox</Text>
                    </Flex>
                </DrawerHeader>
                <DrawerBody>
                    <Box
                        bg="gray.50"
                        p={4}
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor="gray.200"
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
