# PGcrimes

### Team members: 
Vivian Thai, Cholpon Zamir, Yuming Huang, Yao Poudima, Audrey Tsang

### App Link:
Link to PG Crimes Heroku: https://pgcrime.herokuapp.com/

### Information Problem:
People have interest or motive to learn more about Prince George's county crime. They have a hard time getting reliable information, we aim to create a user-centered application to solve their needs through providing a searchable database.

### Stakeholders:
Residents and incoming residents of Prince George's county and anyone else who wishes to learn more about the county's crime.

### Data:
We are using data from the Crime Incidents February 2017 to Present dataset found at https://data.princegeorgescountymd.gov/Public-Safety/Crime-Incidents-February-2017-to-Present/wb4e-w4nf/data.

### Solution: 

Our solution to solve this problem, is by creating a way for the user to access and interpret the crime data. We are providing a search and data functionality to allow users to navigate the database. Through their own control and preferences, our web-based application is a way to learn about the type of crime, the data it occured, and many other relevant elements to Prince George's county crime. 

### Technical system decision rationale:

* SQLite Database
 * Used for embedded storage of our data in the back end of our system
* Bar Graph (with CanvasJs)
 * Used for presentation of our data received from the search results

### Challenges:
The main challenges we encountered were formatting the search bar for the best user experience and adding the filtering feature for the search results. It proved to be difficult to get results that satisfy 2 conditions. At first, we were only able to satisfy one condition. However, after more work and research we were able to help users narrow down their results.
Once a search bar was created, we needed to think of a way to make the filter feature look cohesive alongside. We tried adding it to many places, and finally decided that putting it next to the search bar would look the best. Since the original code only allowed for one element on the search bar line, we had to edit the CSS code to allow for the addition. The editing would cause issues with the look of the button, making formatting take extra time.


### Future Work:

* Add more security and error checking to Contact Us form submission process
* Add additional filtering options for the Home page
* Offer more and different options for the user to search using different dates and other relevant crime data elements
* Create an interactive map for users to further explore crime within Prince George's county
* Ensure browser compatability with other main browsers such as Firefox and Internet Explorer
