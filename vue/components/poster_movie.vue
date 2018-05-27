<template>
    <div v-else-if="movie_to_change_poster">

        <div class="col s12 m12">
            <h1>Changer le poster du film {{movie_to_change_poster.title}} </h1>

            <div class="file-field input-field  col m6">
                <div class="btn">
                    <span>Poster</span>
                    <input type="file" @change="onFileSelected"/>
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text">
                </div>
            </div>
                <div class="actions col m7">
                    <button v-on:click="save" class="btn">Enregistrer</button>
                    <button v-on:click="back" class="btn">Retour</button>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        data: function () {
            return {
                poster: null
            }
        },
        computed: {
            movie_to_change_poster: function () {
                return this.$store.state.movies.find(m => m.id == this.$route.params.id);
            }
        },
        mounted: function () {

        },
        methods: {
            onFileSelected: function (e) {
                this.movie_to_change_poster.poster = e.target.files[0];
            },
            save: function () {
                /*console.log( this.movie_to_change_poster.poster);*/
                this.$store.dispatch('posterMovieFromApi', this.movie_to_change_poster);
                this.$router.push('/');
                document.location.reload(true);
            },
            back: function () {
                this.$router.push('/');
            },
        }
    }
</script>
