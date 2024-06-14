import { useEffect, useState } from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import EditorComponent from './EditorComponent';

const DetailProject = () => {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const docRef = doc(db, "projects", projectId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProjectData(data);
                } else {
                    setError("Proyek tidak ditemukan.");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                setError("Terjadi kesalahan saat mengambil data proyek.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [projectId]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Text color="red.500">{error}</Text>;
    }

    return (
        <Box>
            {projectData ? (
                <EditorComponent projectId={projectId} uid={projectData.uid} initialData={projectData.content} />
            ) : (
                <Text>Proyek tidak ditemukan.</Text>
            )}
        </Box>
    );
};

export default DetailProject;
