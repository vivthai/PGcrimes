
let url = "./allResults";
let chart = "";

let settings = { method: "Get" };
let chartValues = [];

async function getData() {
  await fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
      let listSize = json.data.length;
      console.log("listSize:" + listSize);
      json.data.forEach(element => {
        console.log(element.crimeType);
        console.log(element.searchNum);
        let addToChart = { 'label': element.crimeType, y: element.searchNum };
        chartValues.push(addToChart);
      });
    })
    .then(values => console.log(chartValues));
  chart.render();
};

/*******load the graph when page open***** */
window.onload = async function makeChart() {
  getData();
  chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "Crime Search Results"
    },

    data: [
      {
        type: "column",
        name: "Crime Search Results",
        dataPoints: chartValues
      }
    ]
  });
}

/**********show textbox after link clicked************ */
function show() {
  document.getElementById("requestInput").style.display = "block";
}


/**********add new a crimeType********** */
function submitNewCrimeType() {

  console.log("Called submitNewCrimeType");
  let crimeType = document.getElementById("crimeInput").value;
  if (crimeType != "") {
    crimeType = crimeType.toLowerCase();
    console.log("crimeInput:" + crimeType);
    data = { 'crimeType': crimeType };

    let resultURL = "/result";
    const fetchPromise = fetch(resultURL, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'

      }, body: JSON.stringify(data)
    });

    let outcomeId;
    fetchPromise
      .then((response) => {
        return response.json();
      })
      .then((outcome) => {
        console.log("Here POST crimeType");
        console.log(outcome);

        let message = "ERROR";
        if (typeof outcome.id !== "undefined") {
          crimeType = outcome.data.crimeType;
          outcomeId = outcome.id;
          searchNum = outcome.data.searchNum;
          message = "Success! Please refresh the page to see the result."
          "<br>crimeTypeId: " + outcomeId + " crimeType: " + crimeType + "<br> ";
        }
        else if (typeof outcome !== "undefined") {
          message = "Please try again. Crime type entered already exists.";
        }
        document.getElementById("postCrimeTypeContent").innerHTML = message;
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("postCrimeTypeContent").innerHTML = "Invalid crimeType : " + data.crimeType;
      });
  }
}