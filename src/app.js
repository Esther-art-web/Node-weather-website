const path = require("path");
const express = require('express');
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();


const publicDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../views/views");
const partialsPath = path.join(__dirname, "../views/partials");

app.set("view engine", "hbs");
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// To serve up static pages from the public folder 
// up to the browser

app.use(express.static(publicDir));



// root directory
// app.get("", (req, res) => {
//     res.send("<h1>Weather</h1>");
// }); 

// app.get("/help",(req, res) =>{
//     res.send({ 
//         name: "Andrew",
//         age: 27
//     });
// });
// app.get('/about', (req, res) => {
//     res.send("<h2> About </h2>");
// })
app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Andrew Mead"
    })
})
app.get("/about", (req, res) => {
    res.render('about',{
        title: "About Me",
        name: "Esther Ibeh"
    }); 
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "This is the help page",
        name: "Andrew Mead"
    })
})
app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You need to provide an address'
        })
    }
   
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (e, forecast) => {
            res.send({
                location,
                forecast
            });
        })
    })
   
})
app.get('/products',(req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})
app.get("/help/*", (req, res) => {
    res.render('errorPage', {
        title: "Help Error Page",
        name: "Esther Ibeh",
        message: "Help article not found"
    })
})
app.get('*', (req, res) => {
    res.render('errorPage', {
        title: "404 Error Page",
        name: "Esther Ibeh",
        message: "Page not found"
    })
})


app.listen(3000, () => {
    console.log("Server is up on port 3000");
} )