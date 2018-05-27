<template>
    <div v-else-if="movie_to_mark">

        <div class="col s12 m12">
            <h1>Noter le film {{movie_to_mark.title}} </h1>

            <div class="col s12 m12">
                <div class="field col m6">
                    <label>Note :</label><br/>
                    <input type="number" min="1" max="5" v-model="movie_to_mark.mark"/>
                </div>
            </div>
            <div class="actions">
                <button v-on:click="save" class="btn">Noter</button>
                <button v-on:click="back" class="btn">Retour</button>
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
            movie_to_mark: function () {
                return this.$store.state.movies.find(m => m.id == this.$route.params.id);
            }
        },
        mounted: function () {

        },
        methods: {
            save: function () {
                this.$store.dispatch('markMovieFromApi', this.movie_to_mark);
                this.$router.push('/');
                document.location.reload(true);
            },
            back: function () {
                this.$router.push('/');
            },
        }
    }
</script>
