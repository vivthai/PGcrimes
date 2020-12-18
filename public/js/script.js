//api from 2020-01-01 to 2020-12-13 but limited by 1000 results
let apiURL = "https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json?$where=date%20between%20%272020-01-01%27%20and%20%272020-02-01%27"

//let apiURL = "https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json"
//orginal api link

/********** search ************* */
const casesArray = [];

fetch(apiURL)
    .then(blob => blob.json())
    .then(data => {
        for (i = 0; i < data.length; i++) {
            if (typeof data[i].street_address != "undefined") {
                casesArray.push(data[i]);
            }
            else {
                console.log("id: " + i);
            }
        }
    })

/*********display the results********* */
function displayMatches() {
    if ((dropdownInput.value != 0) && searchInput.value === "") { //yes drop down but no search
        function findMatches(wordToMatch, arr) {
            return arr.filter(item => {
                const regex = new RegExp(wordToMatch, 'gi');
                return item.clearance_code_inc_type.match(regex)
            });
        }
        const matchArray = findMatches(dropdownInput.value, casesArray);
        getResultTable(matchArray);

        //check if the input is in results database
        checkForUpdate(dropdownInput.value.toLowerCase(), crimeTypeArray);
    }

    else if (dropdownInput.value == 0 && searchInput.value != "") { //no drop down but yes search
        function findMatches(wordToMatch, arr) {
            return arr.filter(item => {
                const regex = new RegExp(wordToMatch, 'gi');
                return item.street_address.match(regex)


            });
        }
        const matchArray = findMatches(searchInput.value, casesArray);
        getResultTable(matchArray);
    }

    else if (dropdownInput.value != 0 && searchInput.value != "") { //yes drop down AND yes search
        function findMatches(crimeType, streetName, arr) {
            return arr.filter(item => {
                const regex1 = new RegExp(crimeType, 'gi');
                const regex2 = new RegExp(streetName, 'gi');
                return item.clearance_code_inc_type.match(regex1) && item.street_address.match(regex2)
            });
        }
        const matchArray = findMatches(dropdownInput.value, searchInput.value, casesArray);
        getResultTable(matchArray);
        //check if the input is in results database
        checkForUpdate(dropdownInput.value.toLowerCase(), crimeTypeArray);
    }

    else if (dropdownInput.value == 0 && searchInput.value == "") { //no drop down and no search
        function findMatches(wordToMatch, arr) {
            return arr.filter(item => {
                const regex = new RegExp(wordToMatch, 'gi');
                return item.street_address.match(regex)
            });
        }
        const matchArray = findMatches(searchInput.value, casesArray);
        getResultTable(matchArray);
    }
}

/********add results to table******* */
function getResultTable(matchArray) {
    suggestions.innerHTML = "<tr><th>Case ID</th><th>Date</th><th>Crime Type</th><th>Street Address</th></tr>";
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
        "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];


    console.log("match lenght:" + matchArray.length);

    const html = matchArray.map(incident => {
        let date = new Date(incident.date)
        return `
        <tr>
            <td>${incident.incident_case_id}</td>
            <td>${monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear()}</td>
            <td>${incident.clearance_code_inc_type}</td>
            <td>${incident.street_address}</td>
        </tr>
        `;
    }).join('');
    suggestions.innerHTML += html;
}


const searchInput = document.getElementById("searchin"); //search bar
const suggestions = document.querySelector(".suggestions"); //result table
const searchBtn = document.getElementById("btngo");  // click go button
const dropdownInput = document.getElementById("crimes"); //drop down

searchBtn.addEventListener("click", displayMatches);//search button click

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

/******update the number of search results****** */
function checkForUpdate(type, arr) {
    let filtered = arr.filter(a => a.crimeType == type);
    if (filtered.length != 0) {
        let isInDb = filtered[0];
        console.log(JSON.stringify(isInDb))

        let taskURL = "/result?typeId=" + isInDb.id;

        const fetchPromise = fetch(taskURL, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(isInDb)
        });

        fetchPromise
            .then((response) => {
                return response.json();
            })
            .then((change) => {
                console.log("Here Update");
                console.log("update: " + change.message + " " + change.changes + " changes");
                console.log(change.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


/***********drop down box*********** */
let crimeValues = [];
let settings = { method: "Get" };

async function getPageData() {
    await fetch('./allResults', settings)
        .then(res => res.json())
        .then((json) => {
            let listSize = json.data.length;
            json.data.forEach(element => {
                let optionTag = document.createElement("option"); // Create a <option> element
                optionTag.innerHTML = element.crimeType; // Insert text
                optionTag.setAttribute("value", element.crimeType);
                document.getElementById("crimes").appendChild(optionTag); // Append <option> to drop down
            });
        })
};

//add crimeType to drop down when page load
window.onload = async function loadPage() {
    getPageData();
}