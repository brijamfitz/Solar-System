// MAIN
// =============================================================================
$(document).ready(function () {
  // Function to split our plain text JSON data strings into individual values
  function getProp(propName, properties) {
    var splits = properties.split(propName);
    return splits[1].split('|')[1].split('\n')[0];
  }
  var chart;
  // On click event for each planet
  $('.planet').on('click', function () {
    // Retrieve unique planet name from id
    var planetName = $(this).attr('id');
    // Make planet name uppercase
    var planetUpper = planetName.charAt(0).toUpperCase() + planetName.substr(1);

    // Build our API url
    var queryURL =
      'https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v2/query?appid=4KQL5T-4RUJLAEV7L&input=planet%20' + planetName + '&output=json';
    // Ajax call to API
    $.ajax({
      url: queryURL,
      beforeSend: function() {
        $('.loading-gif').html('<img src="assets/images/loading.gif" id="loading">');
      },
      success: function(response) {
      // Empty loading-gif div
      $('.loading-gif').empty();
      // This 'jsonifies' our data
      var json = JSON.parse(response);
      // Shortens code
      var pods = json.queryresult.pods;
      // For loop to iterate through the JSON
      // Uses our getProp function to retrive the specific data that we want
      // Console logging those values out
      for (let i = 0; i < pods.length; i++) {
        if (pods[i].title === 'Orbital properties') {
          var distanceFromSun = getProp('largest distance from orbit center', pods[i].subpods[0].plaintext);
          var daysInYear = getProp('orbital period', pods[i].subpods[0].plaintext);
        }
        else if (pods[i].title === 'Physical properties') {
          var hoursInDay = getProp('rotation period', pods[i].subpods[0].plaintext);
          var radius = getProp('equatorial radius', pods[i].subpods[0].plaintext);
          var numMoons = getProp('number of moons', pods[i].subpods[0].plaintext);
          var mass = getProp('mass', pods[i].subpods[0].plaintext);
        }
        else if (pods[i].title === 'Atmosphere') {
          var avgTemp = getProp('average temperature', pods[i].subpods[0].plaintext);
        }
      }
      // Displaying our data to the html
      $('#planet-title').html(planetUpper);
      $('#planet-day-length').html('<span>Rotation period: </span>' + hoursInDay);
      $('#planet-year-length').html('<span>Orbital period: </span>' + daysInYear);
      $('#planet-distance-from-sun').html('<span>Distance from sun: </span>' + distanceFromSun);
      $('#planet-mass').html('<span>Mass: </span>' + mass);
      $('#planet-temp').html('<span>Average temp: </span>' + avgTemp);
      $('#planet-radius').html('<span>Radius: </span>' + radius);
      $('#planet-moons').html('<span>Number of moons: </span>' + numMoons);

      function jupiter() {

        var elements = [];
        var percentage = [];
        var chemicalMakeup = pods[6].subpods[1].plaintext.split("\n");
        for (let i = 0; i < chemicalMakeup.length; i++) {
          var constituents = chemicalMakeup[i].split('|');
          elements.push(constituents[0]);
          percentage.push(constituents[1].slice(2, 4));
        }
        var ctx = document.getElementById('chart').getContext('2d');

        Chart.defaults.scale.ticks.beginAtZero = true;

        chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'pie',
          // The data for our dataset
          data: {
            labels: elements,
            datasets: [{
              label: "Planet Dataset",
              backgroundColor: ['yellow', 'red', 'blue', 'green', 'purple'],
              // borderColor: 'rgb(255, 99, 132)',
              data: percentage,
            }]
          },
          // Configuration options go here
          options: {
            title: {
              display: true,
              text: planetName.toUpperCase() + " Constituents",
            }
          }
        });
      }
      function somePlanets() {

        var ctx = document.getElementById('chart').getContext('2d');
        ctx.clearRect(0, 0, document.getElementById('chart').width, document.getElementById('chart').height);
        var elements = [];
        var percentage = [];
        var chemicalMakeup = pods[4].subpods[1].plaintext.split("\n");
        for (let i = 0; i < chemicalMakeup.length; i++) {
          var constituents = chemicalMakeup[i].split('|');
          elements.push(constituents[0]);
          percentage.push(constituents[1].replace(/%/gi, " ").slice(1, 3));
        }
        // var ctx = document.getElementById('chart').getContext('2d');

        Chart.defaults.scale.ticks.beginAtZero = true;

        chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'pie',

          // The data for our dataset
          data: {
            labels: elements,
            datasets: [{
              label: "Planet Dataset",
              backgroundColor: ['yellow', 'red', 'blue', 'green', 'purple'],
              // borderColor: 'rgb(255, 99, 132)',
              data: percentage,
            }]
          },

          // Configuration options go here
          options: {
            title: {
              display: true,
              text: planetName.toUpperCase() + " Constituents",
            }
          }
        });
        // window.chartToKill = chart;
      }
      function NepUranus() {

        var elements = [];
        var percentage = [];
        var chemicalMakeup = pods[5].subpods[1].plaintext.split("\n");
        for (let i = 0; i < chemicalMakeup.length; i++) {
          var constituents = chemicalMakeup[i].split('|');
          elements.push(constituents[0]);
          percentage.push(constituents[1].slice(1, 3));
        }
        var ctx = document.getElementById('chart').getContext('2d');

        Chart.defaults.scale.ticks.beginAtZero = true;

        chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'pie',
          // The data for our dataset
          data: {
            labels: elements,
            datasets: [{
              label: "Planet Dataset",
              backgroundColor: ['yellow', 'red', 'blue', 'green', 'purple'],
              // borderColor: 'rgb(255, 99, 132)',
              data: percentage,
            }]
          },
          // Configuration options go here
          options: {
            title: {
              display: true,
              text: planetName.toUpperCase() + " Constituents",
            }
          }
        });
      }
      if (planetName === "jupiter") {
        jupiter();
      } else if (planetName === "mercury" || planetName === "mars" || planetName === "earth" || planetName === "venus" || planetName === "saturn") {
        somePlanets();
      } else if (planetName === "neptune" || planetName === "uranus") {
        NepUranus();
      }
    }})
    // Clear out the planet divs before loading each new one
    // chartToKill.destroy()
    if (chart) {
      chart.destroy();
    }
    $('#planet-title').empty();
    $('#planet-day-length').empty();
    $('#planet-year-length').empty();
    $('#planet-distance-from-sun').empty();
    $('#planet-mass').empty();
    $('#planet-temp').empty();
    $('#planet-radius').empty();
    $('#planet-moons').empty();
    var ctx = document.getElementById('chart').getContext('2d');
    ctx.clearRect(0, 0, document.getElementById('chart').width, document.getElementById('chart').height);
  })
  // Click event for Sun because the JSON is different than the planets
  $('#sun').on('click', function () {
    // Retrieve sun name from id
    var sunName = $(this).attr('id');
    // Make uppercase
    var sunUpper = sunName.charAt(0).toUpperCase() + sunName.substr(1);
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
      beforeSend: function() {
        $('.loading-gif').html('<img src="assets/images/loading.gif" id="loading">');
      },
      success: function(sunResponse) {
      // Empty loading-gif div
      $('.loading-gif').empty();
      var sunJson = JSON.parse(sunResponse);
      // Shortern code
      var sunPods = sunJson.queryresult.pods;
      // Parse through JSON and retrieve the data we want
      if (sunPods[5].title === 'Star properties') {
        var distanceFromEarth = getProp('distance from Earth', sunPods[5].subpods[0].plaintext);
        var sunTemp = getProp('effective temperature', sunPods[5].subpods[0].plaintext);
        var sunAge = getProp('age', sunPods[5].subpods[0].plaintext);
        var sunLifeSpan = getProp('main sequence lifetime', sunPods[5].subpods[0].plaintext);

        var elements = [];
        var percentage = [];

        elements.push("hydrogen (H_2)", "helium (He)", "oxygen (0_2)");
        percentage.push("70", "28","1.5");

        var ctx = document.getElementById('sunChart').getContext('2d');

        Chart.defaults.scale.ticks.beginAtZero = true;

        chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'pie',
          // The data for our dataset
          data: {
            labels: elements,
            datasets: [{
              label: "Planet Dataset",
              backgroundColor: ['yellow', 'red', 'blue', 'green', 'purple'],
              // borderColor: 'rgb(255, 99, 132)',
              data: percentage,
            }]
          },
          // Configuration options go here
          options: {
            title: {
              display: true,
              text: sunName.toUpperCase() + " Constituents",
            }
          }
        });
      }
      // Displaying our data to the html
      $('#sun-title').html(sunUpper);
      $('#sun-distance-from-earth').html('<span>Distance from Earth: </span>' + distanceFromEarth)
      $('#sun-temp').html('<span>Temperature: </span>' + sunTemp)
      $('#sun-age').html('<span>Age: </span>' + sunAge);
      $('#sun-lifespan').html('<span>Lifespan: </span>' + sunLifeSpan);
    }})
    // Clear out the sun divs before loading again
    if (chart) {
      chart.destroy();
    }
    $('#sun-title').empty();
    $('#sun-distance-from-earth').empty();
    $('#sun-temp').empty();
    $('#sun-age').empty();
    $('#sun-lifespan').empty();
  })

  $('#pluto').on('click', function () {
    // Retrieve Pluto name from id
    var plutoName = $(this).attr('id');
    // Make uppercase
    var plutoUpper = plutoName.charAt(0).toUpperCase() + plutoName.substr(1);
    // Redefine our function within the click event
    function getProp(propName, properties) {
      var splits = properties.split(propName);
      return splits[1].split('|')[1].split('\n')[0];
    }
    // Build our API url
    var plutoURL = 'https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v2/query?appid=4KQL5T-4RUJLAEV7L&input=planet%20pluto&output=json';
    // Ajax call to API
    $.ajax({
      url: plutoURL,
      beforeSend: function() {
        $('.loading-gif').html('<img src="assets/images/loading.gif" id="loading">');
      },
      success: function(plutoResponse) {
      // Empty loading-gif div
      $('.loading-gif').empty();
      var plutoJson = JSON.parse(plutoResponse);
      // Shortern code
      var plutoPods = plutoJson.queryresult.pods;
      // Parse through JSON and retrieve the data we want
      for (let i = 0; i < plutoPods.length; i++) {
        if (plutoPods[i].title === 'Orbital properties') {
          var distanceFromSun = getProp('largest distance from orbit center', plutoPods[i].subpods[0].plaintext);
          var daysInYear = getProp('orbital period', plutoPods[i].subpods[0].plaintext);
        }
        else if (plutoPods[i].title === 'Physical properties') {
          var hoursInDay = getProp('rotation period', plutoPods[i].subpods[0].plaintext);
          var radius = getProp('average radius', plutoPods[i].subpods[0].plaintext);
          var numMoons = getProp('number of moons', plutoPods[i].subpods[0].plaintext);
          var mass = getProp('mass', plutoPods[i].subpods[0].plaintext);
        }
        else if (plutoPods[i].title === 'Atmosphere') {
          var avgTemp = getProp('average temperature', plutoPods[i].subpods[0].plaintext);
        }
      }
      var elements = [];
      var percentage = [];

      elements.push("nitrogen (N_2)", "carbon monoxide (CO)");
      percentage.push("98", "2");

      var ctx = document.getElementById('plutoChart').getContext('2d');

      Chart.defaults.scale.ticks.beginAtZero = true;

      chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',
        // The data for our dataset
        data: {
          labels: elements,
          datasets: [{
            label: "Planet Dataset",
            backgroundColor: ['yellow', 'red', 'blue', 'green', 'purple'],
            // borderColor: 'rgb(255, 99, 132)',
            data: percentage,
          }]
        },
        // Configuration options go here
        options: {
          title: {
            display: true,
            text: plutoName.toUpperCase() + " Constituents",
          }
        }
      });
      // Displaying our data to the html
      $('#pluto-title').html(plutoUpper);
      $('#pluto-day-length').html('<span>Rotation period: </span>' + hoursInDay);
      $('#pluto-year-length').html('<span>Orbital period: </span>' + daysInYear);
      $('#pluto-distance-from-sun').html('<span>Distance from sun: </span>' + distanceFromSun);
      $('#pluto-mass').html('<span>Mass: </span>' + mass);
      $('#pluto-temp').html('<span>Average temp: </span>' + avgTemp);
      $('#pluto-radius').html('<span>Radius: </span>' + radius);
      $('#pluto-moons').html('<span>Number of moons: </span>' + numMoons);
    }})
    // Clear out Pluto divs before loading again
    if (chart) {
      chart.destroy();
    }
    $('#pluto-title').empty();
    $('#pluto-day-length').empty();
    $('#pluto-year-length').empty();
    $('#pluto-distance-from-sun').empty();
    $('#pluto-mass').empty();
    $('#pluto-temp').empty();
    $('#pluto-radius').empty();
    $('#pluto-moons').empty();
  })
});

// NASA API call and click event to display picture of the day
$('#picture-of-day').on('click', function () {
  $('#pic-container').empty();
  $('#pic-caption').empty();
  // URL
  var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=EHDG4w54znEf6k6YKpqUXmOhhC8zrmmbYmS4DPRj"
  // Ajax call to API
  $.ajax({
    url: nasaURL,
    method: 'GET'
  }).then(function (picResponse) {
    // Parse to retrieve img url
    var picOfDay = picResponse.hdurl;
    // Parse to retrieve img caption
    var picCaption = picResponse.explanation;
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

// Function to restrict age input to number only
function isInputNumber(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;

    return true;
  }
}
// Click event to retrieve and set data to Firebase
$('#visitor').on('click', function () {
  // Retrieve user inputs
  var userName = $('#name-input').val().trim();
  var userAge = $('#age-input').val().trim();
  // Create object to store user input values
  var userData = {
    name: userName,
    age: userAge
  }
  // Push to Firebase database
  database.ref().push(userData);
  // Empty input fields after user submits
  $('input').val('');
})
// Firebase watcher and initial loader
database.ref().on('child_added', function (snapshot) {
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
