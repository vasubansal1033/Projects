import React, { useState } from 'react'
import ListItem from './ListItem'

export default function List() {

    const [todoList, setTodoList] = useState([]);
    function addListItem() {
        let item = document.getElementById("myInput").value;
        document.getElementById("myInput").value = "";
        setTodoList([...todoList, item]);
    }
    function removeListItem(ridx) {
        let newList = todoList.filter((item, idx) => idx != ridx);
        setTodoList(newList);
    }

    return (
        <div>
            <div>
                <input type="text" id="myInput" className='border-2 m-2'></input>
                <button onClick={addListItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enter!</button>
            </div>

            <ul class="list-inside bg-gray-200">
                {
                    todoList.map((listItem, idx) => {
                        return (
                            <li className="m-2">
                                <div className='flex text-center items-center space-x-2'>
                                    <p>{listItem}</p>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                                        removeListItem(idx);
                                    }}>Delete</button>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>

        </div>
    )
}
