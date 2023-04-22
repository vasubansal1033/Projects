import React from 'react'
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

function Upload() {
    const [progress, setProgress] = React.useState(1);

    const LinearProgressWithLabel = (props, value) => {
        return (
            <Box sx={{ display: progress > 0 ? 'flex': 'none', alignItems: 'center', flexDirection: 'row', textAlign: 'center' }}>
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
        <div>
            <Box sx={{ width: '100%', marginTop: '0.5rem' }}>
                <LinearProgressWithLabel value={progress} />
            </Box>
            <Button variant="outlined"
                component="label"
                startIcon={<FileUploadIcon />}
                style={{ marginTop: '0.5rem', marginBottom: '1rem', padding: '1rem', fontSize: '1rem' }}>
                Upload
                <input hidden accept="image/*" multiple type="file" />
            </Button>
        </div>
    )
}

export default Upload