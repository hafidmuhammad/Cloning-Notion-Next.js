// components/sidebar/SidebarComponent.jsx
import { useState } from "react";
import { Box, Flex, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { FiMenu, FiSearch, FiHome, FiInbox, FiSettings, FiCalendar } from "react-icons/fi";
import { BsTablet } from "react-icons/bs";
import { TbTemplate } from "react-icons/tb";
import { BiMoon, BiSun, BiTrash } from "react-icons/bi";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import SidebarItem from "../button/sidebaritem";
import SidebarHeader from "./SidebarHeader";
import ProjectList from "./ProjectList";
import { useRouter } from "next/router";
import SearchModal from "../modal/SearchModal";
import CalenderModal from "../modal/calendermodal";
import CreateTeamspaceModal from "../modal/createteamspace";
import TrashModal from "../modal/trashmodal";
import InboxDrawer from "../drawel/inboxdrawer";

const SidebarComponent = ({ children }) => {
    const { toggleColorMode } = useColorMode();
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const router = useRouter();

    const navigate = (path) => {
        router.push(path);
    };

    const handleSidebarToggle = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleModalOpen = (title) => {
        setModalTitle(title);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <Box minH="100vh" bg={useColorModeValue("#F7F7F5", "gray.800")}>
            <Box
                borderRight="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                w={sidebarVisible ? 60 : 0}
                pos="fixed"
                h="full"
                display="flex"
                flexDirection="column"
                bg={useColorModeValue("#F7F7F5", "gray.800")}
                boxShadow="md"
                transition="width 0.3s ease"
                overflowX="hidden"
            >
                <SidebarHeader handleSidebarToggle={handleSidebarToggle} />
                <Box p={4} flex="1">
                    <SidebarItem
                        icon={<FiSearch />}
                        text="Search"
                        onClick={() => handleModalOpen('Search')}
                    />
                    <SidebarItem
                        icon={<FiHome />}
                        text="Home"
                        onClick={() => navigate('/homepage')}
                    />
                    <SidebarItem
                        onClick={handleDrawerOpen}
                        text="Inbox"
                        icon={<FiInbox />}
                    />
                    <SidebarItem
                        icon={<FiSettings />}
                        text="Settings"
                        onClick={() => handleModalOpen('Settings')}
                    />
                </Box>
                
                <Box overflowY="auto">
                    <ProjectList />
                    <Box p={4}>
                        <SidebarItem
                            icon={<FiCalendar />}
                            text="Calendar"
                            onClick={() => handleModalOpen('calendar')}
                        />
                        <SidebarItem
                            icon={<BsTablet />}
                            text="Create a Teamspace"
                            onClick={() => handleModalOpen('teamspace')}
                        />
                        <SidebarItem
                            onClick={() => navigate('/template')}
                            text="Templates"
                            icon={<TbTemplate />}
                        />
                        <SidebarItem
                            icon={<BiTrash />}
                            text="Trash"
                            onClick={() => handleModalOpen('trash')}
                        />
                        <SidebarItem
                            icon={<QuestionOutlineIcon />}
                            text="Help & Support"
                            onClick={() => handleModalOpen('help')}
                        />
                    </Box>
                </Box>
            </Box>

            <Flex
                ml={sidebarVisible ? 60 : 0}
                p="4"
                height="100%"
                alignItems="center"
                justifyContent="space-between"
                transition="margin-left 0.3s ease"
                bg={'transparent'}
            >
                <IconButton
                    display={!sidebarVisible ? 'flex' : 'none'}
                    onClick={handleSidebarToggle}
                    variant="outline"
                    icon={<FiMenu />}
                    bg="transparent"
                    _hover={{
                        bg: useColorModeValue("#E2E2E0", "gray.700"),
                    }}
                />
                <IconButton
                    aria-label="Toggle dark mode"
                    variant="ghost"
                    onClick={toggleColorMode}
                    icon={useColorModeValue(<BiSun />, <BiMoon />)}
                />
            </Flex>

            <Box ml={sidebarVisible ? 60 : 0} p="4" transition="margin-left 0.3s ease">
                {children}
            </Box>

            <SearchModal isOpen={isModalOpen && modalTitle === 'Search'} onClose={handleModalClose} />
            <CalenderModal isOpen={isModalOpen && modalTitle === 'calendar'} onClose={handleModalClose} />
            <CreateTeamspaceModal isOpen={isModalOpen && modalTitle === 'teamspace'} onClose={handleModalClose} />
            <TrashModal isOpen={isModalOpen && modalTitle === 'trash'} onClose={handleModalClose} />
            <InboxDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
        </Box>
    );
};

SidebarComponent.propTypes = {
    children: PropTypes.node
};

export default SidebarComponent;
