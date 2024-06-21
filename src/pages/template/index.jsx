// // import { db } from "@/services/firebase";
// import { collection, query, getDocs, limit } from "firebase/firestore";
// import { Box } from "@chakra-ui/react"
// import { useEffect, useState } from "react";
// // import EditorComponent from "@/components/editor/EditorComponent";

// const TemplatePage = () => {
//     // const [data, setData] = useState([]);

//     // const getData = async () => {
//     //     try {
//     //         console.trace("getData() called from:");
//     //         const q = query(collection(db, "editorData"), limit(20));
//     //         const querySnapshot = await getDocs(q);
//     //         const arr = [];
//     //         querySnapshot.forEach((doc) => {
//     //             arr.push(doc.data());
//     //             console.log(doc.id, " => ", doc.data());
//     //         });
//     //         setData(arr);
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };

//     // useEffect(() => {
//     //     getData();
//     // }, []);
//     return (
//         <Box>
//             {/* <EditorComponent/> */}
//         </Box>
//     )
// }

// export default TemplatePage