let busRouteURL = "https://api.umd.io/v0/bus/routes"

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

        // YOUR CODE HERE
        // sessionStorage.setItem("title", route.title);
        // sessionStorage.setItem("lat_max", route.lat_max);
        // sessionStorage.setItem("lat_min", route.lat_min);
        // sessionStorage.setItem("lon_max", route.lon_max);
        // sessionStorage.setItem("lon_min", route.lon_min);

    })
    .catch((err) => {
        console.log(err);
        main.innerHTML = "Invalid bus route";
    });

/********** SEARCH ************* */

const routeArray = [];

fetch(busRouteURL)
    .then(blob => blob.json())
    .then(data => routeArray.push(...data))

function findMatches(wordToMatch, arr) {
    return arr.filter(item => {
        const regex = new RegExp(wordToMatch, 'gi');
        return item.title.match(regex)


    });
}

function displayMatches(){
    //if(document.querySelector('.searchTask').value != ""){
    suggestions.innerHTML = "<tr><th>Route ID</th><th>Title</th></tr>";
    const matchArray = findMatches(this.value, routeArray);
    const html = matchArray.map(mission =>{
      //const regex = new RegExp(this.value, 'gi');
      //const missionName = mission.taskName.replace(regex, `<span class="highlight">${this.value}</span>`);
      return `
        <tr>
            <td>${mission.route_id}</td>
            <td>${mission.title}</td>
        </tr>
      `;
    }).join('');
    suggestions.innerHTML += html;
    }
    //else{
     // suggestions.innerHTML = "";
    //}
  //}
  
  const searchInput = document.querySelector('.searchTask');
  const suggestions = document.querySelector('.suggestions');
  
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
