// Grab data from the static JSON file
var resData = data;
var difficulty1 = "easy"
// Function to calculate random integer for recipe

console.log(resData)

function fetchResult(query, level) {
    console.log("in fetch result " + query);
    var urls1 = [];
    var topic1 = "";

    if (level) {
        console.log("level found")
        var topic1 = resData.query;
        resData.forEach(function (entry) {
            if (entry.topic == topic1 && entry.Difficuly == level) {
                urls1 = entry.URLs;
            }
        });
    } else {
        console.log("level not found")
        var topic1 = resData.query;
        resData.forEach(function (entry) {
            if (entry.topic == topic1 && entry.Difficuly == difficulty1) {
                urls1 = entry.URLs;
            }
        }); 

    }
    console.log("in fetch result after fetching " + topic1, level)
    return urls1
}

// Grab Ingredients in HTML
const results_table = d3.select("#Results");

// Function to build the data using a parameter data

function buildResult(query,level) {

    // First, clear out any existing data

    results_table.html("");

    const urls = fetchResult(query,level);

    for (var i = 0; i < urls.length; i++) {

        // Append a row to the table body
        const row = results_table.append("tr");
        let cell = row.append("tr");
        cell.text(urls[i]);
    }
    return urls
}

function handleClickSearch_Q(level) {

    const query1 = d3.select('#search_query').property("value");
    console.log("after getting"+query1)

    if (query1) {
        const query = String(query1);
        console.log("in handle click search"+query);
        document.getElementById("search_query").placeholder = query;

        buildResult(query,level);
        //const urls = buildResult(query, level);
        var num_query_results = 5;

        document.getElementById("search_num").innerHTML = "Top " + num_query_results +" results for your query are: ";
        }
}

function handleClickSearch_L() {
    const level = d3.select('#search_level').property("value");
    handleClickSearch_Q(level);
}

d3.select("#search-btn").on("click", handleClickSearch_L);
