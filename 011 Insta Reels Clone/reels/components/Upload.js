import React, { useState } from 'react'
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { uploadFileToCloudStorage } from '../backend/firebaseCloudStorage';
import { v4 } from 'uuid';
import { serverTimestamp } from 'firebase/firestore';

function Upload({ userData }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file == null) {
            setError("Please select a file!");
            setTimeout(() => {
                setError('');
            }, 2000);
        }
        if (file.size / (1024 * 1024) > 50) {
            setError("Please select a smaller file");
            setTimeout(() => {
                setError('');
            }, 2000);
        }

        const postUuid = v4();
        setLoading(true);

        const obj = {
            likes: [],
            comments: [],
            postId: postUuid,
            profileName: userData.name,
            profileURL: userData.photoURL,
            uid: userData.uid,
            timestamp: serverTimestamp()
        }
        await uploadFileToCloudStorage(
            "posts",
            `${userData.uid}/posts/${postUuid}`,
            obj,
            file,
            setProgress,
            setError,
            setLoading
        );

    }

    const LinearProgressWithLabel = (props, value) => {
        return (
            <Box sx={{ display: progress > 0 ? 'flex' : 'none', alignItems: 'center', flexDirection: 'row', textAlign: 'center' }}>
                <Box sx={{ width: '100%', mr: 0 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <div className='upload-container'>
            <Box sx={{ width: '100%', marginTop: '0.5rem' }}>
                {
                    loading && <LinearProgressWithLabel value={progress} />
                }
            </Box>

            {
                error != '' ?
                    <Alert severity="error">{error}</Alert>
                    :
                    <Button variant="outlined"
                        startIcon={<FileUploadIcon />}
                        component="label"
                        style={{ padding: '0.5rem', fontSize: '1rem' }}
                        onChange={handleFileChange}
                    >
                        Upload

                        <input hidden accept="video/*" multiple type="file" />
                    </Button>
            }
            {
                loading && (progress > 0 && progress < 100) &&
                <Alert severity="info">Your file upload is in progress</Alert>
            }
            {
                !loading && progress == 100 && <Alert severity="success">File has been uploaded successfully</Alert>
            }
        </div >
    )
}

export default Upload