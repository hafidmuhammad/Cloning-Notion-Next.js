import { Flex, Avatar, Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FiChevronsLeft } from "react-icons/fi";
import PropTypes from 'prop-types';
import { signOut } from "firebase/auth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import CreateProjectButton from "../button/createprojectbutton";
import useStore from "../hooks/useStore";
import { useRouter } from "next/router";
import { auth } from "@/services/firebase";

const SidebarHeader = ({ handleSidebarToggle }) => {
    const user = useStore((state) => state.user);

    const router = useRouter();

    const navigate = (path) => {
        router.push(path);
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/login');
        });
    };

    return (
        <Flex h="16" alignItems="center" justifyContent="space-between" gap={2} p={2}>
            <Avatar size="sm" name={user?.photoURL || "Guest"} src="path/to/profile/image.jpg" />
            <Flex alignItems="center" justifyContent="space-between" gap={1}>
                <Box w={'70px'} fontSize="md" fontWeight="bold" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                    {user?.displayName || "Guest"}
                </Box>
                <Menu>
                    <MenuButton aria-label='Options' icon={<ChevronDownIcon />} variant='outline'>
                        <ChevronDownIcon />
                    </MenuButton> 
                    <MenuList>
                        <MenuItem>{user?.displayName || "Guest"}</MenuItem>
                        <MenuItem py={5} onClick={handleSignOut}>LogOut</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Flex>
                <Box onClick={handleSidebarToggle} cursor="pointer">
                    <FiChevronsLeft size={24} />
                </Box>
                <CreateProjectButton />
            </Flex>
        </Flex>
    );
};

SidebarHeader.propTypes = {
    handleSidebarToggle: PropTypes.func.isRequired,
};

export default SidebarHeader;
