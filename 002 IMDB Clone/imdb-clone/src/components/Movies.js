import React, { useState, useEffect } from 'react';
import Image from '../banner.jpg';
import axios from 'axios';
import { Oval } from 'react-loader-spinner'
import Pagination from './Pagination.js'

function Movies() {

    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [hoverId, setHoverId] = useState("");
    const [favorites, setFavorites] = useState([]);

    function goAhead() {
        setPageNumber(pageNumber + 1);
    }
    function goBack() {
        if (pageNumber > 1)
            setPageNumber(pageNumber - 1);
    }

    // useEffect works every time "after" the page get rendered
    useEffect(function () {
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=e527cb74ceedc0ff888ef45347ea9bb1&page=${pageNumber}`).then((res) => {
            console.table(res.data.results)
            setMovies(res.data.results)

            // load favorites from local storage
            let oldFav = localStorage.getItem("imdbFav");
            oldFav = JSON.parse(oldFav) || [];
            setFavorites([...oldFav]);
        }
        );
    }, [pageNumber])

    let add = (movie) => {
        let newArray = [...favorites, movie];
        setFavorites([...newArray]);
        // console.log(newArray);

        // save to local storage
        localStorage.setItem("imdbFav", JSON.stringify(newArray));
    }
    let rem = (movie) => {
        let newArray = favorites.filter((m)=>m.id!=movie.id);
        
        // let idx = newArray.indexOf(movie);
        // newArray.splice(idx, 1);
        setFavorites([...newArray]);
        
        // save to local storage
        localStorage.setItem("imdbFav", JSON.stringify(newArray));
    }

    return (
        <>
            <div className="mb-8">
                <div className="mt-8 mb-8 font-bold text-2xl text-center">Trending Movies</div>

                {

                    movies.length == 0 ?
                        <div className="flex justify-center">
                            <Oval
                                heigth="100"
                                width="100"
                                color='grey'
                                ariaLabel='loading'
                            />
                        </div> :
                        <div className="flex flex-wrap justify-center">

                            {
                                movies.map((movie) => (
                                    <div className={`
                                        bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})]
                                        h-[25vh] w-[150px]
                                        md: h-[30vh] md: w-[250px]
                                        bg-center bg-cover 
                                        rounded-xl
                                        flex items-end
                                        m-4
                                        hover:scale-110
                                        ease-out duration-300
                                        relative                    
                                    `}
                                        onMouseEnter={() => {
                                            setHoverId(movie.id);
                                        }}
                                        onMouseLeave={() => {
                                            setHoverId("");
                                        }}
                                    >
                                        {
                                            hoverId == movie.id &&
                                            <div>
                                                {
                                                    favorites.find((m) => m.id == movie.id) ?
                                                        <div className="
                                                        absolute top-2 right-2
                                                        p-2
                                                        rounded-2xl text-xl
                                                        bg-gray-800
                                                        cursor-pointer
                                                        "
                                                            onClick={() => rem(movie)}
                                                        >
                                                            ❌
                                                        </div>:
                                                        <div className="
                                                            absolute top-2 right-2
                                                            p-2
                                                            rounded-2xl text-xl
                                                            bg-gray-800
                                                            cursor-pointer
                                                            "
                                                            onClick={() => add(movie)}
                                                        >
                                                            ❤️
                                                        </div>
                                                }

                                                

                                            </div>

                                        }
                                        <div className="w-full bg-gray-900 bg-opacity-70 text-white text-center py-2 rounded-b-xl">{movie.title}</div>
                                    </div>

                                ))
                            }

                        </div>

                }
            </div>
            <Pagination page={pageNumber} goAhead={goAhead} goBack={goBack} />
        </>
    );
}

export default Movies
