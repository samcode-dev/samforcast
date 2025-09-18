const port = process.env.PORT || 3000
const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Babadiya Samuel'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Babadiya Samuel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Type in any location in the search bar.',
        title: 'Help',
        name: 'Babadiya Samuel'
    })
})


app.get('/weather', (req, res) => {
    try {
        if (!req.query.address) {
            res.send({
                error: 'you must provide a search'
            })
        }else {
                const locaname = req.query.address
                // console.log(locaname)
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${locaname}&APPID=f9fb7fd69d0956edbb240180abdc359b`
                request({url: url, json: true}, (error, response) => {
                    res.send({
                        forecast: response.body.weather[0].description,
                        location: response.body.name,
                        address: req.query.address
                    })
                    // console.log(response.body)
                })
    
            
        }
    }
    catch(error) {
        res.send(error)
    }
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})