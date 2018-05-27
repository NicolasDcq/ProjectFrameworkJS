<template>
    <!--<div class="movie-item" >
        <img class="poster" :src="movie.poster_url" alt=""><br />
        <div > &lt;!&ndash;@click="display_details=!display_details"&ndash;&gt;
            <b @click="details" >{{movie.title}} ({{movie.year}})</b><br />
           &lt;!&ndash; <span v-if="display_details">
            {{movie.synopsys}}<br />
            <b> Langue : {{movie.language}} <br></b>
            <b> Genre : {{movie.type}} <br></b>
               </span>&ndash;&gt;
            <button @click="edit">Edit</button>
            <button @click="remove">Remove</button>
            <br /><br />
        </div>
    </div>-->
    <div class="col s12 m3">
        <div class="card">
            <div class="card-image">
                <div class="mark">{{movie.mark}}/5</div>
                <img class="poster" :src="movie.poster_url">
                <button class="btn more_info" @click="details">En savoir plus ></button>
            </div>
            <div class="card-content">
                <span class="card-title"><b>{{movie.title}}</b> ({{movie.year}})</span>
                <p class="description">{{movie.synopsys}}</p>
            </div>
            <div class="card-action">
                <button @click="remove" class="btn"><i class="material-icons ">delete</i></button>
                <button @click="edit" class="btn"><i class="material-icons ">edit</i></button>
                <button @click="mark" class="btn"><i class="material-icons ">star_half</i></button>
                <button @click="poster" class="btn"><i class="material-icons ">filter</i></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["movie"],
        data: function () {
            return {
                display_details: false,
            }
        },
        methods: {
            edit() {
                this.$emit('edit', this.movie)
            },
            details() {
                this.$emit('details', this.movie)
            },
            mark() {
                this.$emit('mark', this.movie)
            },
            poster() {
                this.$emit('poster', this.movie)
            },
            remove() {
                this.$emit('remove', this.movie)
            }
        },

    };


</script>

