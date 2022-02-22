import React, { useState, useEffect } from 'react'

export default function InfiniteLoop1() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('useEffect has been called');
        document.title = `Clicked ${count} times`;

        // React compares two states
        // if same it stops to prevent infinite loop
        setCount(100); // wont result in infinite loop

        // these will result in infinite loop
        // setCount(count+1);
        // setCount(Math.random()*100);
    })
    return (
        <div>
            <h1>Current count {count}</h1>
            <button onClick={() => setCount(count + 1)}>Click here</button>
        </div>
    )
}
