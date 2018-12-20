import React from "react";
import axios from "axios";

class LandingPage extends React.Component {

    componentWillMount(){
      // Load the page specific CSS
      if(!document.getElementById('page_css')) {
          var link = document.createElement('link');
          link.id = 'page_css';
          link.rel = 'stylesheet';
          link.href="loadingPage.css";
        document.head.appendChild(link);
        }else{
          var link1 = document.getElementById('page_css');
          link1.href="loadingPage.css";
        }
      // If signed in, redirect to the calendar month view
      axios.get('/auth/current_user').then(res=>{
        if(!(res.data==="")){
          console.log("Redirect to calendar month page from loadingPage if logged in.");
          this.props.history.push('/cal');
        }
      });
    }

    render() {
        return (//TODO Fix
            <div>
            <div className="nav-container">
                <a href="/">Sign In</a>
            </div>
            <div className="fuckIfIknow">
                Stuff here
            </div>
        </div>
        );
    }
}

export default LandingPage;