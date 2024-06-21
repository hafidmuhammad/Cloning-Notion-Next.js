import {
    Flex, Avatar, Box, Menu, MenuButton, MenuList, MenuItem, useDisclosure, IconButton
} from "@chakra-ui/react";
import { FiChevronsLeft, FiLogOut } from "react-icons/fi";
import PropTypes from 'prop-types';
import { signOut } from "firebase/auth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import CreateProjectButton from "../button/createprojectbutton";
import { useRouter } from "next/router";
import { auth } from "../../services/firebase";
import { useState } from "react";
import useStore from "@components/hooks/useStore";

const SidebarHeader = ({ handleSidebarToggle }) => {
    const user = useStore((state) => state.user);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const navigate = (path) => {
        router.push(path);
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('user'); 
            navigate('/loginpage');
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };
    
    return (
        <Flex
            h="16"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            gap={1}>
            <Flex gap={2} align={"center"}>
            <Avatar size="sm" name={user?.displayName || "Guest"} src={user?.photoURL || "path/to/profile/image.jpg"} />
                <Box w={'70px'} fontSize="sm" fontWeight="bold" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                    {user?.displayName || "Guest"}
                </Box>
            </Flex>

            <Flex alignItems="center" gap={1}>
                <Menu>
                    <MenuButton aria-label='Options' icon={<ChevronDownIcon />} variant='outline'>
                        <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>{user?.displayName || "Guest"}</MenuItem>
                        <MenuItem icon={<FiLogOut />} onClick={handleSignOut}>LogOut</MenuItem>
                    </MenuList>
                </Menu>
                <Box
                    aria-label="Toggle Sidebar"
                    onClick={() => console.log('Toggle sidebar')}
                    variant="outline"
                    color="white"
                    _hover={{ bg: "gray.600" }}
                    position="relative"
                >
                    {isHovered && <FiChevronsLeft />}
                </Box>

                <CreateProjectButton />
            </Flex>
            
            <Box onClick={handleSidebarToggle} cursor="pointer">
                <FiChevronsLeft size={24}  />
            </Box>

        </Flex>
    );
};

SidebarHeader.propTypes = {
    handleSidebarToggle: PropTypes.func.isRequired,
};

export default SidebarHeader;
