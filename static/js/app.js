// Grab data from the static JSON file
var resData = data;
var difficulty1 = "easy"

console.log(resData)

function fetchResult(query, level) {
    //console.log("in fetch result " + query);
    var urls1 = [];
    var topic1 = "";

    if (level) {
        //console.log("level found")
        resData.forEach(function (entry) {
            if (entry["Topic"] == query && entry["Difficuly"] == level) {
                urls1 = entry["URLs"];
                //console.log("in console topic " +entry["Topic"]);
            }
        });
    } else {
        //console.log("level not found")
        var topic1 = query;
        resData.forEach(function (entry) {
            if (entry["Topic"] == topic1 && entry["Difficuly"] == difficulty1) {
                urls1 = entry["URLs"];
            }
        }); 
    }
    //console.log("in fetch result after fetching " + topic1, level)
    return urls1
}

const results_table = d3.select("#Results");

// Function to build the data using a parameter data

function buildResult(query,level) {

    // First, clear out any existing data

    results_table.html("");

    const urls = fetchResult(query,level);

    for (var i = 0; i < urls.length; i++) {

        // Append a row to the table body
        const row = results_table.append("tr");
        //let cell = row.append("tr");
        let cell1 = row.append("td");
        let cell2 = cell1.append("a");
        let cell3 = cell2.append("href");
        var aa = document.getElementsByTagName("a");
        aa[i].href = urls[i]
        //console.log("cell is " + aaa);
        //class='clickable-row' data-href='url://link-for-first-row/'>
        cell2.text(urls[i]);
    }
    return urls
}

function handleClickSearch_Q(level) {

    const query1 = d3.select('#search_query').property("value");
    //console.log("after getting"+query1)

    if (query1) {
        const query = ""+query1;
        //console.log("in handle click search"+query);
        document.getElementById("search_query").placeholder = query;

        //buildResult(query,level);
        const urls = buildResult(query, level);
        var num_query_results = urls.length;

        document.getElementById("search_num").innerHTML = "Top " + num_query_results +" results for your query are: ";
        }
}

function handleClickSearch_L() {
    const level1 = d3.select('#search_level').property("value");
    const level = "" + level1;
    //console.log("after getting" + level)
    handleClickSearch_Q(level);
}

d3.select("#search-btn").on("click", handleClickSearch_L);
