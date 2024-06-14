import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Box,
    Text,
    Icon,
    Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";

import PropTypes from 'prop-types';
import { BiTrash } from "react-icons/bi";

const TrashModal = ({ isOpen, onClose, }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Trash</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input placeholder="Search in trash..." mb={4} />
                    <Box>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="gray" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

TrashModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};



export default TrashModal;
