# Smart Scheduler

Smart Scheduler is a calendar application that allows you to input your own schedule and will schedule times for homework around your events.

Created by Matthew Sundberg, Joseph Hur, Sarah Field and Qingjie Lu for Fall 2018 CSC210 Web Development at the University of Rochester.

###

## Features

### Event Adding

Users can add their own events into the calendar by specifying a date, start and end times for the event, the event name and description, and a color for the event display. Calendar events created persist for the user and are displayed on the daily calendar to view their daily schedule.

Users can add up to 6 events that are scheduled within the same hour to be displayed. Further events are still stored and considered in scheduling constraints.

### Assignment Scheduling

Users can add details about an assignment that will be automatically scheduled around their existing events. Users simply enter when the assignment is due, how long they estimate the assignment will take, and how many hours they are willing to work consecutively on a single day. The app will then automatically schedule events in the users calendar to remind them to work on the assignment. it will also automatically schedule a reminder to submit the assignment at the time it is due.

#### Daily Quote

Users will see a quote upon loading the monthly calendar view, sourced from the external API.

#### Login with Google

Users can login using their existing google accounts for ease of access.

###

## To Run:

Our project is currently hosted at https://web210.herokuapp.com. Check it out!

##### To run locally:
In the project directory, run:

`npm i`

then in /client directory, run:

`npm i`

then finally, in project directory, run:

`npm run dev`

This will run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>




- optional
`npm run prod`

This will run your app with multi threading with pm2, which offers you optimized server performance.
This version is what is currently running for the production.
Depending on your machine, pm2 will create the corresponding number of threads.
However, this version doesn’t support server reload as it doesn't have nodemon, and you do need to manually shut down threads with pm2 delete all.


###

## Tech Stack

This project uses

- React
- Node JS
- Express
- MongoDB

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

###

###

###

## Project Requirements

### Database:

Our database is a remote serviced mongoDB database. Our schema contains a Collection of users, including a unique id for each, a name to address the user by, and depending on method of login, either a username and password for default login, or a google id for login via Google.

Collections of events for each user are created on first added event for a user, and contain all information supplied by the user for adding events.

We connected our database to the backend Express server using the mongoose javascript framework. Documents are gathered by the backend to return information to the client through the API.

### Web API

Calls on the front end to our API are performed using axios. Data is consumed and used on the front end to do things such as display events.

Our Web API was implemented using Express and Axios to create various endpoints for the client side to access. These endpoints include:

###

##### Endpoints
###### AUTH

- `/auth/google` GET - uses Passport.js to authenticate Google users.
- `/auth/google/callback` GET - to redirect users to our web application after login with Google.
- `/auth/current_user` GET - returns information about the currently logged in user
- `/auth/logout` GET - logs a user out and redirect them to login page
- `/auth/logindefault` POST - uses Passport.js to authenticate a user by confirming username and password match
- `/auth/signupdefault` POST - creates a new user Document in the remote database

###### FUNC

- `/func/addevent` POST - adds an event to a logged in users database of events
- `/func/assassignment` POST - takes user information about assignment to automatically create and add assignment events to a logged in users database of events
- `/func/getevents` POST - takes the current day and returns all events on that given day in the logged in users events Collection

###

###

### Bonuses

##### Google OAuth

Users can log in using Google authentication

##### 3rd Party API

Daily quotes are gathered from the external API https://talaikis.com/api/

##### Cloud hosting of assets

Our project is currently being hosted at https://web210.herokuapp.com

MongoDB database is stored remotely using MLab.

##### Server Enhancement

Using pm2, the optimized server is much more effective and can handle more traffic.

##### Landing Page

Our web project has a landing page describing the product and leading users to the login page. Find at `/landing_page` or by clicking on the logo at the top of the login page.
