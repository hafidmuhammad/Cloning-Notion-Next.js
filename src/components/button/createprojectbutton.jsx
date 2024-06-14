import { Box } from "@chakra-ui/react";
import { IoCreateOutline } from "react-icons/io5";
import useStore from "../hooks/useStore";
import { useRouter } from "next/router";


const CreateProjectButton = () => {

    const user = useStore((state) => state.user);

    const router = useRouter();

    const navigate = (path) => {
        router.push(path);
    }


    const handleCreateNewProject = () => {
        if (user) {
            navigate(`/create`);
        } else {
            console.log("User not logged in");
        }
    };

    return (
        <Box onClick={handleCreateNewProject} cursor="pointer" ml={2}>
            <IoCreateOutline size={24} />
        </Box>
    );
};

export default CreateProjectButton;
