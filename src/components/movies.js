import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Pagination from './common/pagination';
import ListGroup from "./common/listGroup";
import NavBar from './common/navbar';
import MoviesTable from "../components/moviesTable"
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

const pageSize = 4;
const startMovie = 0;
const endMovie = startMovie + pageSize;

class Movies extends Component {


    state = {
        movies: [],
        liked: false,
        pageSize: pageSize,
        startMovie: startMovie,
        endMovie: endMovie,
        disabledPrevious: true,
        currentPage: 1,
        genres: [],
        sortColumn: { path: 'title', order: 'asc' },
        selectedGenre: this.getGenres()[0]
    }

    componentDidMount() {
        const genres = [{ _id: '123423432', name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
        deleteMovie(movie._id);
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handleNext = () => {
        const startMovie = this.state.startMovie + this.state.moviesPerPage;
        const endMovie = startMovie + this.state.moviesPerPage;

        this.setState({
            startMovie: startMovie,
            endMovie: endMovie
        });
    }

    handlePrevious = () => {
        const startMovie = this.state.startMovie - this.state.pageSize;
        const endMovie = startMovie - this.state.pageSize - 1;
        let disabledPrevious = false;
        if (startMovie === 0) {
            disabledPrevious = true;
        }
        this.setState({
            startMovie: startMovie,
            endMovie: endMovie,
            disabledPrevious: disabledPrevious
        });
    }

    handlePageChange = (pageId) => {
        const startMovie = this.state.pageSize * (pageId - 1);
        const endMovie = startMovie + this.state.pageSize;
        this.setState({
            startMovie: startMovie,
            endMovie: endMovie,
            currentPage: pageId
        });
    }

    handleGenreSelect = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1
        });
    }

    handleSort = (sortColumn) => {

        this.setState({
            sortColumn: sortColumn
        });
    }


    getPagedData = () => {
        const { pageSize, movies: allMovies, sortColumn, currentPage, selectedGenre } = this.state;
        const filtered = selectedGenre && (selectedGenre.name !== 'All Genres')
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    }

    render() {
        const { pageSize, sortColumn, currentPage } = this.state;
        if (this.state.movies.length === 0) return <p>There are no movies in the database.</p>


        const { totalCount, data: movies } = this.getPagedData();

        return (
            <div>
                <div className="row">
                    <div className="col">
                        <NavBar></NavBar>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            items={this.state.genres}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreSelect}
                        ></ListGroup>
                    </div>
                    <div className="col">
                        <div>
                            <p>Showing {totalCount} movies in the database.</p>
                            <MoviesTable
                                movies={movies}
                                sortColumn={this.state.sortColumn}
                                onSort={this.handleSort}
                                onLike={this.handleLike}
                                onDelete={this.handleDelete}>
                            </MoviesTable>
                            <Pagination
                                pageSize={pageSize}
                                itemsCount={totalCount}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}
                            ></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderOld() {
        return (
            <React.Fragment>
                {this.getMovieCount()}
                {this.renderMovies()}
            </React.Fragment>
        );
    }

    renderMovies() {
        if (this.state.movies.length === 0) return <p>There are no movies in the database.</p>;
        return <ul>{this.state.movies.map(movie =>
            <li key={movie._id}>{this.renderTableRow(movie)}<button onClick={this.handleDelete}>Delete</button></li>)}</ul>;
    }

    renderTableRow(movie) {
        return `${movie.title} ${movie.genre.name} ${movie.numberInStock} ${movie.dailyRentalRate}`;
    }

    getMovieCount() {
        const movies = getMovies();
        return (
            <div className="m-2">
                Showing {movies.length} movies in the database.
            </div>
        );
    }

    getGenres() {
        let genres = [...getGenres()];
        genres.unshift({ _id: 56789, name: "All Genres" });
        return genres;
    }
}

export default Movies;
