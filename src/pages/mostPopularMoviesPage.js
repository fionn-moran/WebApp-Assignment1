import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getMostPopularMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'

const MostPopularMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('popular', getMostPopularMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const mostPopularMovies = data.results;

  return (
    <PageTemplate
      title="Most Popular Movies"
      movies={mostPopularMovies}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />;
      }}
    />
  );
};
export default MostPopularMoviesPage;