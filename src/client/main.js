import axios from 'axios'

// Get the departure field
let departure = document.querySelector('#departure')
let destination = document.querySelector('#destination')

//get modal elements

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const openModalBtn = document.querySelector('.btn-open')
const closeModalBtn = document.querySelector('.btn-close')

//modal functions

const openModal = function () {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
  loadTableData(tableData)
}

const closeModal = function () {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
  clearModalData()
}

// returned Estimate

let returnedEstimate = []

// modal eventlisteners

openModalBtn.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

// modal eventlistener esc key press
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
})

function renderDeparture(data) {
  // Create the datalist element
  let datalist = document.createElement('datalist')
  datalist.id = 'airport-data'
  departure.setAttribute('list', datalist.id)

  // Create fragment for option elements
  let fragment = document.createDocumentFragment()

  // Create list options
  for (let departure of data) {
    let option = document.createElement('option')
    option.textContent = departure.airport
    fragment.append(option)
  }

  // Add options to datalist
  datalist.append(fragment)

  // Inject into the DOM
  departure.after(datalist)
}

function renderDestination(data) {
  // Create the datalist element
  let datalist = document.createElement('datalist')
  datalist.id = 'airport-data'
  destination.setAttribute('list', datalist.id)

  // Create fragment for option elements
  let fragment = document.createDocumentFragment()

  // Create list options
  for (let destination of data) {
    let option = document.createElement('option')
    option.textContent = destination.airport
    fragment.append(option)
  }

  // Add options to datalist
  datalist.append(fragment)

  // Inject into the DOM
  departure.after(datalist)
}

//setup fecth request
let url = new URL('http://localhost:5000/api/v1/location')

let params = { departure: departure.value }

url.search = new URLSearchParams(params).toString()

//Fetch the data and render the datalist element

departure.addEventListener('input', () => {
  console.log(departure.value)
  axios
    .get('/api/v1/location', {
      params: { query: departure.value },
    })
    .then((response) => {
      console.log(response.data)
      renderDeparture(response.data)
    })
})

destination.addEventListener('input', () => {
  console.log(destination.value)
  axios
    .get('/api/v1/location', {
      params: { query: destination.value },
    })
    .then((response) => {
      console.log(response.data)
      renderDestination(response.data)
    })
})

// button

const button = document.querySelector('#btn')

button.addEventListener('click', () => {
  const airports = []

  airports.push(departure.value)
  airports.push(destination.value)
  console.log(airports)
  let bodyData = {
    passengers: 1,
    departure: airports[0],
    destination: airports[1],
  }
  axios.post('/api/v1/estimates', bodyData).then((response) => {
    console.log(response.data)
   
    let distance = document.querySelector('.distance')
    let estimate = document.querySelector('.carbonEstimate')
    distance.innerText =
      'Total Distance: ' + Math.round((+response.data.distance + Number.EPSILON) * 100) / 100

    estimate.innerText =
      'Carbon Estimate ' +
    Math.round((+response.data.carbonEstimate + Number.EPSILON) * 100) / 100
    
    let estimateNumber = document.createElement('h1')
    estimateNumber.classList.add('estimateNumber')
    
    
    estimate.after(estimateNumber)
    estimateNumber.innerText = Math.round((+response.data.carbonEstimate + Number.EPSILON) * 100) / 100

    console.log(estimateNumber)
   
    
  })
})

//animated blobs
function handleMouseover(e) {
  document.querySelector('.active').classList.remove('active')
  e.target.closest('.card').classList.add('active')
}

document
  .querySelectorAll('.card')
  .forEach((card) => card.addEventListener('mouseover', handleMouseover))

// table

let sortDirection = false
let tableData = [
  {
    category: 'Beef',
    value: 99.48,
    calculated: 99.48 / 5,
  },
  {
    category: 'Average Global Citizen 1850',
    value: 165,
    calculated: 165 / 5,
  },
  {
    category: 'Average Global Citizen 1950',
    value: 2520,
    calculated: 2520 / 5,
  },
  {
    category: 'Average Global Citizen 2019',
    value: 4701,
    calculated: 4701 / 5,
  },
  {
    category: 'Coffee',
    value: 0.4,
    calculated: 0.4 / 5,
  },
  {
    category: 'Milk',
    value: 0.8,
    calculated: 0.8 / 5,
  },
  {
    category: 'Bitcoin',
    value: 401,
    calculated: 401 / 5,
  },
  {
    category: 'Tredmill',
    value: 1,
    calculated: 1 / 5,
  },
  {
    category: 'Visa',
    value: 0.04,
    calculated: 0.04 / 5,
  },
  {
    category: 'Washing Machine',
    value: 2.4,
    calculated: 2.4 / 5,
  },
]


function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

  function loadTableData(tableData) {
  
    waitForElm('.estimateNumber').then((elm) => {
      let estimateNumber = document.querySelector('.estimateNumber')
      let calculatedText = estimateNumber.textContent
      let calculated = Number(calculatedText)
     const tableBody = document.getElementById('tableData')
  let dataHTML = ''
  for (let data of tableData) {
    dataHTML += `<tr><td>${data.category}</td><td>${data.value}</td><td>${(calculated / data.value).toFixed(2)} </td></tr>`
  }

  console.log({returnedEstimate})
     tableBody.innerHTML = dataHTML
   })
     
}

function clearModalData() {
  let distance = document.querySelector('distance')
  let estimate = document.querySelector('estimate')
  distance.innerText = ''
  estimate.innerText = ''
}
