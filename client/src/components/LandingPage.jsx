import React from "react";
import axios from "axios";

class LandingPage extends React.Component {

    componentWillMount(){
      // Load the page specific CSS
      if(!document.getElementById('page_css')) {
          var link = document.createElement('link');
          link.id = 'page_css';
          link.rel = 'stylesheet';
          link.href="landingPage.css";
        document.head.appendChild(link);
        }else{
          var link1 = document.getElementById('page_css');
          link1.href="landingPage.css";
        }
      // If signed in, redirect to the calendar month view
      axios.get('/auth/current_user').then(res=>{
        if(!(res.data==="")){
          console.log("Redirect to calendar month page from loadingPage if logged in.");
          this.props.history.push('/cal');
        }
      });
    }

    // Very thin wrapper for landing page HTML. landingPage.css in public has styles
    render() {
        return (
          <div id="landingPage">
            <div className="header">
              <div className="nav-bar">
                  <a className="left" href="/landing_page"><img id="logo" src="favicon.png"/> Smart Scheduler</a>
                  <a className="right" href="/">Log In</a>
              </div>
              <div className="callToAction">
                  <h1>Smart Scheduler</h1>
                  <p>Plan homework around your schedule.</p>
                  <a className="button" href="/">Log In</a>
              </div>
            </div>
            <div className="block">
              {//TODO edit text and content
              }
              <img className="featuredImage" src="specialFeatures.jpg"/>
              <h1>Special Features</h1>
              <ul>
                <li>Google sign in with OAuth</li>
                <li>Deployed to Heroku</li>
                <li>Quotes API integrated on calendar page</li>
                <li>Server enhancements</li>
                <li>Landing page</li>
                <li>Password Hashing</li>
                <li>Remote database for storing user accounts and events</li>
                <li>Day schedule view</li>

              </ul>
            </div>
          </div>
        );
    }
}

export default LandingPage;