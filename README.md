# HackRU-2024

Better Calendar hopes to help the user manage their time more efficiently. The motivation was because as a commuter, I always had to consider how much time I had to get ready, how long it would take to get to school, and when I should leave to avoid being late. I also wanted to learn how to use databases, APIs, and gain experience with web services such as AWS. Better Calendar will be an add on in google workspaces so any user can add these features to Google Calendar.

Better Calendar will track the user’s location using Google’s Geolocation API and using the Google Map’s API & Google Calendar’s API, it will find the fastest route to the location of the event from the user’s location. The time of the route will then be used to notify the user x minutes before the event. If there is any traffic or dangerous road conditions, the user will be notified with a warning. This will be done by using Open Weather’s Weather API. Using these APIs will help me gain experience learning how to read documentation and interpret them effectively. The code will rerun in short intervals to check if the user should be notified or not. This will be done using AWS’ Lambda Function. AWS is one of the most widely used cloud services meaning it is a technology that most companies would want potential candidates to know how to use. It also offers many services Software engineers might need. The data given by the user will be stored in a database using MongoDB. This will give me exposure to non relational databases giving me more insight on when to use relational databases or non relational database.

## How to build
HOW TO RUN THE PROJECT: in the hackru main folder, cd client, then run npm run build. Type cd .. then cd server, then run npm run dev. This will start the client and server. Go to https://localhost:3000 to view the site

## DotENV
Sample DotENV file
```
PORT=3000
JWT_SECRET=put_secret_here
JWT_EXPIRES_IN=1H
```
