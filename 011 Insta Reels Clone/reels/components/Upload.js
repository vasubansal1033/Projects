import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import TheatersIcon from '@mui/icons-material/Theaters';
import LinearProgress from '@mui/material/LinearProgress';
import { AuthContext } from '../context/auth';
import Alert from '@mui/material/Alert';
import { v4 as uuidv4 } from 'uuid'
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Upload({ userData }) {

    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    // console.log('user is - ', user);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file == null) {
            setError('Please select a file');
            setTimeout(() => {
                setError('');
            }, 3000)
            return;
        }
        if (file.size / (1024 * 1024) > 30) {
            setError("Please select a smaller file");
            setTimeout(() => {
                setError('');
            }, 3000)
            return;
        }
        let uid = uuidv4();
        setLoading(true);
        const storageRef = ref(storage, `${userData?.uid}/posts/${uid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(prog);
                console.log('Upload is ' + prog + '% done');
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
                // Handle unsuccessful uploads
                console.log(error)
                setError(error.message);
                setTimeout(() => {
                    setError('');
                }, 3000)
                return;
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    let obj = {
                        likes: [],
                        postId: uid,
                        postURL: downloadURL,
                        profileName: userData.name,
                        profileURL: userData.photoURL,
                        uid: userData.uid,
                        timestamp: serverTimestamp()
                    }
                    console.log(obj);
                    await setDoc(doc(db, 'posts', uid), obj);                    
                    console.log('post added successfully')

                    await updateDoc(doc(db, 'users', userData.uid), {
                        posts: arrayUnion(uid)
                    })
                    setLoading(false);
                    setProgress(0);

                });
            }
        );
    }
    return (
        <div className="upload-button">
            {
                error != '' ? <Alert severity="error">{error}</Alert> :
                    <Button fullWidth variant="outlined"
                        margin="dense" component="label"
                        style={{ marginTop: '1rem' }}
                        startIcon={<TheatersIcon />}>
                        <input type="file" accept="video/*" style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                        Upload
                    </Button>
            }


            {
                loading &&
                <LinearProgress style={{ marginTop: "0.25rem" }} variant="determinate" value={progress} />
            }

        </div>
    )
}

export default Upload