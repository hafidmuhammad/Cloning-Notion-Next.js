import React from 'react';
import {
    Flex,
    Avatar,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useColorModeValue
} from "@chakra-ui/react";
import { FiTrash2, FiEdit2, FiShare2, FiMoreHorizontal } from "react-icons/fi";

const ProjectItem = ({ project, onDelete, onShare, onEdit }) => {
    const headerText = project.content?.blocks?.find(block => block.type === 'header')?.data?.text || 'Untitled';
    const bg = useColorModeValue("gray.100", "gray.800");
    const hoverBg = useColorModeValue("gray.200", "gray.700");
    const menuBg = useColorModeValue("white", "gray.700");

    return (
        <Flex 
            align="center" 
            p={2} 
            w="full" 
            justifyContent="space-between" 
            borderRadius="md" 
            bg={bg} 
            _hover={{ bg: hoverBg, cursor: "pointer" }}
            transition="background 0.2s"
        >
            <Flex align="center" w="80%" gap={2}>
                <Avatar size="sm" name={headerText} />
                <Box fontSize="sm" noOfLines={1} dangerouslySetInnerHTML={{ __html: headerText }} />
            </Flex>
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<FiMoreHorizontal />}
                    variant="ghost"
                    aria-label="Options"
                />
                <MenuList bg={menuBg}>
                    <MenuItem onClick={onDelete} _hover={{ bg: "red.400", color: "white" }} gap={2}>
                        <FiTrash2 /> Remove
                    </MenuItem>
                    <MenuItem onClick={onShare} _hover={{ bg: "blue.400", color: "white" }} gap={2}>
                        <FiShare2 /> Share
                    </MenuItem>
                    <MenuItem onClick={onEdit} _hover={{ bg: "green.400", color: "white" }} gap={2}>
                        <FiEdit2 /> Edit
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default ProjectItem;
