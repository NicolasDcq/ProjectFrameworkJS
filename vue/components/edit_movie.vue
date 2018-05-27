<template>
    <div v-else-if="movie_to_edit">


        <div class="col s12 m12">
            <h1>Edition du film {{movie_to_edit.title}} </h1>

            <div class="col s12 m12">
                <p class="intitulé">Film</p>
                <div class="field col m6">
                    <label>Titre :</label><br/>
                    <input type="text" v-model="movie_to_edit.title"/>
                </div>
                <div class="field col m6">
                    <label>Année de sortie :</label><br/>
                    <input type="text" v-model="movie_to_edit.year"/>
                </div>
                <div class="field col m6">
                    <label>Synopsys :</label><br/>
                    <textarea v-model="movie_to_edit.synopsys"></textarea>
                </div>
                <div class="field col m6">
                    <label>Langue :</label><br/>
                    <input type="text" v-model="movie_to_edit.language"/>
                </div>

                <div class="field col m6">
                    <label>Type :</label>
                    <select v-model="movie_to_edit.type">
                        <option  disabled selected>Choisir un type</option>
                        <option>Horreur</option>
                        <option>Action</option>
                        <option>Science Fiction</option>
                        <option>Comédie</option>
                        <option>Documentaire</option>
                        <option>Historique</option>
                        <option>Love story</option>
                        <option>Drame</option>
                    </select>

                </div>
            </div>
            <div class="col s12 m12">
                <p class="intitulé">Réalisateur</p>
                <div class="field col m6">
                    <label>Nom :</label><br/>
                    <input type="text" v-model="movie_to_edit.movie_director.name"/>
                </div>
                <div class="field col m6">
                    <label>Prénom :</label><br/>
                    <input type="text" v-model="movie_to_edit.movie_director.firstname"/>
                </div>
                <div class="field col m6">
                    <label>Nationalité :</label><br/>
                    <input type="text" v-model="movie_to_edit.movie_director.nationality"/>
                </div>
                <div class="field col m6">
                    <label>Date de naissance :</label><br/>
                    <input type="text" v-model="movie_to_edit.movie_director.birth_date"/>
                </div>
            </div>
            <div class="actions">
                <button v-on:click="save" class="btn">Enregistrer</button>
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
            movie_to_edit: function () {
                return this.$store.state.movies.find(m => m.id == this.$route.params.id);
            }
        },
        mounted: function () {

        },
        methods: {
            save: function () {
                this.$store.dispatch('editMovieFromApi', this.movie_to_edit);
                this.$router.push('/');
                document.location.reload(true);
            },
            back: function () {
                this.$router.push('/');
            },
        }
    }
</script>
