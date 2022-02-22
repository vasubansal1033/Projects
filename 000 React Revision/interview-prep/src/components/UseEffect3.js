import React, { useState, useEffect } from 'react'

export default function UseEffect2() {

    const [count, setCount] = useState(0);
    const [txt, setTxt] = useState('');

    // works whenever count is updated and during start
    useEffect(() => {
        console.log("useEffect has been called");
        document.title = `Clicked ${count} times`
    }, [count])

    // [] this will result in useEffect executing only once
    // useEffect(() => {
    //     console.log("useEffect has been called");
    //     document.title = `Clicked ${count} times`
    // }, [])
    console.log('rendered');
    return (
        <div>
            <h1>Button has been clicked {count} times.</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <input type="text" value={txt} onChange={(e) => setTxt(e.target.value)} />
        </div>
    )
}
