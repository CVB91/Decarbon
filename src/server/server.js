const express = require('express')
const connection = require('./db')
const bodyParser = require('body-parser')
const app = express()
const haversineDistance = require('./haversine')
const carbonEstimate = require('./carbonEstimate')

const database = require('./db')

//body parser setup

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/v1/location', (req, res) => {
  const { query } = req.query
  const sql = `SELECT airport FROM decarbonise.airports WHERE airport LIKE '${query}%' LIMIT 5`
  connection.query(sql, (error, results) => {
    if (error) throw error
    res.send(results)
  })
})

app.post('/api/v1/estimates', (req, res) => {
  let airports = req.body
  console.log('airports', airports)
  const coordsSql = `SELECT airport, longitude, latitude FROM decarbonise.airports WHERE airport LIKE '${airports.departure}' OR airport LIKE '${airports.destination}'`
  connection.query(coordsSql, (error, results) => {
    if (error) throw error
    console.log('these are the results', results)
    const departureDetails = results[0]
    const destinationDetails = results[1]
    let totalDistance
    console.log('departure, destination', departureDetails, destinationDetails)
    totalDistance = haversineDistance(
      departureDetails,
      destinationDetails,
      false
    )
    let resultsArray = []
    resultsArray.push(totalDistance)
    console.log('this is total distance', resultsArray)

    let carbonEstimation = carbonEstimate(resultsArray, 1, false, true)

    console.log('Carbon Estimate:', carbonEstimation)

    const estimateDetails = {
      distance: totalDistance,
      carbonEstimate: carbonEstimation,
    }

    res.send(estimateDetails)
  })
})

app.listen(5000, () => {
  console.log('Server listening on port 5000!')
})
