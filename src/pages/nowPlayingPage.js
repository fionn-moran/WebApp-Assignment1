import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getNowPlaying } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'

const NowPlayingPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('latest', getNowPlaying)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const nowPlaying = data.results;

 // Redundant, but necessary to avoid app crashing.
 const favorites = nowPlaying.filter(m => m.favorite)
 localStorage.setItem('favorites', JSON.stringify(favorites))
 const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Now Playing"
      movies={nowPlaying}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />;
      }}
    />
  );
};
export default NowPlayingPage;