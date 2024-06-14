import useStore from '@/components/hooks/useStore';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import EditorComponent from '@/components/EditorComponent';

export async function getServerSideProps({ params }) {
    // Ambil data yang dibutuhkan berdasarkan params.projectId
    const projectData = {}; // Misal data project

    return { props: { projectData } };
}

const CreateNewProjek = ({ projectData }) => {
    const user = useStore((state) => state.user);
    const createNewProject = useStore((state) => state.createNewProject);
    const router = useRouter();
    const { projectId } = router.query;
    const [currentProjectId, setCurrentProjectId] = useState(null);

    useEffect(() => {
        if (projectId) {
            setCurrentProjectId(projectId);
        }
    }, [projectId]);

    const navigate = (path) => {
        router.push(path);
    }

    const handleProjectCreation = async () => {
        if (user && !currentProjectId) {
            const newProjectId = await createNewProject(user.uid);
            setCurrentProjectId(newProjectId);
            navigate(`/create/${newProjectId}`, { replace: true });
        }
    };

    return (
        <div>
            <EditorComponent onEdit={handleProjectCreation} projectId={currentProjectId} uid={user?.uid} />
        </div>
    );
};

export default CreateNewProjek;
