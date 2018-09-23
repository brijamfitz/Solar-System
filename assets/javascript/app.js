// MAIN
// =============================================================================
$(document).ready(function() {

  // $('#classModal').modal('show')

// Function to split our plain text JSON data strings into individual values
function getProp(propName, properties) {
  var splits = properties.split(propName);
  return splits[1].split('|')[1].split('\n')[0];
}

// On click event for each planet
  $('.planet').on('click', function() {
    // Empty out sun card if it has already been clicked
    $('#sun-card').empty();
    // Retrieve unique planet name from id
    var planetName = $(this).attr('id');
    // Make planet name uppercase
    var planetUpper = planetName.charAt(0).toUpperCase() + planetName.substr(1);
    console.log(planetUpper);

    // Build our API url
    var queryURL =
      'https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v2/query?appid=4KQL5T-4RUJLAEV7L&input=planet%20' + planetName + '&output=json';
    // Ajax call to API
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      // This 'jsonifies' our data
      var json = JSON.parse(response);
      console.log(json);
      // Shortens code
      var pods = json.queryresult.pods;
      // For loop to iterate through the JSON
      // Uses our getProp function to retrive the specific data that we want
      // Console logging those values out
      for (let i = 0; i < pods.length; i++) {
        if (pods[i].title === 'Orbital properties') {
          var distanceFromSun = getProp('largest distance from orbit center', pods[i].subpods[0].plaintext);
          console.log('Distance from sun: ' + distanceFromSun);
          var daysInYear = getProp('orbital period', pods[i].subpods[0].plaintext);
          console.log('Days in a year: ' + daysInYear);
        } 
        else if (pods[i].title === 'Physical properties') {
          var hoursInDay = getProp('rotation period', pods[i].subpods[0].plaintext);
          console.log('Hours in a day: ' + hoursInDay);
          var radius = getProp('equatorial radius', pods[i].subpods[0].plaintext);
          console.log('Radius: ' + radius);
          var numMoons = getProp('number of moons', pods[i].subpods[0].plaintext);
          console.log('Number of moons: ' + numMoons);
          var mass = getProp('mass', pods[i].subpods[0].plaintext);
          console.log('Mass: ' + mass);
        }
        else if (pods[i].title === 'Atmosphere') {
          var avgTemp = getProp('average temperature', pods[i].subpods[0].plaintext);
          console.log('Average temp: ' + avgTemp);
          console.log('=====================');
          // Need to figure out how to parse and retrieve chemical makeup data
          // var chemicalMakeup = getProp('Major constituents', pods[i].subpods[1].plaintext)
          // console.log(chemicalMakeup);
        }
      }
      // Displaying our data to the html
      $('#planet-title').html(planetUpper);
      $('#planet-day-length').html('<span>Hours in a day: </span>' + hoursInDay);
      $('#planet-year-length').html('<span>Days in a year: </span>' + daysInYear);
      $('#planet-distance-from-sun').html('<span>Distance from sun: </span>' + distanceFromSun);
      $('#planet-mass').html('<span>Mass: </span>' + mass);
      $('#planet-temp').html('<span>Average temp: </span>' + avgTemp);
      $('#planet-radius').html('<span>Radius: </span>' + radius);
      $('#planet-moons').html('<span>Number of moons: </span>' + numMoons);
      $('#planet-chemicals').html();

      $('#close-button').on('click', function() {
        $('#planet-card').empty();
      })
    });
  })

  // Click event for Sun because the JSON is different than the planets
  $('#sun').on('click', function() {
    // Empty out the planet card if it has already been clicked
    $('#planet-card').empty();
    // Retrieve sun name from id
    var sunName = $(this).attr('id');
    // Make uppercase
    var sunUpper = sunName.charAt(0).toUpperCase() + sunName.substr(1);
    console.log(sunUpper);
    // Redefine our function within the click event
    function getProp(propName, properties) {
      var splits = properties.split(propName);
      return splits[1].split('|')[1].split('\n')[0];
    }
    // Build our API url
    var sunURL = 'https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v2/query?appid=4KQL5T-4RUJLAEV7L&input=sun&output=json';
    // Ajax call to API
    $.ajax({
      url: sunURL,
      method: 'GET'
    }).then(function(sunResponse) {
      var sunJson = JSON.parse(sunResponse);
      console.log(sunJson)
    // Shortern code
    var sunPods = sunJson.queryresult.pods;
    // Parse through JSON and retrieve the data we want
    if (sunPods[5].title === 'Star properties') {   
      var distanceFromEarth = getProp('distance from Earth', sunPods[5].subpods[0].plaintext);
      console.log('Distance from Earth: ' + distanceFromEarth);
      var sunTemp = getProp('effective temperature', sunPods[5].subpods[0].plaintext);
      console.log('Temperature: ' + sunTemp);
      var sunAge = getProp('age', sunPods[5].subpods[0].plaintext);
      console.log('Age: ' + sunAge);
      var sunLifeSpan = getProp('main sequence lifetime', sunPods[5].subpods[0].plaintext);
      console.log('Lifespan: ' + sunLifeSpan);
      console.log('=====================');
      }
      // Displaying our data to the html
      $('#sun-title').html(sunUpper);
      $('#sun-distance-from-earth').html('<span>Distance from Earth: </span>' + distanceFromEarth)
      $('#sun-temp').html('<span>Temperature: </span>' + sunTemp)
      $('#sun-age').html('<span>Age: </span>' + sunAge);
      $('#sun-lifespan').html('<span>Lifespan: </span>' + sunLifeSpan);
    })
  })
});

// NASA API call and click event to display picture of the day
$('#picture-of-day').on('click', function() {
  $('#pic-container').empty();
  $('#pic-caption').empty();
  // URL
  var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=EHDG4w54znEf6k6YKpqUXmOhhC8zrmmbYmS4DPRj"
  // Ajax call to API
  $.ajax({
    url: nasaURL,
    method: 'GET'
  }).then(function(picResponse) {
    // Log JSON
    console.log(picResponse);
    // Parse to retrieve img url
    var picOfDay = picResponse.hdurl;
    console.log(picOfDay);
    // Parse to retrieve img caption
    var picCaption = picResponse.explanation;
    console.log(picCaption);
    // Display to html
    var img = $('<img>');
    img.attr('src', picOfDay);
    img.attr('id', 'pic-of-day');
    $('#pic-container').append(img);
    $('#pic-caption').append(picCaption);
  })
})

// FIREBASE
// =============================================================================
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDoUefwJL784SDdsj3BKMtHVxGny-zBwio',
  authDomain: 'brijamfitz-project.firebaseapp.com',
  databaseURL: 'https://brijamfitz-project.firebaseio.com',
  projectId: 'brijamfitz-project',
  storageBucket: 'brijamfitz-project.appspot.com',
  messagingSenderId: '840179599817'
};
firebase.initializeApp(config);
// Variable to access Firebase database
var database = firebase.database();

// Click event to retrieve and set data to Firebase
$('#visitor').on('click', function() {
  // Retrieve user inputs
  var userName = $('#name-input').val().trim();
  var userAge =  $('#age-input').val().trim();
  // Create object to store user input values
  var userData = {
    name: userName,
    age: userAge
  }
  // Push to Firebase database
  database.ref().push(userData);
  // Testing
  console.log(userName);
  console.log(userAge);
  // Empty input fields after user submits
  $('input').val('');
})
// Firebase watcher and initial loader
database.ref().on('child_added', function(snapshot) {
  // Console log everything on Firebase
  console.log(snapshot.val());
  console.log(snapshot.val().age);
  // Update the HTML with our stored data
  var newRow = $('<tr>');
  newRow.append('<td>' + snapshot.val().name + '</td>');
  // Earth age
  newRow.append('<td>' + snapshot.val().age + '</td>');
  // Mercury
  var mercuryAge = snapshot.val().age * 365 / 88;
  newRow.append('<td>' + Math.round(mercuryAge) + '</td>');
  // Venus
  var venusAge = snapshot.val().age * 365 / 225;
  newRow.append('<td>' + Math.round(venusAge) + '</td>');
  // Mars
  var marsAge = snapshot.val().age * 365 / 687;
  newRow.append('<td>' + Math.round(marsAge) + '</td>');
  // Jupiter
  var jupiterAge = snapshot.val().age * 365 / 4307;
  newRow.append('<td>' + jupiterAge.toFixed(2) + '</td>');
  // Saturn
  var saturnAge = snapshot.val().age * 365 / 10731;
  newRow.append('<td>' + saturnAge.toFixed(2) + '</td>');
  // Uranus
  var uranusAge = snapshot.val().age * 365 / 30660;
  newRow.append('<td>' + uranusAge.toFixed(2) + '</td>');
  // Neptune
  var neptuneAge = snapshot.val().age * 365 / 59860;
  newRow.append('<td>' + neptuneAge.toFixed(2) + '</td>');
  // Pluto
  var plutoAge = snapshot.val().age * 365 / 90520;
  newRow.append('<td>' + plutoAge.toFixed(2) + '</td>');
  $('tbody').append(newRow);
})

// Need to create click event for Pluto

// Need to calculate Days in a Year from 'a' unit to days

// Need to change hours in a day for Mercury and Venus

// Need to convert mass from kg to lbs

// Remove (sidereal) from Hours in Day

// Need to display data using chart.js library
