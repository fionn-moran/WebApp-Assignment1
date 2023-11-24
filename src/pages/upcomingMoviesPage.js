import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'

const UpcomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const upcomingMovies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const watchlist = upcomingMovies.filter((m) => m.watchlist);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  const addToWatchlist = (movieId) => true;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={upcomingMovies}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />;
      }}
    />
  );
};
export default UpcomingMoviesPage;