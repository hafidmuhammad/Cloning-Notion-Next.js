import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Center, Image, Text, Button, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiAbacus, BiCalendarAlt, BiData, BiVideo } from 'react-icons/bi';
import { BsBook, BsCalendar2Day, BsClock } from 'react-icons/bs';
import { TbDatabaseImport } from 'react-icons/tb';

const HomePage = () => {
    const router = useRouter();
    const { toggleColorMode } = useColorMode();

    const navigate = (path) => {
        router.push(path);
    };

    const RecentlyVisited = [
        {
            image: "https://www.wallpapers13.com/wp-content/uploads/2015/12/Nature-Lake-Bled.-Desktop-background-image-840x525.jpg",
            date: "2024-06-01",
            description: "React Native",
            id: "1"
        },
        {
            image: "https://www.wallpapers13.com/wp-content/uploads/2015/12/Winter-River-Nature-Trees-Landscape-HD-Wallpaper-840x525.jpg",
            date: "2024-06-02",
            description: "todo-list",
            id: "2"
        },
    ];

    const schedules = [
        {
            date: "Due, June 4",
            meetings: [
                {
                    title: "My First Meeting",
                    time: "09:00 AM"
                },
                {
                    title: "Launch",
                    time: "09:00 AM"
                }
            ]
        },
        {
            date: "tmr, June 5",
            meetings: [
                {
                    title: "Planning Session",
                    time: "10:00 AM"
                },
                {
                    title: "Team Stand-up",
                    time: "11:00 AM"
                }
            ]
        }
    ];

    return (
        <Box p="4" h="full" w="full" bg={useColorModeValue('gray.100', 'gray.800')}>
            <Center mb="6">
                <Text fontSize="4xl" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>Good afternoon, Hafid</Text>
            </Center>
            <Box>
                <Flex align="center" gap={2} my={5}>
                    <Box><BsClock /></Box>
                    <Text fontSize="lg" fontWeight="bold">Recently visited</Text>
                </Flex>
                <Flex mb="4" gap={4}>
                    {RecentlyVisited.map((item) => (
                        <Box key={item.id} h="180px" w="200px" borderRadius="xl" overflow="hidden" boxShadow="md">
                            <Box h="40%">
                                <Image src={item.image} alt={`Image ${item.id}`} objectFit="cover" h="100%" w="100%" />
                            </Box>
                            <Box p={3} textAlign="center">
                                <Text fontSize="md" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>{item.description}</Text>
                                <Text fontSize="sm" color="gray.500">{item.date}</Text>
                            </Box>
                        </Box>
                    ))}
                    <Box
                        bg={useColorModeValue('gray.100', 'gray.600')}
                        h="180px"
                        w="200px"
                        borderRadius="xl"
                        overflow="hidden"
                        boxShadow="md"
                        onClick={() => navigate('/createnewproject')}
                        _hover={{ cursor: 'pointer', bg: useColorModeValue('gray.200', 'gray.500') }}
                    >
                        <Box h="40%" bg={useColorModeValue('gray.200', 'gray.500')}></Box>
                        <Box p={3} textAlign="center">
                            <Icon as={AddIcon} boxSize="20px" color="gray.500" />
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <Box>
                <Flex align="center" gap={2} my={5}>
                    <Box><BsBook /></Box>
                    <Text fontSize="lg" fontWeight="bold">Upcoming events</Text>
                </Flex>
                <Flex mb="4" gap={4}>
                    {RecentlyVisited.map((item) => (
                        <Box key={item.id} bg={useColorModeValue('gray.100', 'gray.600')} h="180px" w="200px" borderRadius="xl" overflow="hidden" boxShadow="md">
                            <Box h="40%">
                                <Image src={item.image} alt={`Image ${item.id}`} objectFit="cover" h="100%" w="100%" />
                            </Box>
                            <Box p={3} textAlign="center">
                                <Text fontSize="md" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>{item.description}</Text>
                                <Text fontSize="sm" color="gray.500">{item.date}</Text>
                            </Box>
                        </Box>
                    ))}
                </Flex>
            </Box>
            <Box>
                <Flex align="center" gap={2} my={5}>
                    <Box><BiCalendarAlt /></Box>
                    <Text fontSize="lg" fontWeight="bold">Upcoming Events</Text>
                </Flex>
                <Flex mb="4" gap={4}>
                    <Flex h="300px" w="100%" borderRadius="xl" border="1px solid" bg={useColorModeValue('gray.100', 'gray.600')} boxShadow="md">
                        <Box d="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100%" p={4} w="50%">
                            <Box p={2}>
                                <BsCalendar2Day size="50px" />
                            </Box>
                            <Box>
                                <Text fontSize="md" color={useColorModeValue('gray.800', 'white')}>
                                    See your upcoming events and join meetings from Home.
                                </Text>
                            </Box>
                            <Box>
                                <Button mt={4} _hover={{ bg: "blue.500", color: "white" }}>Connect to Google Calendar</Button>
                            </Box>
                        </Box>
                        <Box h="100%" w="50%" borderLeft="1px solid" p={4} overflowY="auto" maxH="300px">
                            {schedules.map((item, i) => (
                                <Box key={i} mb={4}>
                                    <Text fontSize="sm" color="gray.500" mb={2}>{item.date}</Text>
                                    {item.meetings.map((meeting, j) => (
                                        <Flex key={j} justify="space-between" align="center" bg="gray.100" p={3} borderRadius="md" mb={2}>
                                            <Box>
                                                <Text fontWeight="bold">{meeting.title}</Text>
                                                <Text fontSize="sm" color="gray.500">{meeting.time}</Text>
                                            </Box>
                                            <Button size="sm" colorScheme="blue" leftIcon={<BiVideo />}>Join</Button>
                                        </Flex>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </Flex>
                </Flex>
            </Box>
            <Box>
                <Flex align="center" gap={2} my={5}>
                    <Box><BiData /></Box>
                    <Text fontSize="lg" fontWeight="bold">Home views</Text>
                </Flex>
                <Flex mb="4" gap={4}>
                    <Flex h="250px" w="100%" borderRadius="xl" border="1px solid" bg={useColorModeValue('gray.100', 'gray.600')} boxShadow="md">
                        <Box d="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100%" w="50%" p={5}>
                            <Box p={2}>
                                <TbDatabaseImport size="50px" />
                            </Box>
                            <Box p={2}>
                                <Text fontSize="md" color={useColorModeValue('gray.800', 'white')}>
                                    Pin a Database view to quickly access it from Home.
                                </Text>
                            </Box>
                            <Box>
                                <Button mt={4} _hover={{ bg: "blue.500", color: "white" }}>Select Databases</Button>
                            </Box>
                        </Box>
                        <Box h="100%" w="50%" borderLeft="1px solid" p={4}>
                            <Flex flexDirection="column" justifyContent="space-between" h="100%">
                                <Box>
                                    <Text fontSize="md" fontWeight="bold">Activity</Text>
                                    <Flex align="center" gap={2} borderTop="1px solid" p={2}>
                                        <BiAbacus />
                                        <Text>Wake Up and freshen up</Text>
                                    </Flex>
                                </Box>
                                <Text fontSize="md" fontWeight="bold">Status</Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default HomePage;
