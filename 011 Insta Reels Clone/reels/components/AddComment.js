import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

function AddComment() {

    const [text, setText] = useState('');
    return (
        <div style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center'
        }}>
            <TextField size='small' id="filled-basic" label="Add your comment" variant="outlined"
                value={text}
                onChange={(e) => { setText(e.target.value) }}
            />
            <Button endIcon={<SendIcon />}>Post</Button>
        </div>
    )
}

export default AddComment