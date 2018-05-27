const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const multer  = require('multer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/node', express.static('node_modules'));

app.locals.movies = [
    {
        id: 1,
        title: "L'étrange noël de M. Jack",
        year: 1994,
        language: "Français",
        movie_director:
            {
                name: "Selick",
                firstname: "Henry",
                nationality: "Américain",
                birth_date: "30/11/1952",
            }
        ,
        type: "Horreur",
        poster: {},
        poster_url: "static/posters/etrange_noel_mr_jack.jpg",
        mark: "",
        synopsys: "Jack Skellington, un épouvantail squelettique surnommé « le Roi des citrouilles » (Pumpkin King en version originale), vit dans la ville d'Halloween. En tant que maître de l'épouvante, Jack occupe ses journées à préparer la prochaine fête d'Halloween."
    },
    {
        id: 2,
        title: "Interstellar",
        year: 2014,
        language: "Français",
        movie_director:
            {
                name: "Nolan",
                firstname: "Christopher",
                nationality: "Américain",
                birth_date: "30/07/1970",
            }
        ,
        type: "Horreur",
        poster: {},
        poster_url: "static/posters/interstellar.jpg",
        mark: "",
        synopsys: "Alors que la Terre se meurt, une équipe d'astronautes franchit un trou de ver apparu près de Saturne conduisant à une autre galaxie, cela dans le but d'explorer un nouveau système stellaire et l'espoir de trouver une nouvelle planète habitable par l'humanité afin de la sauver."
    }
];

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../static/posters/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
});

var upload = multer({ storage: storage }).single('poster');

app.post('/api/movies/poster/:id/', function (request, res) {
    upload(request, res, function (err) {
        if (err) {
            // An error occurred when uploading
        }
        let id = parseInt(request.params.id);
        movie = request.app.locals.movies.find(m => m.id === id);
        let pathname = request.file.destination;
        pathname += request.file.filename;
        movie.poster_url = pathname;
    })
})




app.get('/', (request, response) => {
    fs.readFile('../index.html', (err, data) => {
        response.contentType('text/html').send(data)
    })
});

app.get('/api/movies/all', (request, response) => {
    response.send(request.app.locals.movies);
});

app.get('/api/movies/:id', (request, response) => {
    let index = request.app.locals.movies.findIndex(m => m.id == request.params.id);
    let movie = request.app.locals.movies[index];
    response.send({movie});
});

app.post('/api/movies/:id', (request, response) => {
    let newMovie = request.body.movie;
    let id = parseInt(request.params.id);
    movie = request.app.locals.movies.find(m => m.id === id);
    movie.title = newMovie.title;
    movie.year = newMovie.year;
    movie.language = newMovie.language;
    movie.type = newMovie.type;
    movie.synopsys = newMovie.synopsys;

});

app.post('/api/movies/mark/:id', (request, response) => {
    let newMovie = request.body.movie;
    let id = parseInt(request.params.id);
    movie = request.app.locals.movies.find(m => m.id === id);
    let new_mark = '';
    if (movie.mark != "") {
        new_mark = parseFloat(movie.mark) + parseFloat(newMovie.mark);
        new_mark = new_mark / 2;
    }
    else {
        movie.mark = 0;
        new_mark = parseFloat(movie.mark) + parseFloat(newMovie.mark);
    }

    movie.mark = new_mark.toFixed(1);


});

app.post('/api/movies', (request, response) => {
    let values = request.body.movie;
    let newMovie = {
        id: "",
        title: "",
        year: "",
        language: "",
        movie_director: {
            name: "",
            firstname: "",
            nationality: "",
            birth_date: "",
        },
        type: "",
        poster_url: "static/posters/default.jpg",
        mark: "",
        synopsys: ""
    };
    if (values.id == 2) {
        newMovie.id = values.id + 1;
    }
    else {
        newMovie.id = values.id;
    }
    newMovie.title = values.title;
    newMovie.year = values.year;
    newMovie.language = values.language;
    newMovie.type = values.type;
    newMovie.synopsys = values.synopsys;
    console.log(values);
    newMovie.movie_director.name = values.movie_director.name;
    newMovie.movie_director.firstname = values.movie_director.firstname;
    newMovie.movie_director.nationality = values.movie_director.nationality;
    newMovie.movie_director.birth_date = values.movie_director.birth_date;


    app.locals.movies.push(newMovie);
    response.send({newMovie});
});

app.post('/api/movies/remove/:id', (request, response) => {
    let id = parseInt(request.params.id);
    let index = request.body.movie;
    app.locals.movies.splice(index, 1);
});


app.listen(3000, () => console.log('Ready'))

