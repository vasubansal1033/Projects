import React, { useState, useEffect } from 'react'

export default function ImportantNote() {

    const [count, setCount] = useState(0);
    const [txt, setTxt] = useState({msg: ''});

    useEffect(() => {
        console.log("useEffect has been called");
        document.title = `Clicked ${count} times`
    }, [count])

    function changeText(e) {
        txt.msg = e.target.value;
        console.log(txt);

        // even calling setTxt wont work
        // since address is not changing
        // setTxt(txt)
        setTxt({...txt});
    }

    console.log('rendered');
    return (
        <div>
            <h1>Button has been clicked {count} times.</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <input type="text" value={txt.msg} onChange={(e) => changeText(e)} />
        </div>
    )
}
