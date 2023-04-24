import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

async function uploadObjectToFirestore(collection_name, id, obj) {
    const doc_reference = doc(db, collection_name, id);
    await setDoc(doc_reference, obj)
}

async function updateObjectOnFirestore(collection_name, id, obj) {
    const doc_reference = doc(db, collection_name, id);
    await updateDoc(doc_reference, obj);
}

async function downloadDataFromFireStore(collection_name, id, setUserData, setPostIds = null) {
    const doc_reference = doc(db, collection_name, id);
    let data = {};
    const unsub = onSnapshot(doc_reference, (doc) => {
        data = doc.data();
        setUserData(data);
        if (setPostIds) {
            setPostIds(data.posts);
        }
    })

    return () => {
        unsub();
    }
}

export { uploadObjectToFirestore, updateObjectOnFirestore, downloadDataFromFireStore }