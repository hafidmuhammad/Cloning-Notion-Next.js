import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, Flex, Button, Divider } from "@chakra-ui/react"
import PropTypes from 'prop-types';
import { FaGoogle } from "react-icons/fa";

const CalenderModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction="column" align="center" justify="center" p={4}>
                        <FaGoogle size={50} />
                        <Text mt={4} textAlign="center">
                            By connecting to your Google Calendar, you can easily synchronize your events and keep track of your schedule effortlessly.
                        </Text>
                        <Divider my={5} />
                        <Button
                            mt={6}
                            colorScheme="red"
                            leftIcon={<FaGoogle />}
                        // onClick={onConnect}
                        >
                            Connect to Google Calendar
                        </Button>
                    </Flex>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

CalenderModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CalenderModal