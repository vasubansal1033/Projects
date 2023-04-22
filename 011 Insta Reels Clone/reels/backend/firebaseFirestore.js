import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

async function uploadObjectToFirestore(collection_name, id, obj) {
    const doc_reference = doc(db, collection_name, id);
    await setDoc(doc_reference, obj)
}

export { uploadObjectToFirestore }