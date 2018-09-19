// AJAX call to API
var queryURL = 'https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v2/query?appid=4KQL5T-4RUJLAEV7L&input=planet%20earth&output=json';

$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response) {
    var json = JSON.parse(response);
    console.log(json.queryresult.pods[0].subpods[0].plaintext);
})

$('#earth').on('click', function() {
    alert('I was clicked');
})