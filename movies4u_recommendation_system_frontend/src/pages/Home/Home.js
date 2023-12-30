import React from 'react'
import { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar";
import MovieCard from '../../components/MovieCard';
import "../../styles/HomeStyles.css";


const Home = () => {
    const apiKey = "api_key=ac8fa6bbb0a3da077362b5d13c5e67f0";;
    const [list, setList] = useState([]);
    const [homeGenreList, setHomeGenreList] = useState([{}]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [currMovies, setCurrMovies] = useState([{}]);

    useEffect(() => {
        setList([]);
        setHomeGenreList([]);
        setSelectedGenres([]);
        setCurrMovies([]);

        //getting the list of all movies from our flask server for our searchbar
        fetch("/api/movies").then((Response) =>
            Response.json().then((data) => {
                setList(data.arr)})
        );
        // getting the list of all genres
        fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`).then(
            (Response) =>
                Response.json().then((data) => setHomeGenreList(data.genres))
        );
    }, []);

    useEffect(() => {
        // console.log(list);
        // console.log(homeGenreList);
        setCurrMovies([]);
        if (selectedGenres.length > 0) {
            fetch(
                `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${apiKey}&release_date.lte=2019-12-12&with_genres=${encodeURI(
                    selectedGenres.join(",")
                )}`
            ).then((Response) =>
                Response.json().then((data) => setCurrMovies(data.results))
            );
        }
    }, [selectedGenres]);

    const onTagClick = (genreId) => {
        let isPresent = false;
        for (let id of selectedGenres) {
            if (id === genreId) {
                isPresent = true;
                break;
            }
        }
        if (isPresent) {
            setSelectedGenres(
                selectedGenres.filter((item) => item !== genreId)
            );
        } else {
            setSelectedGenres((selectedGenres) => [...selectedGenres, genreId]);
        }
    };
    const renderMovies = () =>
        currMovies.map((movie) => {
            if (movie) {
                return (
                    <MovieCard
                        key={movie.id + movie.original_title}
                        movie={movie}
                    />
                );
            } else {
                return null;
            }
        });

    return (
        <div className="container-fluid">
            <div className="HomePage">
                <div className="HomeSearch">
                    {/* Rendering the searchbar */}
                    <Searchbar movies={list} placeholder="Search for a Movie" />
                </div>

                <h2 className="genreHeader">Get Top Movies Based On Genre </h2>
                <div className="buttonGrid">
                    {homeGenreList.map((genre) => (
                        <div
                            key={genre.id}
                            onClick={() => onTagClick(genre.id)}
                            className={
                                selectedGenres.includes(genre.id)
                                    ? "genreTagON"
                                    : "genreTagOFF"
                            }
                        >
                            {genre.name}
                            {selectedGenres.includes(genre.id) ? (
                                <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                ></i>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
            {/*Rendering selected genre movies */}
            <div className="container-fluid HomeMovies">
                <div className="container HomeMovieGrid">
                    {currMovies.length > 0 ? renderMovies() : null}
                </div>
            </div>
        </div>
    )
}

export default Home