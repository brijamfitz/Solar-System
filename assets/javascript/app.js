// MAIN
// =============================================================================

// On click event
$(document).ready(function() {
  $(".planet").on("click", function() {
    // Retrieve unique planet name
    var planetName = $(this).attr("id");
    console.log(planetName);
    // Build our API url
    var queryURL =
      "https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v2/query?appid=4KQL5T-4RUJLAEV7L&input=planet%20" +
      planetName +
      "&output=json";

    // AJAX call to API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var json = JSON.parse(response);
      console.log(json);

      var pods = json.queryresult.pods;

      for (let i = 0; i < pods.length; i++) {
        if (pods[i].title === "Orbital properties") {
          var distanceFromSun = getProp("largest distance from orbit center", pods[i].subpods[0].plaintext);
          console.log("Distance from sun: " + distanceFromSun);
          var daysInYear = getProp("orbital period", pods[i].subpods[0].plaintext);
          console.log("Days in a year: " + daysInYear);
        } 
        else if (pods[i].title === "Physical properties") {
          var hoursInDay = getProp("rotation period", pods[i].subpods[0].plaintext);
          console.log("Hours in a day: " + hoursInDay);
          var radius = getProp("equatorial radius", pods[i].subpods[0].plaintext);
          console.log("Radius: " + radius);
          var numMoons = getProp("number of moons", pods[i].subpods[0].plaintext);
          console.log("Number of moons: " + numMoons);
          var mass = getProp("mass", pods[i].subpods[0].plaintext);
          console.log("Mass: " + mass);
        }
        else if (pods[i].title === "Atmosphere") {
          var avgTemp = getProp("average temperature", pods[i].subpods[0].plaintext);
          console.log("Average temp: " + avgTemp);
        //   var chemicalMakeup = getProp('Major constituents', pods[i].subpods[1].plaintext)
        //   console.log(chemicalMakeup);
        }
      }
    });

    // Function to split our plain text data strings into individual values
    function getProp(propName, properties) {
      var splits = properties.split(propName);
      return splits[1].split("|")[1].split("\n")[0];
    }

  })
});
