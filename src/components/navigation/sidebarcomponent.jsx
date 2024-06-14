import { useState } from "react";
import { Box, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { BsTable, BsTablet } from "react-icons/bs";
import { TbTemplate } from "react-icons/tb";
import { BiTrash } from "react-icons/bi";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import SidebarItem from "./SideBarItem";
import SidebarHeader from "./SidebarHeader";
import ProjectList from "./ProjectList";
import { useRouter } from "next/router";
import SearchModal from "../modal/SearchModal";
import CalenderModal from "../modal/calendermodal";
import CreateTeamspaceModal from "../modal/createteamspace";
import TrashModal from "../modal/trashmodal";

import { FiCalendar, FiChevronsRight, FiHome, FiInbox, FiMenu, FiSearch, FiSettings } from "react-icons/fi";
import InboxDrawer from "../drawel/inboxdrawer";

const SidebarComponent = ({ children }) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const router = useRouter();

    const [isHovered, setIsHovered] = useState(false);

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
        <Box minH="100vh" bg="#F7F7F5">
            <Box
                borderRight="1px"
                borderColor={'gray.200'}
                w={60}
                pos="fixed"
                h="full"
                display={sidebarVisible ? "block" : "none"}
                transition="width 0.3s ease"
                overflowY="auto"
            >
                <SidebarHeader handleSidebarToggle={handleSidebarToggle} />
                <Box p={4}>
                    <Tooltip label="Search" aria-label="Search tooltip" placement="right">
                        <SidebarItem
                            icon={<FiSearch />}
                            text="Search"
                            onClick={() => handleModalOpen('Search')}
                        />
                    </Tooltip>
                    <Tooltip label="Home" aria-label="Home tooltip" placement="right">
                        <SidebarItem
                            icon={<FiHome />}
                            text="Home"
                            onClick={() => navigate('/homepage')}
                        />
                    </Tooltip>
                    <Tooltip label="Inbox" aria-label="Inbox tooltip" placement="right">
                        <SidebarItem
                            onClick={handleDrawerOpen}
                            text="Inbox"
                            icon={<FiInbox />}
                        />
                    </Tooltip>
                    <Tooltip label="Settings" aria-label="Settings tooltip" placement="right">
                        <SidebarItem
                            icon={<FiSettings />}
                            text="Settings"
                            onClick={() => handleModalOpen('Settings')}
                        />
                    </Tooltip>
                </Box>

                <ProjectList />

                <Box p={4}>
                    <Tooltip label="Calendar" aria-label="Calendar tooltip" placement="right">
                        <SidebarItem
                            icon={<FiCalendar />}
                            text="Calendar"
                            onClick={() => handleModalOpen('calender')}
                        />
                    </Tooltip>
                    <Tooltip label="Create a Teamspace" aria-label="Create a Teamspace tooltip" placement="right">
                        <SidebarItem
                            icon={<BsTablet />}
                            text="Create a Teamspace"
                            onClick={() => handleModalOpen('teamspace')}
                        />
                    </Tooltip>
                    <Tooltip label="Templates" aria-label="Templates tooltip" placement="right">
                        <SidebarItem
                            onClick={() => navigate('/template')}
                            text="Templates"
                            icon={<TbTemplate />}
                        />
                    </Tooltip>
                    <Tooltip label="Trash" aria-label="Trash tooltip" placement="right">
                        <SidebarItem
                            icon={<BiTrash />}
                            text="Trash"
                            onClick={() => handleModalOpen('trash')}
                        />
                    </Tooltip>
                    <Tooltip label="Help & Support" aria-label="Help & Support tooltip" placement="right">
                        <SidebarItem
                            icon={<QuestionOutlineIcon />}
                            text="Help & Support"
                            onClick={() => handleModalOpen('help')}
                        />
                    </Tooltip>
                </Box>
            </Box>

            <Flex
                ml={sidebarVisible ? 60 : 0}
                p="4"
                height="10"
                alignItems="center"
                color="white"
                justifyContent="space-between"
                transition="margin-left 0.3s ease"
            >
                <IconButton
                    display={sidebarVisible ? 'none' : 'flex'}
                    mt={5}
                    onClick={handleSidebarToggle}
                    variant="outline"
                    icon={isHovered ? <FiChevronsRight /> : <FiMenu />}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    bg="#F7F7F5"
                    _hover={{
                        bg: "#E2E2E0"
                    }}
                />
            </Flex>

            <Box ml={sidebarVisible ? 60 : 0} p="4" transition="margin-left 0.3s ease">
                {children}
            </Box>

            <SearchModal isOpen={isModalOpen && modalTitle === 'Search'} onClose={handleModalClose} />
            <CalenderModal isOpen={isModalOpen && modalTitle === 'calender'} onClose={handleModalClose} />
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
