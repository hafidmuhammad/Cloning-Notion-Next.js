import create from "zustand";
import { db } from "@/services/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

const useStore = create((set) => ({
  user: null,
  projectId: null,
  projects: [],
  setUser: (user) => set({ user }),
  createNewProject: async (uid) => {
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        uid,
        createdAt: new Date(),
        content: [],
      });
      set({ projectId: docRef.id });
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  fetchProjects: async (uid) => {
    try {
      const privateQuery = query(
        collection(db, "editorData"),
        where("uid", "==", uid)
      );
      const privateSnapshot = await getDocs(privateQuery);
      const privateProjects = privateSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const publicQuery = query(
        collection(db, "editorData"),
        where("viewerUid", "array-contains", uid)
      );
      const publicSnapshot = await getDocs(publicQuery);
      const publicProjects = publicSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      set({ privateProjects, publicProjects });
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
  deleteProject: async (projectId) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
      }));
      return true;
    } catch (e) {
      console.error("Error deleting project: ", e);
      return false;
    }
  },
  setProjectId: (id) => set({ projectId: id }),
}));

export default useStore;
