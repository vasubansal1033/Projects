import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

function Favorites() {

    const [currGenre, setCurrGenre] = useState('All Genres');
    const [favorites, setFavorites] = useState([]);
    const [genres, setGenres] = useState([]);
    const [ratingOrder, setRatingOrder] = useState(0);
    const [popularityOrder, setPopularityOrder] = useState(0);
    const [searchString, setSearchString] = useState("");
    const [numRows, setNumRows] = useState(5);
    const [currPage, setCurrPage] = useState(1);

    const genreMap = [{
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
    ]

    const movies = [{
        "adult": false,
        "backdrop_path": "/oQPbZ5e6J9fuAyv4Gl0mMZMIyPI.jpg",
        "genre_ids": [
            28,
            12,
            53,
            10752
        ],
        "vote_count": 746,
        "original_language": "en",
        "original_title": "The King's Man",
        "poster_path": "/nj5HmHRZsrYQEYYXyAusFv35erP.jpg",
        "title": "The King's Man",
        "video": false,
        "vote_average": 7.1,
        "id": 476669,
        "overview": "As a collection of history's worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man must race against time to stop them.",
        "release_date": "2021-12-22",
        "popularity": 1808.069,
        "media_type": "movie"
    },
    {
        "adult": false,
        "backdrop_path": "/ilty8eu65u6vCJpyMva9ele8Qtm.jpg",
        "genre_ids": [
            35,
            10749,
            10402
        ],
        "original_language": "en",
        "original_title": "Marry Me",
        "poster_path": "/ko1JVbGj4bT8IhCWqjBQ6ZtF2t.jpg",
        "video": false,
        "id": 615904,
        "vote_count": 36,
        "overview": "Explores the possibilities of what might happen when a superstar marries an average Joe as a joke and discovers that perhaps there are no accidents.",
        "release_date": "2022-02-09",
        "vote_average": 7.6,
        "title": "Marry Me",
        "popularity": 758.545,
        "media_type": "movie"
    },
    {
        "genre_ids": [
            28,
            12,
            878
        ],
        "original_language": "en",
        "original_title": "Spider-Man: No Way Home",
        "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        "video": false,
        "vote_average": 8.4,
        "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
        "release_date": "2021-12-15",
        "vote_count": 7616,
        "id": 634649,
        "adult": false,
        "backdrop_path": "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
        "title": "Spider-Man: No Way Home",
        "popularity": 10594.413,
        "media_type": "movie"
    },
    {
        "vote_count": 40,
        "id": 800510,
        "adult": false,
        "backdrop_path": "/mruT954ve6P1zquaRs6XG0hA5k9.jpg",
        "release_date": "2022-02-10",
        "genre_ids": [
            53
        ],
        "overview": "A tech worker with agoraphobia discovers recorded evidence of a violent crime, but is met with resistance when she tries to report it. Seeking justice, she must do the thing she fears the most: she must leave her apartment.",
        "original_language": "en",
        "original_title": "Kimi",
        "poster_path": "/okNgwtxIWzGsNlR3GsOS0i0Qgbn.jpg",
        "title": "Kimi",
        "video": false,
        "vote_average": 6.8,
        "popularity": 112.652,
        "media_type": "movie"
    },
    {
        "video": false,
        "vote_average": 5.9,
        "overview": "Humans have ceded most tasks to AI in 2045, even in nostalgic Alice's home. So when robots stage a coup, her androids protectively lock her doors.",
        "release_date": "2022-02-11",
        "id": 665828,
        "adult": false,
        "backdrop_path": "/uQUquwEvPuCg0ACRxU5NiCGgJLN.jpg",
        "vote_count": 26,
        "genre_ids": [
            878,
            35
        ],
        "title": "Bigbug",
        "original_language": "fr",
        "original_title": "Bigbug",
        "poster_path": "/6tnbyP3qxB5Gn6sPeKDgl61BL71.jpg",
        "popularity": 69.888,
        "media_type": "movie"
    },
    {
        "first_air_date": "2022-01-27",
        "id": 135934,
        "backdrop_path": "/lX33BV2g6O2B6PwMtTUSyzGrfq9.jpg",
        "genre_ids": [
            16,
            10765
        ],
        "overview": "They're rowdy, they're ragtag, they're misfits turned mercenaries for hire. Vox Machina is more interested in easy money and cheap ale than actually protecting the realm. But when the kingdom is threatened by evil, this boisterous crew realizes that they are the only ones capable of restoring justice.",
        "original_language": "en",
        "poster_path": "/4fqfhmVNOHe2nLcligiVMtMnfeM.jpg",
        "vote_average": 8.8,
        "name": "The Legend of Vox Machina",
        "vote_count": 53,
        "origin_country": [
            "US"
        ],
        "original_name": "The Legend of Vox Machina",
        "popularity": 91.837,
        "media_type": "tv"
    },
    {
        "original_language": "en",
        "original_title": "I Want You Back",
        "poster_path": "/mljQydSPAmyshvq1WHKveNfDLeC.jpg",
        "video": false,
        "vote_average": 6,
        "overview": "Peter and Emma thought they were on the precipice of life’s biggest moments – marriage, kids, and houses in the suburbs – until their respective partners dumped them. Horrified to learn that the loves of their lives have already moved on, Peter and Emma hatch a hilarious plan to win back their exes with unexpected results.",
        "release_date": "2022-02-10",
        "vote_count": 17,
        "title": "I Want You Back",
        "adult": false,
        "backdrop_path": "/qfKVvAjIKCocpjTAjxT6WkAA3MG.jpg",
        "id": 680860,
        "genre_ids": [
            35,
            10749
        ],
        "popularity": 73.969,
        "media_type": "movie"
    },
    {
        "adult": false,
        "backdrop_path": "/xByXRGWUzCHdiENxBH2urvsVAFm.jpg",
        "genre_ids": [
            10749,
            35
        ],
        "id": 760517,
        "original_language": "ko",
        "original_title": "모럴센스",
        "overview": "Love never hurt so good for two co-workers who enter a contractual relationship as partners in consensual play, pleasure and pain.",
        "poster_path": "/yQgGYiHUoDYeA4TbYlghpA5lmKH.jpg",
        "release_date": "2022-02-11",
        "title": "Love and Leashes",
        "video": false,
        "vote_average": 6.8,
        "vote_count": 7,
        "popularity": 76.304,
        "media_type": "movie"
    },
    {
        "poster_path": "/eyKkLdst2vFRjCC89C3NqGCLpNE.jpg",
        "id": 772272,
        "video": false,
        "vote_average": 6.7,
        "overview": "After Jodi Kreyman gains popularity, her miscommunications start causing rifts with those around her and now she really needs to `stand tall`.",
        "release_date": "2022-02-11",
        "adult": false,
        "backdrop_path": "/vM9gdUBvSKRasOjBarZimJEfN3H.jpg",
        "vote_count": 29,
        "genre_ids": [
            35,
            18,
            10749
        ],
        "title": "Tall Girl 2",
        "original_language": "en",
        "original_title": "Tall Girl 2",
        "popularity": 99.985,
        "media_type": "movie"
    },
    {
        "backdrop_path": "/fiKQKFsjahOr8qj7QsUUHO9E70t.jpg",
        "id": 95665,
        "genre_ids": [
            18
        ],
        "original_language": "en",
        "original_name": "Inventing Anna",
        "origin_country": [
            "US"
        ],
        "vote_average": 6.7,
        "overview": "A journalist with a lot to prove investigates the case of Anna Delvey, the Instagram-legendary German heiress who stole the hearts of New York’s social scene – and stole their money as well.",
        "vote_count": 10,
        "first_air_date": "2022-02-11",
        "poster_path": "/jzCnl9wACp0eUMa3IG5e0aSJIXD.jpg",
        "name": "Inventing Anna",
        "popularity": 112.543,
        "media_type": "tv"
    },
    {
        "backdrop_path": "/sjx6zjQI2dLGtEL0HGWsnq6UyLU.jpg",
        "id": 115036,
        "genre_ids": [
            10759,
            10765
        ],
        "original_language": "en",
        "original_name": "The Book of Boba Fett",
        "origin_country": [
            "US"
        ],
        "vote_average": 8.3,
        "overview": "Legendary bounty hunter Boba Fett and mercenary Fennec Shand must navigate the galaxy’s underworld when they return to the sands of Tatooine to stake their claim on the territory once ruled by Jabba the Hutt and his crime syndicate.",
        "vote_count": 960,
        "first_air_date": "2021-12-29",
        "poster_path": "/gNbdjDi1HamTCrfvM9JeA94bNi2.jpg",
        "name": "The Book of Boba Fett",
        "popularity": 1820.125,
        "media_type": "tv"
    },
    {
        "adult": false,
        "backdrop_path": "/4V5EWfD7ydCF2sZlePaWar7zVOd.jpg",
        "genre_ids": [
            18,
            10749,
            10402
        ],
        "vote_count": 4,
        "original_language": "en",
        "original_title": "The Sky Is Everywhere",
        "poster_path": "/qMVUlq6rdqFo1xZ5ozQcKFCDbgj.jpg",
        "video": false,
        "title": "The Sky Is Everywhere",
        "vote_average": 7.8,
        "release_date": "2022-02-11",
        "overview": "Lennie is a teen musical prodigy grieving the death of her sister when she finds herself caught between a new guy at school and her sister's devastated boyfriend. Through her vivid imagination and conflicted heart, Lennie navigates first love and first loss.",
        "id": 640265,
        "popularity": 81.887,
        "media_type": "movie"
    },
    {
        "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
        "id": 568124,
        "video": false,
        "vote_average": 7.8,
        "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
        "release_date": "2021-11-24",
        "adult": false,
        "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
        "vote_count": 4219,
        "genre_ids": [
            16,
            35,
            10751,
            14
        ],
        "title": "Encanto",
        "original_language": "en",
        "original_title": "Encanto",
        "popularity": 4413.945,
        "media_type": "movie"
    },
    {
        "adult": false,
        "backdrop_path": "/jdLsmpqmP1wTdFUPtmxMnYgoifT.jpg",
        "genre_ids": [
            18,
            80,
            53
        ],
        "original_language": "en",
        "original_title": "House of Gucci",
        "poster_path": "/vHla3Ej2m53rNmvmYkzvennLrKn.jpg",
        "vote_count": 962,
        "video": false,
        "vote_average": 6.7,
        "title": "House of Gucci",
        "overview": "When Patrizia Reggiani, an outsider from humble beginnings, marries into the Gucci family, her unbridled ambition begins to unravel the family legacy and triggers a reckless spiral of betrayal, decadence, revenge, and ultimately…murder.",
        "release_date": "2021-11-24",
        "id": 644495,
        "popularity": 970.123,
        "media_type": "movie"
    },
    {
        "video": false,
        "vote_average": 7.2,
        "overview": "An ambitious carnival man with a talent for manipulating people with a few well-chosen words hooks up with a female psychiatrist who is even more dangerous than he is.",
        "release_date": "2021-12-02",
        "adult": false,
        "backdrop_path": "/8xj2PPpKwKUu4lV8jiNnig220od.jpg",
        "id": 597208,
        "genre_ids": [
            80,
            18,
            53
        ],
        "vote_count": 610,
        "original_language": "en",
        "original_title": "Nightmare Alley",
        "poster_path": "/680klE0dIreQQOyWKFgNnCAJtws.jpg",
        "title": "Nightmare Alley",
        "popularity": 687.788,
        "media_type": "movie"
    },
    {
        "original_title": "Das Privileg",
        "poster_path": "/qBLi3Nd5JMQGMiOmmfuPgLw5SzD.jpg",
        "title": "The Privilege",
        "video": false,
        "vote_average": 5.6,
        "overview": "A wealthy teen and his friends attending an elite private school uncover a dark conspiracy while looking into a series of strange supernatural events.",
        "release_date": "2022-02-09",
        "adult": false,
        "backdrop_path": "/tN5Ws9NXR6N3LR2S39rHfCXrFkN.jpg",
        "vote_count": 30,
        "genre_ids": [
            27
        ],
        "id": 926980,
        "original_language": "de",
        "popularity": 118.082,
        "media_type": "movie"
    },
    {
        "adult": false,
        "backdrop_path": "/i9rEpTqC6aIQOWOc4PDEEAE3hFe.jpg",
        "genre_ids": [
            878,
            10749
        ],
        "original_language": "en",
        "original_title": "The In Between",
        "poster_path": "/7RcyjraM1cB1Uxy2W9ZWrab4KCw.jpg",
        "video": false,
        "vote_average": 6.7,
        "vote_count": 3,
        "overview": "After surviving a car accident that took the life of her boyfriend, a teenage girl believes he's attempting to reconnect with her from the after world.",
        "release_date": "2022-02-11",
        "id": 818750,
        "title": "The In Between",
        "popularity": 68.249,
        "media_type": "movie"
    },
    {
        "adult": false,
        "backdrop_path": "/EnDlndEvw6Ptpp8HIwmRcSSNKQ.jpg",
        "genre_ids": [
            14,
            35,
            12
        ],
        "original_language": "en",
        "original_title": "Ghostbusters: Afterlife",
        "poster_path": "/sg4xJaufDiQl7caFEskBtQXfD4x.jpg",
        "video": false,
        "id": 425909,
        "vote_count": 1934,
        "overview": "When a single mom and her two kids arrive in a small town, they begin to discover their connection to the original Ghostbusters and the secret legacy their grandfather left behind.",
        "release_date": "2021-11-11",
        "vote_average": 7.7,
        "title": "Ghostbusters: Afterlife",
        "popularity": 2105.587,
        "media_type": "movie"
    },
    {
        "adult": false,
        "backdrop_path": "/lRbDyjI7HEaXxflFQbYpqHRGFBJ.jpg",
        "genre_ids": [
            9648,
            80,
            18
        ],
        "original_language": "en",
        "original_title": "Death on the Nile",
        "poster_path": "/oT4vRVzulbN72602tTPFCwotl7a.jpg",
        "video": false,
        "vote_average": 6.8,
        "vote_count": 122,
        "overview": "Belgian sleuth Hercule Poirot boards a glamorous river steamer with enough champagne to fill the Nile. But his Egyptian vacation turns into a thrilling search for a murderer when a picture-perfect couple’s idyllic honeymoon is tragically cut short.",
        "release_date": "2022-02-09",
        "id": 505026,
        "title": "Death on the Nile",
        "popularity": 353.393,
        "media_type": "movie"
    },
    {
        "adult": false,
        "backdrop_path": "/oglAnrN97uXOIUB7Azvka6eeH7V.jpg",
        "genre_ids": [
            35,
            18,
            10749
        ],
        "id": 933547,
        "original_language": "pl",
        "original_title": "Pod Wiatr",
        "poster_path": "/y2lylZT9Czehopiln1D9hc1Bb84.jpg",
        "vote_count": 7,
        "video": false,
        "vote_average": 5.1,
        "title": "Into The Wind",
        "overview": "She graduated from a prestigious high school in Warsaw and entered medicine in London. He works as a kitesurfing instructor at the seaside, thanks to which he combines earning money and passion. They will meet in Hel. The unusual charm of the boy makes the girl exceed her limits and enter a completely unknown world of kitesurfing, music and fun. The feeling that arises between them does not please her family or his friends. Is Ania and Michal's relationship strong enough to overcome adversities and become more than just a holiday love?",
        "release_date": "2022-02-10",
        "popularity": 56.703,
        "media_type": "movie"
    }
    ]

    function getGenre(genre_id) {
        let id;
        for (let i = 0; i < genreMap.length; i++) {
            if (genreMap[i].id == genre_id) {
                return genreMap[i].name;
            }
        }
    }
    let rem = (movie) => {
        let newArray = favorites.filter((m) => m.id != movie.id);

        // let idx = newArray.indexOf(movie);
        // newArray.splice(idx, 1);
        setFavorites([...newArray]);

        // save to local storage
        localStorage.setItem("imdbFav", JSON.stringify(newArray));
    }

    // to get favorite movies
    useEffect(() => {
        let oldFav = localStorage.getItem("imdbFav");
        oldFav = JSON.parse(oldFav) || [];
        setFavorites([...oldFav]);
        // console.log(favorites);
    }, []);
    // to get all genres
    useEffect(() => {
        let temp = favorites.map((movie) => getGenre(movie.genre_ids[0]));

        // to prevent duplication of genres
        temp = [...new Set(temp)];

        setGenres(["All Genres", ...temp]);
        // console.log(temp);
    }, [favorites])

    // filter according to genre
    let filteredMovies = [];
    filteredMovies = currGenre == 'All Genres' ? favorites :
        favorites.filter((movie) => {
            return getGenre(movie.genre_ids[0]) == currGenre
        })

    // sorting
    if (ratingOrder == 1) {
        filteredMovies = filteredMovies.sort(function (movieA, movieB) {
            return movieA.vote_average - movieB.vote_average;
        })
    } else if (ratingOrder == -1) {
        filteredMovies = filteredMovies.sort(function (movieA, movieB) {
            return movieB.vote_average - movieA.vote_average;
        })
    }
    if (popularityOrder == 1) {
        filteredMovies = filteredMovies.sort(function (movieA, movieB) {
            return movieA.popularity - movieB.popularity;
        })
    } else if (popularityOrder == -1) {
        filteredMovies = filteredMovies.sort(function (movieA, movieB) {
            return movieB.popularity - movieA.popularity;
        })
    }

    filteredMovies = filteredMovies.filter((movie) => {
        return movie.title.toLowerCase().includes(searchString.toLowerCase());
    });

    // pagination
    let maxPage = Math.ceil(filteredMovies.length / numRows);
    let startIdx = (currPage - 1) * numRows;
    // console.log(startIdx, numRows, startIdx+numRows);
    let endIdx = startIdx + numRows;

    filteredMovies = filteredMovies.slice(startIdx, endIdx);

    function goAhead() {
        if (currPage < maxPage) {
            setCurrPage(currPage + 1);
        }
    }
    function goBack() {
        if (currPage > 1) {
            setCurrPage(currPage - 1);
        }
    }

    return (
        <div>
            <div className="mt-4 px-2 flex justify-center flex-wrap">
                {
                    genres.map((genre) => {
                        return <button className={
                            currGenre == genre ?
                                `m-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold` :
                                `m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white
                            rounded-xl font-bold`
                        }
                            onClick={() => {
                                setCurrPage(1);
                                setCurrGenre(genre);
                            }}
                        >
                            {genre}
                        </button>
                    })
                }

            </div>

            {/* search fields */}
            <div className="text-center">
                <input placeholder="Search"
                    className="border-2 text-center p-1 m-2"
                    value={searchString}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        setSearchString(e.target.value);
                    }}
                ></input>
                <input placeholder="Rows"
                    className="border-2 text-center p-1 m-2"
                    onChange={(e) => {
                        setNumRows(Number(e.target.value));
                    }}
                ></input>
            </div>

            {/* Table start */}
            <div className="flex flex-col m-4">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            <div className="flex flex-wrap justify-center items-center">
                                                <img src="https://img.icons8.com/cotton/64/000000/circled-chevron-up.png"
                                                    className="cursor-pointer scale-50"
                                                    onClick={() => { setRatingOrder(1); setPopularityOrder(0) }} />
                                                Rating
                                                <img src="https://img.icons8.com/cotton/64/000000/circled-chevron-down--v2.png"
                                                    className="cursor-pointer scale-50 mr-2"
                                                    onClick={() => { setRatingOrder(-1); setPopularityOrder(0) }} />
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            <div className="flex flex-wrap justify-center items-center">
                                                <img src="https://img.icons8.com/cotton/64/000000/circled-chevron-up.png"
                                                    className="cursor-pointer scale-50"
                                                    onClick={() => { setPopularityOrder(1); setRatingOrder(0) }} />
                                                Popularity
                                                <img src="https://img.icons8.com/cotton/64/000000/circled-chevron-down--v2.png"
                                                    className="cursor-pointer scale-50"
                                                    onClick={() => { setPopularityOrder(-1); setRatingOrder(0) }} />
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Genre
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Remove
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredMovies.map((movie) => (
                                        <tr key={movie.id}>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-100 w-100" src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} title={movie.overview} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{movie.original_title}</div>
                                                        <div className="text-sm text-gray-500">{movie.title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap text-center">
                                                <div className="text-sm text-gray-900">{movie.vote_average}</div>
                                                <div className="text-sm text-gray-500">{movie.vote_average}</div>
                                            </td>
                                            <td className="px-6 py-6 text-center whitespace-nowrap">
                                                <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {movie.popularity}
                                                </span>
                                            </td>
                                            <td className="text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                <div className="flex justify-center text-center">
                                                    {
                                                        movie.genre_ids.map((genre_id, idx) => {
                                                            if (idx != movie.genre_ids.length - 1)
                                                                return getGenre(genre_id) + ', ';
                                                            else
                                                                return getGenre(genre_id);
                                                        })
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap text-center text-sm font-medium">
                                                <button href="#" className="text-indigo-400 font-bold hover:text-indigo-900"
                                                    onClick={() => rem(movie)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Table end */}
            <div>
                <Pagination page={currPage} goAhead={goAhead} goBack={goBack} />
            </div>
        </div>
    );

}
export default Favorites;
