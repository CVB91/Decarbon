
//Carbon Formula

function carbonEstimate(distance, numberPassengers, isMiles, isLongDistance) {

  //CO2 emissions in grams per passenger per km travelled.

  let shortHaul = 115;
  let longHaul = 101;

  let calculatedDistance = distance[0] * numberPassengers;

  let carbonPerGram;
  if (!isLongDistance) {

    //getting the carbon value in grams

    let carbonPerKmShortHaul = calculatedDistance * shortHaul

    carbonPerGram = carbonPerKmShortHaul
  }

  if (isLongDistance) {
    let carbonPerKmLongHaul = calculatedDistance * longHaul
    
    carbonPerGram = carbonPerKmLongHaul
  }

return carbonPerGram.toString()

}

module.exports = carbonEstimate;