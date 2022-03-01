import React from 'react'
import Button from '@mui/material/Button';
import TheatersIcon from '@mui/icons-material/Theaters';
import LinearProgress from '@mui/material/LinearProgress';

function Upload() {
    return (
        <div className="upload-button">
            <Button fullWidth variant="outlined"
                margin="dense" component="label"
                style={{ marginTop: '1rem' }}
                startIcon={<TheatersIcon />}>
                <input type="file" accept="image/*" style={{ display: 'none'}} />
                Upload
            </Button>
            <LinearProgress style={{ marginTop: "0.25rem"}} variant="determinate" value={50} />

        </div>
    )
}

export default Upload