import React, { useState } from 'react'

export default function ControlledComponent() {

    const [txt, setTxt] = useState('');
    function handleClick() {
        console.log(txt);
    }
    return (
        <div>
            <label>Name: </label>
            <input type="text" value={txt}
                onChange={(e) => setTxt(e.target.value)} />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}
