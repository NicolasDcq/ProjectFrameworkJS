import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: []
    },
    actions: {
        getMoviesFromApi(context) {
            axios.get('http://localhost:3000/api/movies/all')
                .then(function (response) {
                    context.commit('updateMovies', response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        editMovieFromApi(context, data) {
            let url = 'http://localhost:3000/api/movies/' + data.id;
            axios.post(url, {
                movie: data
            }).then(function (response) {
                context.commit('editMovie', response.data)
            })
                .catch(function (error) {
                    console.log(error);
                });
        },
        markMovieFromApi(context, data) {
            let url = 'http://localhost:3000/api/movies/mark/' + data.id;
            axios.post(url, {
                movie: data
            }).then(function (response) {
                context.commit('markMovie', response.data)
            })
                .catch(function (error) {
                    console.log(error);
                });
        },
        posterMovieFromApi(context, data) {
            console.log(data.poster);
            let url = 'http://localhost:3000/api/movies/poster/' + data.id;
            const fd = new FormData();
            fd.append('poster', data.poster);
            axios.post(url,
                fd,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function (response) {
                context.commit('posterMovie', response.data)
            })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addMovieToStore(context, data) {
            let url = 'http://localhost:3000/api/movies';
            axios.post(url, {
                movie: data
            }).then(function (response) {
                context.commit('addMovie', response.data)
            })
                .catch(function (error) {
                    console.log(error);
                });
        },
        removeMovieFromApi(context, data) {
            let url = 'http://localhost:3000/api/movies/remove/' + data.id;
            axios.post(url, {
                movie: data
            }).then(function (response) {
                context.commit('removeMovie', response.data)
            })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mutations: {
        setMovies(state, param1) {
            state.movies = param1;
        },
        addMovie(state, param) {
            state.movies.push(param);
        },
        updateMovies(state, param) {
            state.movies = param;
        },
        editMovie(state, param) {
            state.movies = param;
        },
        markMovie(state, param) {
            state.movies = param;
        },
        posterMovie(state, param) {
            state.movies = param;
        },
        removeMovie(state, param1) {
            state.movies.splice(param1, 1);
        }
    }
})
