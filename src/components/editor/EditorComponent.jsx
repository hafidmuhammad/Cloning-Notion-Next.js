import React, { useEffect, useRef, useState } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { useStoreHook } from '../hooks/useStore';
import tools from './tools';

const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
        {
            type: 'header',
            data: {
                text: 'This is my awesome editor!',
                level: 3,
            },
        },
    ],
};

const EditorComponent = ({ projectId, initialData }) => {
    const ejInstance = useRef(null);
    const editorRef = useRef(null);
    const { user, saveEditorData, setProjectId } = useStoreHook((state) => ({
        user: state.user,
        saveEditorData: state.saveEditorData,
        setProjectId: state.setProjectId,
    }));

    const [EditorJS, setEditorJS] = useState(null);
    const [newProjectId, setNewProjectId] = useState(null); // State untuk menyimpan newProjectId secara lokal

    const { colorMode } = useColorMode();

    useEffect(() => {
        const loadEditorJS = async () => {
            const { default: EditorJSClass } = await import('@editorjs/editorjs');
            setEditorJS(() => EditorJSClass);
        };
        loadEditorJS();
    }, []);

    useEffect(() => {
        if (!EditorJS || !editorRef.current || !user) {
            console.error('EditorJS, editor container, or user is not ready.');
            return;
        }

        const editorInstance = new EditorJS({
            holder: editorRef.current,
            onReady: () => {
                console.log('Editor.js is ready to work!');
            },
            autofocus: true,
            data: initialData || DEFAULT_INITIAL_DATA,
            onChange: async () => {
                try {
                    const content = await ejInstance.current.save();
                    console.log('Saving content:', content);
                    if (!projectId && !newProjectId) {
                        // Generate project ID locally if not available
                        const generatedProjectId = `project_${Math.random().toString(36).substr(2, 9)}`;
                        setNewProjectId(generatedProjectId);
                        setProjectId(generatedProjectId); // Set project ID di Zustand
                    }
                    await saveEditorData(projectId || newProjectId, content, user.uid);
                } catch (saveError) {
                    console.error('Error during saveEditorData:', saveError);
                }
            },
            tools,
        });

        ejInstance.current = editorInstance;

        return () => {
            if (editorInstance.destroy) {
                editorInstance.destroy();
            }
            ejInstance.current = null;
        };
    }, [EditorJS, user, saveEditorData, projectId, initialData, setProjectId, newProjectId]);

    if (!EditorJS) {
        return <div>Loading Editor...</div>;
    }

    return (
        <Box
            id="editorjs"
            ref={editorRef}
            bg={colorMode === 'dark' ? 'brand.100' : 'brand.900'}
            color={colorMode === 'dark' ? 'white' : 'black'}
            p={4}
            borderRadius="md"
            boxShadow={colorMode === 'dark' ? '0 4px 12px rgba(255, 255, 255, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)'}
        />
    );
};

export default EditorComponent;
