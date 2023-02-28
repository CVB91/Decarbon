
//HAVERSINE FORMULA 

function haversineDistance(departureDetails, destinationDetails, isMiles) {
  function toRad(x) {
    return (x * Math.PI) / 180
  }

  var lon1 = departureDetails.longitude
  var lat1 = departureDetails.latitude

  var lon2 = destinationDetails.longitude
  var lat2 = destinationDetails.latitude

  console.log('inside haversine', lon1, lat1, lon2, lat2 )

  var R = 6371 // km

  var x1 = lat2 - lat1
  var dLat = toRad(x1)
  var x2 = lon2 - lon1
  var dLon = toRad(x2)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c

  if (isMiles) d /= 1.60934

  // let distanceArray = [];

  // distanceArray.push(d)
  console.log('results d', d)
  
  return d
 
  
}

module.exports = haversineDistance