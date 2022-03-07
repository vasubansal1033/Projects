import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function SearchUsers() {

    const [users, setUsers] = useState([]);
    useEffect(async () => {
        
        const unsub = await onSnapshot(collection(db, "users"), (snapshot) => {
            let tempArray = [];
            snapshot.docs.map((doc) => {
              tempArray.push(doc.data());
            })
            setUsers(tempArray);
            // console.log(posts);
          })
        //   return () => {
        //     unsub();
        //   }  
        return () =>{
            setUsers([]);
        }     

    }, []);

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        // console.log(result)
    }

    const handleOnSelect = (user) => {
        // the item selected
        console.log(user)
    }

    const handleOnFocus = () => {
        // console.log('Focused')
    }

    const formatResult = (user) => {
        return <>
            <span style={{ display: 'block', textAlign: 'left' }}>{user.name}</span>
        </>

    }

    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                        items={users}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        placeholder="Search here"
                    />
                </div>
            </header>
        </div>
    )
}


export default SearchUsers;
