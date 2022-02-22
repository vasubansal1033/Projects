import React, { useState } from 'react'

export default function UncontrolledComponent() {

    const inputValue = React.createRef();
    function handleClick() {
        console.log(inputValue.current.value);
    }
    return (
        <div>
            <label>Name: </label>
            <input type="text" ref={inputValue} />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}
