import { useEffect, useState } from 'react';
import { Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem, useToast, useDisclosure, IconButton, Avatar } from "@chakra-ui/react";
import { FiTrash2, FiEdit2, FiShare2, FiMoreVertical } from "react-icons/fi";
import { AddIcon } from "@chakra-ui/icons";
import SidebarItem from "./SideBarItem";

import ModalInvite from '../Modal/ModalInvite';
import { useRouter } from 'next/router';
import useStore from '../hooks/useStore';

const ProjectList = () => {
    const toast = useToast();
    const { onOpen: onOpenInvite, onClose: onCloseInvite, isOpen: isOpenInvite } = useDisclosure();
    const { user, privateProjects, publicProjects, fetchProjects, deleteProject } = useStore(state => ({
        user: state.user,
        privateProjects: state.privateProjects,
        publicProjects: state.publicProjects,
        fetchProjects: state.fetchProjects,
        deleteProject: state.deleteProject,
    }));
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const router = useRouter();

    const navigateToDetail = (projectId) => {
        router.push(`/project/${projectId}`);
    };

    useEffect(() => {
        if (user) {
            fetchProjects(user.uid);
        }
    }, [user, fetchProjects]);

    const handleDelete = async (projectId) => {
        const success = await deleteProject(projectId);
        if (success) {
            fetchProjects(user.uid);
            toast({
                title: "Proyek Dihapus",
                description: "Proyek berhasil dihapus.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Gagal Menghapus Proyek",
                description: "Terjadi kesalahan saat mencoba menghapus proyek.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleShareClick = (projectId) => {
        setSelectedProjectId(projectId);
        onOpenInvite();
    };

    return (
        <Box>
            <Box p={2} maxH={"180px"} overflow={"auto"} bg="#F7F7F5" borderRadius={"md"}>
                <Text p={1} fontSize={"sm"}>Public Projects</Text>
                {publicProjects && publicProjects.length === 0 ? (
                    <SidebarItem
                        icon={<AddIcon />}
                        text="Add Page"
                        onClick={() => navigate('/createnew')}
                    />
                ) : (
                    publicProjects && publicProjects.map((project) => {
                        let headerText = 'Untitled';
                        if (project.content && project.content.blocks) {
                            project.content.blocks.forEach((block) => {
                                if (block.type === 'header' && block.data && block.data.text) {
                                    headerText = block.data.text;
                                }
                            });
                        }
                        return (
                            <Flex key={project.id} align={"center"} p={2} w={"full"} justifyContent={"space-between"} borderRadius={"md"} fontSize={"sm"} bg="#F7F7F5" _hover={{ bg: "gray.100", cursor: "pointer" }} mb={1} onClick={() => navigateToDetail(project.id)}>
                                <Flex align={"center"}>
                                    <Avatar size="sm" name={headerText} mr={2} />
                                    <Box>{headerText}</Box>
                                </Flex>
                                <Menu>
                                    <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" />
                                    <MenuList>
                                        <MenuItem gap={2} onClick={() => handleDelete(project.id)}><FiTrash2 /> Remove</MenuItem>
                                        <MenuItem gap={2} onClick={() => handleShareClick(project.id)}><FiShare2 /> Share</MenuItem>
                                        <MenuItem gap={2} onClick={() => { /* Tambahkan logika edit di sini */ }}><FiEdit2 /> Edit</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        );
                    })
                )}
                <ModalInvite
                    isOpen={isOpenInvite}
                    onClose={onCloseInvite}
                    selectedProjectId={selectedProjectId}
                />
            </Box>
            <Box p={2} maxH={"180px"} overflow={"auto"} bg="#F7F7F5" borderRadius={"md"}>
                <Text p={1} fontSize={"sm"}>Private Projects</Text>
                {privateProjects && privateProjects.length === 0 ? (
                    <SidebarItem
                        icon={<AddIcon />}
                        text="Add Page"
                        onClick={() => navigate('/createnew')}
                    />
                ) : (
                    privateProjects && privateProjects.map((project) => {
                        let headerText = 'Untitled';
                        if (project.content && project.content.blocks) {
                            project.content.blocks.forEach((block) => {
                                if (block.type === 'header' && block.data && block.data.text) {
                                    headerText = block.data.text;
                                }
                            });
                        }
                        return (
                            <Flex key={project.id} align={"center"} p={2} w={"full"} justifyContent={"space-between"} borderRadius={"md"} fontSize={"sm"} bg="#F7F7F5" _hover={{ bg: "gray.100", cursor: "pointer" }} mb={1} onClick={() => navigate(`/project/${project.id}`)}>
                                <Flex align={"center"}>
                                    <Avatar size="sm" name={headerText} mr={2} />
                                    <Box>{headerText}</Box>
                                </Flex>
                                <Menu>
                                    <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" />
                                    <MenuList>
                                        <MenuItem gap={2} onClick={() => handleDelete(project.id)}><FiTrash2 /> Remove</MenuItem>
                                        <MenuItem gap={2} onClick={() => handleShareClick(project.id)}><FiShare2 /> Share</MenuItem>
                                        <MenuItem gap={2} onClick={() => { /* Tambahkan logika edit di sini */ }}><FiEdit2 /> Edit</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        );
                    })
                )}
                <ModalInvite
                    isOpen={isOpenInvite}
                    onClose={onCloseInvite}
                    selectedProjectId={selectedProjectId}
                />
            </Box>
        </Box>
    );
};

export default ProjectList;

