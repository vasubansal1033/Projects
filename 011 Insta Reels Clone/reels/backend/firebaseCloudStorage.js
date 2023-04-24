import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateObjectOnFirestore, uploadObjectToFirestore } from "./firebaseFirestore";
import { arrayUnion } from "firebase/firestore";

async function uploadFileToCloudStorage(collection_name, refString, obj, file, setProgress = null, setError = null, setLoading = null) {
    const storageRef = ref(storage, refString);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    return uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            if (setProgress) {
                setProgress(progress);
            }

            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful upload
            console.log(error);
            if (setError) {
                setError(error.message)
            }
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            if (setLoading) {
                setLoading(false);
            }
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);

                if (collection_name == "posts") {
                    obj.postURL = downloadURL
                    await uploadObjectToFirestore(collection_name, obj.postId, obj);
                    await updateObjectOnFirestore("users", obj.uid, {
                        posts: arrayUnion(obj.postId)
                    })
                } else if (collection_name == "users") {
                    obj.photoURL = downloadURL
                    await uploadObjectToFirestore(collection_name, obj.uid, obj);
                }
                console.log(`Added ${obj} to collection: ${collection_name}`);
            });
        }
    );
}

export { uploadFileToCloudStorage }