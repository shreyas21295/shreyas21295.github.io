// Grab data from the static JSON file
var recipeData = data;

// Function to calculate random integer for recipe
function fetchResult(data) {
    // Select a random recipe using MATH
    //var random_int = Object.keys(recipeData)[0];
    
    const query = d3.select('#search_query').property("value");

    console.log(query);
    document.getElementById("search_query").placeholder=query;
    
    var topic1 = data.query.slice(0,-1)
    var difficulty1 = data.query.slice(-1)
    //var index = Object.keys(json).indexOf(topic);
    data.forEach(function(entry) {
    if (entry.topic == topic1 && entry.Difficuly == difficulty1) {
        var urls1 = entry.URLs;
    }
    });
    
    return topic1, difficulty1, urls1
    //var specific_recipe = recipeData[0];
}

// Grab Ingredients in HTML
const results_table = d3.select("#Results");

// Function to build the data using a parameter data
function buildResult(data) {

    // First, clear out any existing data
    results_table.html("");
    
    var random_int = Object.keys(recipeData)[0];
    //var specific_recipe = recipeData;

    var topic, var difficulty, var urls = fetchResult(data);

    // Instantiate relevant variables for quick retrieval
    //var recipe_keys = Object.keys(specific_recipe);
    //var recipe_values = Object.values(specific_recipe);

    // basic string replace to 'clean-up' and format array response for ingredients and instructions
    //for (var i = 0; i < recipe_keys.length; i++) {

        //if (i === 3) {
    //var strip = recipe_values[i].replace(/[\])}[{(]/g, '');
        //}
        //else if (i === 4) {
    //var strip = recipe_values[i].replace(/[\])}[{(]/g, '');
    //var instructions = strip.split("', '");
    //var res = instructions.join(" <br> ");
        //}
    document.getElementById("Urls").innerHTML = urls;
    document.getElementById("Title").innerHTML = topic + difficulty;
    
    for (var i = 0; i < urls.length; i++) {

      // Append a row to the table body
      const row = results_table.append("tr");
      let cell = row.append("tr");
      cell.text(urls[i]);
    }
}




// Function to handle the search criteria via button click
function handleClickSearch() {

    const query = d3.select('#search_query').property("value");

    if (query) {
        console.log(query);
        document.getElementById("search_query").placeholder=query;

        var url = "https://scribes-recommender-system-api.herokuapp.com/api/search/";
        var updated_url = url + query;

        fetch(updated_url)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {

                recipeData = data;
                buildResult(recipeData);
                var num_query_results = recipeData.length;

                document.getElementById("search_num").innerHTML = "Your query returned " + num_query_results + " results.";
                document.getElementById("Urls").innerHTML = data;
          })

          .catch(function (err) {
            console.log(err);
          });
    }
}

// Function to generate new recipes for random generator
function handleClickRandom() {
  window.location.reload();
}

// Attach an event to listen for the search recipes button
d3. select("#search-btn").on("click", handleClickSearch);

// Attach an event to listen for the generate random recipe button
d3.select("#filter-btn").on("click", handleClickRandom);

// Build the table when the page loads
buildTable(recipeData);
