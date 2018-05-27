<template>
    <div>
        <h1 v-if="display" class="title">{{ message }}</h1> <br>
        <!-- <p>First letter : {{firstletter}}</p>
        <p><input type="text" v-model="message" /></p> -->
        <!-- <hr>
        <p>Movie number : {{movies.length}}</p>
        <p>New movie<br />
            Title : <input type="text" v-model="movie_to_add.title" /><br />
            Year : <input type="text" v-model="movie_to_add.year" /><br />
            Synopsys : <textarea v-model="movie_to_add.synopsys"></textarea><br />
            <button v-on:click="newmovie2">Add</button></p>-->

        <div class=" input-field search">
            <input id="icon_prefix2" placeholder="Rechercher" v-model="search"/>
        </div>

        <div class="tools">
            <button v-on:click="newmovie" class=" btn"><i class="material-icons left">add_circle_outline</i> Nouveau</button>
        </div>



        <hr>
        <ul>
            <movie-item v-for="(movie, index) in movies_search" v-bind:key="movie.title" v-bind:movie="movie"
                        v-on:details="details" v-on:edit="edit" v-on:mark="mark" v-on:poster="poster" v-on:remove="remove(index)"></movie-item>
        </ul>


        <!--<p v-if="movie_to_edit">New movie<br />
            Title : <input type="text" v-model="movie_to_edit.title" /><br />
            Year : <input type="text" v-model="movie_to_edit.year" /><br />
            Synopsys : <textarea v-model="movie_to_edit.synopsys"></textarea><br />
            <button v-on:click="save">Save</button></p>-->
    </div>
</template>

<script>

    export default {
        data() {
            return {
                message: 'Liste des films',
                display: true,
                movie_to_add: {},
                search: "",
            }
        },
        methods: {
            newmovie: function () {
                var link = '/movies/add/';
                this.$router.push({path: link});
            },
            save: function () {
                this.movies.push({title: "New movie"})
                this.$router.push('/');
            },
            edit: function (movie) {
                this.movie_to_edit = movie;
                var link = 'movie/' + this.movie_to_edit.id + '/edit';
                this.$router.push({path: link});

            },
            mark: function (movie) {
                this.movie_to_mark = movie;
                var link = 'movie/' + this.movie_to_mark.id + '/mark';
                this.$router.push({path: link});

            },
            poster: function (movie) {
                this.movie_to_change_poster = movie;
                var link = 'movie/' + this.movie_to_change_poster.id + '/poster';
                this.$router.push({path: link});

            },
            details: function (movie) {
                this.movie_to_details = movie;
                var link = 'movie/' + this.movie_to_details.id;
                this.$router.push({path: link});

            },
            remove: function (movie) {
                this.movie_to_delete = movie;
                this.$store.dispatch('removeMovieFromApi', this.movie_to_delete);
                this.$router.push('/');
                document.location.reload(true);


                /* this.$store.commit('removeMovie', this.movie_to_delete);
                 this.$router.push('/');*/
            },

            created: function () {
                console.log("Created");
            }

        },
        computed: {
            firstletter: function () {
                return this.message[0]
            },
            movies_search: function () {
                return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1);
            },
            movies: function () {
                return this.$store.state.movies;
            }

        },
        mounted: function () {
            this.$store.dispatch('getMoviesFromApi');
        },

    }

</script>

<style>
    #msg {
        2 color: red;
    }

    #menu {
        background: aqua;
        height: 50px;
    }

    .title {
        text-align: center;
    }
</style>
