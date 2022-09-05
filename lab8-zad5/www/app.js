const express = require('express')
const path = require('path'); 
const app = express()
const port = 3000

var trips_list = [
    {
        id: 1,
        name: "Szczyt wszystkiego", 
        img_src: 'images/trips/szczyt.jpg', 
        img_alt: 'Zdjęcie szczytu', 
    }, 
    {
        id: 2,
        name: "Dalekie morza", 
        img_src: 'images/trips/morze.jpg', 
        img_alt: 'Zdjęcie morza', 
    }, 
    {   
        id: 3, 
        name: "Miasto", 
        img_src: 'images/trips/miasto.jpg', 
        img_alt: 'Zdjęcie miasta', 
    }
]

var trip_ids = {
    "1": trips_list[0],
    "2": trips_list[1], 
    "3": trips_list[2],  
}



app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static(path.join(__dirname, "/public"))); 


app.get('/', (req, res) => {
    res.render('main', {trips_list: trips_list});
}); 


app.get('/trip', (req, res) => {
    var id = req.query.trip_id;
    console.log(Object.keys(trip_ids))
    if (!(Object.keys(trip_ids).indexOf(id) >= 0))
    {
         (res.send('Nie ma takiej wycieczki id: ' + id + " " + t + " " + l));
    }

    res.render('trip', {trip_data: trip_ids[id]});
});

app.get('/book', (req, res) => {
    res.render('book');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(Object.keys(trip_ids))
  })