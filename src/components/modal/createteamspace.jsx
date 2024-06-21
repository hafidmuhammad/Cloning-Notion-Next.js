import { QuestionIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, Text, Textarea, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BiBuilding } from 'react-icons/bi';

const CreateTeamspaceModal = ({ isOpen, onClose }) => {
    const modalBg = useColorModeValue('gray.100', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'gray.200');
    const buttonColor = useColorModeValue('blue', 'blue.400');
    const buttonHoverColor = useColorModeValue('blue.500', 'blue.600');

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={modalBg} color={textColor}>
                <Box bg={useColorModeValue('gray.100', 'gray.800')} p={4} h={'70px'} borderRadius={'lg'}>
                    <Text fontSize={'md'} w={'95%'}>
                        Create your first teamspace to start with your teammates
                    </Text>
                    <ModalCloseButton />
                </Box>
                <Box p={5}>
                    <Box>
                        <Text fontSize={'md'} fontWeight={'bold'} my={2}>
                            Create a new teamspace
                        </Text>
                        <Text fontSize={'sm'}>
                            Teams are where your collaborators come to share ideas and files with you.
                        </Text>
                    </Box>
                    <Box w={'100%'} mt={5}>
                        <Text my={2}>Icon & Name</Text>
                        <Flex gap={2}>
                            <Button>Icon</Button>
                            <Input placeholder='Group Name' />
                        </Flex>
                    </Box>
                    <Box w={'100%'} mt={5}>
                        <Text my={2}>Deskripsi</Text>
                        <Flex gap={2}>
                            <Textarea placeholder='Detail about your group' />
                        </Flex>
                    </Box>
                    <Flex gap={2} align={'center'} my={5}>
                        <BiBuilding size={20} />
                        <Text fontSize={'xs'}>Everyone at this app and new members will have access to this group</Text>
                    </Flex>

                    <Box w={'100%'}>
                        <Flex gap={2} align={'center'}>
                            <Flex align={'center'} gap={2} _hover={{ cursor: 'pointer' }} w={'50%'}>
                                <QuestionIcon />
                                <Text fontSize={'xs'}>Learn about teamspaces</Text>
                            </Flex>

                            <Box w={'50%'} align='center' borderRadius={'lg'}>
                                <Button color={buttonColor} _hover={{ bg: buttonHoverColor }}>
                                    Create Teamspace
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </ModalContent>
        </Modal>
    );
};

CreateTeamspaceModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CreateTeamspaceModal;
