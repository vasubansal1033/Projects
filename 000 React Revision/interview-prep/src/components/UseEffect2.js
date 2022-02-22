import React, { useState, useEffect } from 'react'

export default function UseEffect2() {

    const [count, setCount] = useState(0);
    // placing empty array calls useEffect only once
    // after the first render
    useEffect(() => {
        console.log("useEffect has been called");
        document.title = `Clicked ${count} times`
    }, [])
    console.log('rendered');
    return (
        <div>
            <h1>Button has been clicked {count} times.</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}
