import React from "react";
import MovieCard from "./MovieCard";
import { useState } from "react";
import { useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=69c03f5d';



const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //Ecrivons la fonction serchMovies 
  //Elle nous permetra de chercher les donnees a partir dun titre en faisant appel a l'api
  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`); //Appel de l'api utilisant le titre mis dans l'url
    const data = await response.json(); //

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Spiderman'); // On fait appell a la fonction qui nous envoi les donnees des le chargement de la page
  }, []);

  return (

    <div className="app">

      <h1>Moovie Room</h1>

      <div className="search">
        <input 
          placeholder="Rechercher des films"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
         src={SearchIcon} 
         alt="seach"
         onClick={() => searchMovies(searchTerm)}
        />
      </div>


      {
        movies?.length > 0 ?
        (
          <div className="container"> 
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>
              No Movies Found
            </h2>
          </div>
        )
      }

      
      
    </div>
  );
}

export default App;
