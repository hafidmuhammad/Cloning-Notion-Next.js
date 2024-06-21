import { create } from 'zustand';
import { doc, setDoc, updateDoc, collection, query, where, onSnapshot, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useUserStoreHook } from './useUserStore';

const useProjectStore = create((set) => ({
    projectId: null,
    projects: [],
    publicProjects: [],
    privateProjects: [],

    setProjectId: (id) => set({ projectId: id }),

    fetchProjects: async () => {
        const { user } = useUserStoreHook(); 
        if (!user) return;

        try {
            const uid = user.uid;
            // Fetch private projects
            const privateQuery = query(collection(db, "editorData"), where("uid", "==", uid));
            const privateUnsubscribe = onSnapshot(privateQuery, (querySnapshot) => {
                const privateProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                set({ privateProjects });
            });

            // Fetch public projects
            const publicQuery = query(collection(db, "editorData"), where("viewerUid", "array-contains", uid));
            const publicUnsubscribe = onSnapshot(publicQuery, (querySnapshot) => {
                const publicProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                set({ publicProjects });
            });

            return () => {
                privateUnsubscribe();
                publicUnsubscribe();
            };
        } catch (e) {
            console.error("Error fetching projects: ", e);
        }
    },

    findUserByEmail: async (email) => {
        try {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                return { uid: userDoc.id, ...userDoc.data() };
            } else {
                return null;
            }
        } catch (e) {
            console.error("Error finding user by email: ", e);
            return null;
        }
    },

    updateProjectData: async (projectId, data) => {
        try {
            const projectRef = doc(db, "editorData", projectId);
            await updateDoc(projectRef, data);
            console.log("Document updated successfully.");
        } catch (e) {
            console.error("Error saving editor data:", e.message);
            alert(`Failed to save data: ${e.message}`);
        }
    },

    saveEditorData: async (projectId, content, uid) => {
        const projectRef = doc(db, "editorData", projectId);

        try {
            const projectDoc = await getDoc(projectRef);
            if (!projectDoc.exists()) {
                console.error("Document does not exist, creating new document.");
                // Initialize the document
                await setDoc(projectRef, {
                    uid: uid,
                    content: content,
                    createdAt: new Date(),
                    lastModifiedBy: uid,
                    lastModifiedAt: new Date()
                });
            } else {
                // Update existing document
                await updateDoc(projectRef, {
                    content: content,
                    lastModifiedBy: uid,
                    lastModifiedAt: new Date()
                });
            }

            console.log("Editor data saved successfully.");
        } catch (error) {
            console.error("Error saving editor data:", error);
        }
    },
}));

export const useProjectStoreHook = () => useProjectStore((state) => state);

export default useProjectStore;
