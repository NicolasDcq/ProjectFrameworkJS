<template>
    <div v-if="movie_to_add">
        <div class="col s12 m12">
            <h1>Ajouter un nouveau film</h1>

            <div class="col s12 m12">
                <p class="intitulé">Film</p>
                <div class="field col m6">
                    <label>Titre :</label><br/>
                    <input type="text" v-model="movie_to_add.title"/>
                </div>
                <div class="field col m6">
                    <label>Année de sortie :</label><br/>
                    <input type="text" v-model="movie_to_add.year"/>
                </div>
                <div class="field col m6">
                    <label>Synopsys :</label><br/>
                    <textarea v-model="movie_to_add.synopsys"></textarea>
                </div>
                <div class="field col m6">
                    <label>Langue :</label><br/>
                    <input type="text" v-model="movie_to_add.language"/>
                </div>
                <div class="field col m6">
                    <label>Type :</label><br/>
                    <input type="text" v-model="movie_to_add.type"/><br>
                </div>
            </div>
            <div class="col s12 m12">
                <p class="intitulé">Réalisateur</p>
                <div class="field col m6">
                    <label>Nom :</label><br/>
                    <input type="text" v-model="movie_to_add.movie_director.name"/>
                </div>
                <div class="field col m6">
                    <label>Prénom :</label><br/>
                    <input type="text" v-model="movie_to_add.movie_director.firstname"/>
                </div>
                <div class="field col m6">
                    <label>Nationalité :</label><br/>
                    <input type="text" v-model="movie_to_add.movie_director.nationality"/>
                </div>
                <div class="field col m6">
                    <label>Date de naissance :</label><br/>
                    <input type="text" v-model="movie_to_add.movie_director.birth_date"/>
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
            return {
                movie_to_add: {
                    title: "",
                    year: "",
                    synopsys: "",
                    language: "",
                    type: "",
                    movie_director: {
                        name: "",
                        firstname: "",
                        nationality: "",
                        birth_date: "",
                    }
                },
                options_language: [
                    {text: 'Français', value: 'Français'},
                    {text: 'Anglais', value: 'Anglais'},
                    {text: 'Allemand', value: 'Allemand'}
                ]
            }
        },
        methods: {
            save: function () {
                /*this.$store.commit('addMovie', this.movie_to_add);*/
                this.movie_to_add.id = this.$store.state.movies.length + 1;
                this.$store.dispatch('addMovieToStore', this.movie_to_add);
                this.$router.push('/');
                document.location.reload(true);
            },
            back: function () {
                this.$router.push('/');
            },
        }
    }
</script>
