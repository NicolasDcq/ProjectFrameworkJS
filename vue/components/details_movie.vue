<template>
    <div>
        <div class="col s12 m12">
            <h2 class="header"><b>{{movie.title}}</b> ({{movie.year}})</h2>
            <div class="card horizontal">
                <div class="card-image">
                    <img style="height: 35vw;" :src="movie.poster_url" alt="">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <div class="card-item">
                            <b>Résumé: </b><br>
                            <p>{{movie.synopsys}}</p>
                        </div>
                        <div class="card-item">
                            <p><b>Langue :</b> {{movie.language}} <br></p>
                        </div>
                        <div class="card-item">
                            <p><b>Genre :</b> {{movie.type}} <br></p>
                        </div>

                        <div>
                            <div class="card-item">
                                <p><b>Réaliser par :</b> {{movie.movie_director.firstname}}
                                    {{movie.movie_director.name}} <br></p>
                            </div>
                            <div class="card-item">
                                <p><b>Nationalité :</b> {{movie.movie_director.nationality}} <br></p>
                            </div>
                            <div class="card-item">
                                <p><b>Né le :</b> {{movie.movie_director.birth_date}} <br></p>
                            </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <div class="ft-right">
                        <button class="btn-floating btn-large waves-effect waves-light " @click="edit"><i
                                class="material-icons">edit</i></button>
                        <button class="btn-floating btn-large waves-effect waves-light " @click="remove"><i
                                class="material-icons">delete</i></button>
                        <button class="btn-floating btn-large waves-effect waves-light " @click="mark"><i
                                class="material-icons">star_half</i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: function () {
            return {}
        },
        computed: {
            movie: function () {
                return this.$store.state.movies.find(m => m.id == this.$route.params.id);
            }
        },
        methods: {
            edit() {
                var link = this.movie.id + '/edit';
                this.$router.push({path: link});
            },
            remove() {
                this.movie_to_delete = this.movie;
                this.$store.dispatch('removeMovieFromApi', this.movie_to_delete);
                this.$router.push('/');
                document.location.reload(true);
            },
            mark() {
                var link = this.movie.id + '/mark';
                this.$router.push({path: link});
            },
        },
    }

</script>
