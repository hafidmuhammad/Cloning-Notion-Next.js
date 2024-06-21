import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Text,
    useToast,
} from "@chakra-ui/react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import PropTypes from 'prop-types';
import { db } from '../../services/firebase';
import useStore from '@components/hooks/useStore';


const ModalInvite = ({ isOpen, onClose, selectedProjectId }) => {
    const toast = useToast();
    const { findUserByEmail } = useStore(state => ({
        findUserByEmail: state.findUserByEmail,
    }));
    const [inviteEmail, setInviteEmail] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleInvite = async () => {
        setLoading(true);
        const invitedUser = await findUserByEmail(inviteEmail);
        if (invitedUser) {
            try {
                const projectDocRef = doc(db, "editorData", selectedProjectId);
                await updateDoc(projectDocRef, {
                    viewerUid: arrayUnion(invitedUser.uid)
                });
                toast({
                    title: "User Diundang",
                    description: `${inviteEmail} telah diundang ke proyek.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                onClose();
            } catch (e) {
                console.error("Error inviting user to project: ", e);
                toast({
                    title: "Gagal Mengundang User",
                    description: "Terjadi kesalahan saat mencoba mengundang user.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: "User Tidak Ditemukan",
                description: "User dengan email ini belum memiliki akun.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        setLoading(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Invite User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb={2}>Enter the email of the user you want to invite:</Text>
                    <Input
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="Enter email to invite"
                        mb={4}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button colorScheme="blue" onClick={handleInvite} ml={3} isLoading={loading}>
                        {loading ? 'Sending Invitation...' : 'Invite'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

ModalInvite.propTypes = {
    selectedProjectId: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalInvite;
