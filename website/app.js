/* Global Variables */
/*Note: #For temperature in Fahrenheit use units=imperial >> °F
        #For temperature in Celsius use units=metric >>  ℃
        #Temperature in Kelvin is used by default, no need to use units parameter in API call*/
let apiKey = '&appid=00dfa3225b892e61a6694e1de89ef884&units=metric';
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
//test>> api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}

//Get the date
// let d = new Date();
// let newDate = d.getDate() + ' / ' + d.getMonth() + ' / ' + d.getFullYear();

var d=new Date()
var year=d.getYear()
if(year<1000)
  year+=1900
  var day=d.getDay()
  var month=d.getMonth()
  var daym=d.getDate()
if(daym<10)
  daym="0"+daym
  var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
  var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December")
let newDate = dayarray[day] + ' , ' + montharray[month] + ' , '  + daym + ' , '+ year;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
//  Blocking default click handling
  e.preventDefault();
  // get user zipcode & feelings
  const newZip = document.getElementById('zip').value;
  const newFeeling = document.getElementById('feelings').value;

  getWeatherdata(baseURL, newZip, apiKey)
    .then(function (data) {
      // add data to POST request
      postData('/addWeatherdata', { date: newDate, temp: data.main.temp, newFeeling})
    }).then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    })
}

// TODO-Async GET
const getWeatherdata = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
     body: JSON.stringify(data),
  })

  try {
    const newData = await req.json();
    // console.log(newData);
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    // Transform into JSON
    const allData = await request.json()
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('temp').innerHTML = `<p>${allData.temp} ℃</p>`;
  }
  catch (error) {
    console.log("error", error);
  }
};
// temperature
//date
//user response
