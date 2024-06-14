import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Box,
    InputRightElement,
    InputGroup,
    Flex,
    Text,
    Spacer,
    ModalHeader,
    VStack,
    HStack
} from '@chakra-ui/react';
import { BsFilterCircle } from 'react-icons/bs';
import { MdPhotoFilter } from 'react-icons/md';
import { AiOutlineEnter } from 'react-icons/ai';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';
import { ArrowBackIcon } from '@chakra-ui/icons';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isQAModalOpen, setIsQAModalOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        console.log("Searching for:", searchQuery);
    };

    const openQAModal = () => {
        setIsQAModalOpen(true);
    };

    const closeQAModal = () => {
        setIsQAModalOpen(false);
    };

    const handleMessageSend = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, inputValue]);
            setInputValue('');
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <InputGroup mt={5}>
                            <Input
                                placeholder="Type to search..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <InputRightElement>
                                <Box
                                    bg={'gray.100'}
                                    borderRadius={'full'}
                                    _hover={{ color: "gray.500", cursor: "pointer" }}>
                                    <BsFilterCircle color='gray.200' p='3' />
                                </Box>
                            </InputRightElement>
                        </InputGroup>
                        <Box mt={4} mb={5} fontSize={'sm'}>Actions</Box>
                        <Flex align={'center'} gap={'2'} p={3} borderRadius={'lg'} _hover={{ bg: 'gray.100', cursor: 'pointer' }} onClick={openQAModal}>
                            <MdPhotoFilter color='purple' />
                            <Text>Ask Ai to generate </Text>
                            <Spacer />
                            <AiOutlineEnter />
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isQAModalOpen} onClose={closeQAModal} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex align={'center'} gap={2}>
                        <ArrowBackIcon onClick={closeQAModal} />
                        <Text>Q&A</Text>
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Box width="100%" h={"200px"} overflow={"auto"} border="1px" borderColor="gray.200" borderRadius="md" p={4}>
                                {messages.map((message, index) => (
                                    <Box key={index} p={2} px={10} bg="gray.100" borderRadius="md" mb={2}>
                                        {message}
                                    </Box>
                                ))}
                            </Box>
                            <HStack width="100%" py={5}>
                                <InputGroup>
                                    <Input
                                        borderRadius={'20px'}
                                        placeholder="Type your message..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    <InputRightElement>
                                        <Box
                                            bg={'gray.100'}
                                            borderRadius={'full'}
                                            onClick={handleMessageSend} 
                                            _hover={{ color: "gray.500", cursor: "pointer" }}>
                                            <FaRegArrowAltCircleUp  color='gray.200' p='3'/>
                                        </Box>
                                    </InputRightElement>
                                </InputGroup>
                            </HStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

SearchModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SearchModal;
