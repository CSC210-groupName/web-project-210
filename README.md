# Smart Scheduler

Smart Scheduler is a calendar application that allows you to input your own schedule and will schedule times for homework around your events. 

Created by Matthew Sundberg, Joseph Hur, Sarah Field and Andy Lu for Fall 2018 CSC210 Web Development at the University of Rochester.

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

###

## Tech Stack

This project uses 

- React
- Node JS
- Express

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
