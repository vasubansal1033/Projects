import React, { useState } from 'react';

function Pagination({ page, goAhead, goBack }) {

    return (
        <>
            <div className="w-full flex justify-center mb-8">
                <button
                    onClick={goBack}
                    className="
                    p-2
                    border-2 border-indigo-500 border-r-0
                    text-indigo-500
                    rounded-l-xl
                ">
                    Previous
                </button>
                <button className="
                    p-2
                    border-2 border-indigo-500
                    text-indigo-500
                    bg-gray-200
                ">
                    {page}
                </button>
                <button
                    onClick={goAhead}
                    className="
                    p-2
                    border-2 border-indigo-500 border-l-0
                    text-indigo-500  
                    rounded-r-xl                  
                ">
                    Next
                </button>

            </div>
        </>
    );
}
export default Pagination;
