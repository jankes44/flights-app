# flights-app

Quick summary from me at the bottom

Installation
Requirements: (node JS, NPM)
1.	Clone the repository (or download the files)
2.	In /flights-app/ run: ‘npm run install-deps’ and wait until finished (might take a moment)
3.	In /flights-app/ run: ‘npm run demo’

Language: JavaScript
Time spent: about 9 hours\

Packages used:

Server
  - Express
  -	Fast-csv
  -	Moment/Moment-timezone
  -	Concurrently\

Client
  -	React
  -	Bootstrap
  -	Moment
  -	Axios
  
Server endpoints /:from = departure airport code, /:to = destination airport code

-	BASE_URL/journey/:from/:to – res: array of flights taking “depair” and “destair” (from and to)
-	BASE_URL/travel-time/:from/:to – same as -||- but with formatted travel time and time zones of depaircode and destaircode
-	BASE_URL/average-journey-time/:from/:to – provides average journey time from – to (requirement 1)
-	BASE_URL/busiest-day/:from –provides the busiest day and count of flights of /:from param (requirement 2)
-	BASE_URL/proportion-business-class/:from/:to – provides proportion of business flights to the filtered array of flights - I was thinking about this one and now I think it should be done client-side because it’s working on a current journeys array so the dataset is easier to handle than the whole flight set. Note for the future. (requirement 3)
-	BASE_URL/percentage-of-flights/:to – provides percentage of flights that fly to /:to out of the whole dataset (requirement 4)
-	BASE_URL/busiest-airport – provides the busiest airport out of the whole dataset (requirement 5)


Quick summary

This quick technical test was pretty enjoyable. I tried new things which I did not have a chance to do before like converting two different times in 
2 time zones and telling a difference between them, this was the most challenging for me to be honest, it took me a moment to figure it where to 
get time zones data from, then parse it with existing data and calculate the difference between the departure times and arrival times in a correct way 
taking the time zones into consideration. At the end I believe I met the requirements and I will be happy to hear any sort of feedback from you. 
Thank you for the opportunity and hopefully I will hear from you soon.
Kind regards,
Jarek
