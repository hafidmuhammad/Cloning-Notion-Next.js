// components/projectlist.js
import { useEffect, useState } from 'react';
import { Box, Flex, Text, useToast, useDisclosure, Spinner, Center, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import useStore from '../hooks/useStore';
import ModalInvite from '../Modal/ModalInvite';
import ProjectItem from '../button/projectitem';
import { MdPublic, MdPublicOff } from 'react-icons/md';

const MotionBox = motion(Box);

const ProjectList = () => {
    const toast = useToast();
    const { onOpen: onOpenInvite, onClose: onCloseInvite, isOpen: isOpenInvite } = useDisclosure();
    const { user, privateProjects = [], publicProjects = [], fetchProjects, deleteProject } = useStore(state => ({
        user: state.user,
        privateProjects: state.privateProjects,
        publicProjects: state.publicProjects,
        fetchProjects: state.fetchProjects,
        deleteProject: state.deleteProject,
    }));
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            fetchProjects(user.uid)
                .then(() => setIsLoading(false))
                .catch(err => {
                    console.error('Failed to fetch projects:', err);
                    toast({
                        title: "Failed to Load Projects",
                        description: "There was an error loading your projects.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    setIsLoading(false);
                });
        }
    }, [user, fetchProjects, toast]);

    const navigateToDetail = (projectId) => {
        router.push(`/detailpage/${projectId}`);
        toast({
            title: "Entering Project",
            description: "You are now entering the project detail page.",
            status: "info",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleDelete = async (projectId) => {
        try {
            setIsLoading(true);
            const projectRef = doc(db, "editorData", projectId);
            // Move project data to trash
            await updateDoc(projectRef, {
                isDeleted: true, // assuming you have a field isDeleted in your project document
            });
            setIsLoading(false);
            fetchProjects(user.uid);
            toast({
                title: "Project Moved to Trash",
                description: "Project data has been moved to trash.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            console.error('Failed to move project to trash:', err);
            toast({
                title: "Failed to Move Project to Trash",
                description: "An error occurred while trying to move project data to trash.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
        }
    };

    const handleShareClick = (projectId) => {
        setSelectedProjectId(projectId);
        onOpenInvite();
    };

    const projectVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <Box height="300px" px={4} py={2} overflowY="auto">
            {isLoading ? (
                <Center h="100%">
                    <Spinner size="xl" />
                </Center>
            ) : (
                <>
                    <MotionBox
                        h="50%"
                        mb={2}
                        gab = {2}
                        bg={useColorModeValue("gray.200", "gray.700")} 
                        borderRadius="md"
                        initial="hidden"
                        animate="visible"
                        variants={projectVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <Flex gap={2} align="center" fontSize="sm" p={2}>
                            <MdPublic />
                            <Text>Public Projects</Text>
                        </Flex>
                        {publicProjects.length > 0 ? (
                            publicProjects.map(project => (
                                <motion.div key={project.id} initial="hidden" animate="visible" variants={projectVariants} transition={{ duration: 0.3 }}>
                                    <ProjectItem
                                        project={project}
                                        onDelete={() => handleDelete(project.id)}
                                        onShare={() => handleShareClick(project.id)}
                                        onEdit={() => navigateToDetail(project.id)}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <Box p={4} color="gray.500" fontSize="sm">No public projects available</Box>
                        )}
                    </MotionBox>
                    <MotionBox
                        h="50%"
                        bg={useColorModeValue("gray.200", "gray.700")} // Light and dark mode background color
                        borderRadius="md"
                        initial="hidden"
                        animate="visible"
                        gab = {2}
                        variants={projectVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <Flex gap={2} align="center" fontSize="sm" p={2}>
                            <MdPublicOff />
                            <Text>Private Projects</Text>
                        </Flex>
                        {privateProjects.length > 0 ? (
                            privateProjects.map(project => (
                                <motion.div key={project.id} initial="hidden" animate="visible" variants={projectVariants} transition={{ duration: 0.3 }}>
                                    <ProjectItem
                                        project={project}
                                        onDelete={() => handleDelete(project.id)}
                                        onShare={() => handleShareClick(project.id)}
                                        onEdit={() => navigateToDetail(project.id)}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <Flex align="center" p={4} w="full" justifyContent="center" bg="gray.200" cursor="pointer">
                                Add Project
                            </Flex>
                        )}
                    </MotionBox>
                    <ModalInvite isOpen={isOpenInvite} onClose={onCloseInvite} selectedProjectId={selectedProjectId} />
                </>
            )}
        </Box>
    );
};

export default ProjectList;
