//let busRouteURL = "https://api.umd.io/v0/bus/routes"
let busRouteURL = "https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json?$where=date%20between%20%272020-01-01%27%20and%20%272020-02-01%27"
//let busRouteURL = "https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json"
fetch(busRouteURL)
    .then((response) => {
        return response.json();
    })
    .then((routes) => {
        console.log(routes.length);

        // loop through all json object
        //   for (i = 0; i < routes.length; i++){
        //       console.log(routes[i].title);
        //   }

        // filter with exact name
        // let filtered = routes.filter(a => a.title == "109 River Road");
        // console.log(filtered);

        // let name = routes[0].title;
        // for(index in name){
        //     if(name[index].toUpperCase == "PARK"){
        //         console.log(name);
        //     }
        //     else{
        //         console.log(name[index]);
        //     }
        // }

    })
    .catch((err) => {
        console.log(err);
        main.innerHTML = "Invalid bus route";
    });

/********** SEARCH ************* */

const routeArray = [];

fetch(busRouteURL)
    .then(blob => blob.json())
    .then(data => {
        for (i = 0; i < data.length; i++) {
            if (typeof data[i].street_address != "undefined") {
                //console.log("good");
                routeArray.push(data[i]);
            }
            else {
                console.log("id: " + i);
            }
        }
        console.log(routeArray.length);
    })
function findMatches(wordToMatch, arr) {
    return arr.filter(item => {
        const regex = new RegExp(wordToMatch, 'gi');
        return item.street_address.match(regex) || item.clearance_code_inc_type.match(regex)


    });
}

function displayMatches() {
    if(document.querySelector('#searchin').value != ""){
    suggestions.innerHTML = "<tr><th>Case ID</th><th>Date</th><th>Crime Type</th><th>Street Address</th></tr>";
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
        "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    const matchArray = findMatches(searchInput.value, routeArray);

    //check if the input is in results database
    checkForUpdate(searchInput.value.toLowerCase(), crimeTypeArray);


    const html = matchArray.map(mission => {
        let date = new Date(mission.date)

        //const regex = new RegExp(this.value, 'gi');
        //const missionName = mission.taskName.replace(regex, `<span class="highlight">${this.value}</span>`);
        return `
        <tr>
            <td>${mission.incident_case_id}</td>
            <td>${monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear()}</td>
            <td>${mission.clearance_code_inc_type}</td>
            <td>${mission.street_address}</td>
        </tr>
      `;
    }).join('');
    suggestions.innerHTML += html;
}
else{
suggestions.innerHTML = "";
}
}

const searchInput = document.querySelector('#searchin');
const suggestions = document.querySelector('.suggestions');
const searchBtn = document.querySelector('#btngo');  // click go button

//searchInput.addEventListener('change', displayMatches);
//searchInput.addEventListener('keyup', displayMatches);
searchBtn.addEventListener('click', displayMatches);
searchInput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("btngo").click();
    }
});

//check if the search is a crimType in database
let url = "/allResults"
const crimeTypeArray = [];

fetch(url)
    .then(blob => blob.json())
    .then(data => crimeTypeArray.push(...data.data))
//return an array
function checkForUpdate(type, arr) {
    // return arr.filter(item => {
    //     const regex = new RegExp(type, 'gi');
    // return item.crimeType.match(regex)
    let filtered = arr.filter(a => a.crimeType == type);
    //console.log(filtered);
    //*********return filtered;
    //});

    if (filtered.length != 0) {
        let isInDb = filtered[0];
        console.log(JSON.stringify(isInDb))
        
        let taskURL = "/result?typeId=" + isInDb.id;

        const fetchPromise = fetch(taskURL, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }, body: JSON.stringify(isInDb)
        });

        fetchPromise
            .then((response) => {
                return response.json();
            })
            .then((change) => {
                console.log("Here Update");
                console.log("update: "+change.message + " "+ change.changes + " changes");
                console.log(change.data);
            })
            .catch((err) => {
                console.log(err);
                //document.getElementById("updatedTaskContent").innerHTML = "Invalid task id: " + updateTaskId;
            });
    }
}


