/*credit for base code: https://blog.flowandform.agency/create-a-custom-calendar-in-react-3df1bfd0b728*/

import React from "react";
import dateFns from "date-fns";
import axios from "axios";

class DailyCalendar extends React.Component {
    constructor(props, context) {
        super(props, context);
        if (this.props.location.state===undefined) {
            var today = new Date();
            var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            this.state = {
               currentDay: myToday,
               currentMonth: myToday,
               selectedDate: myToday
            };
        } else {
            this.state = {
                currentDay: this.props.location.state.currentDay,
                currentMonth: this.props.location.state.currentMonth,
                selectedDate: this.props.location.state.selectedDate
            }
        }
    }

    componentWillMount(){
      if(!document.getElementById('page_css')) {
          var link = document.createElement('link');
          link.id = 'page_css';
          link.rel = 'stylesheet';
          link.href="dayCal.css";
        document.head.appendChild(link);
        }else{
          var link1 = document.getElementById('page_css');
          link1.href="dayCal.css";
        }
      axios.get('/auth/current_user').then(res=>{
        //console.log(typeof res.data);
        if(res.data===""){
          console.log("Redirect");
          this.props.history.push('/');
        }
      });
    }

    renderHeader() {
        const dateFormat = "dddd - MMMM D, YYYY";

        return (
            <div className="header row flex-middle">

                <div className="col col-start">
                    <div className="icon" onClick={this.prevWeek}>
                        first_page
                    </div>
                </div>

                <div className="col col-start">
                    <div className="icon" onClick={this.prevDay}>
                        chevron_left
                    </div>
                </div>

                <div className="col col-center" onClick={this.calReturn}>
                    <span>
                        {dateFns.format(this.state.currentDay, dateFormat)}
                    </span>
                </div>

                <div className="col col-end">
                    <div className="icon" onClick={this.nextDay}>
                        chevron_right</div>
                </div>

                <div className="col col-end" >
                    <div className="icon" onClick={this.nextWeek}>
                        last_page</div>
                </div>

            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        days.push(
            <div className="col col-time" key={0}>
                Time
            </div>
        );

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 1; i < 2; i++) {
            days.push(
                <div className="col col-events" key={i}>
                    Events
                </div>
            );
        }

        return <div className="labels row">{days}</div>
    }

    renderCells() {
        console.log(this.state.currentDay);
        axios.post('/func/getevents', {
            date: this.state.currentDay
        }).then(function(response) { //sorry this code is a huge mess
            for (var hour = 0; hour < 24; hour++) {
                document.getElementById(hour).removeAttribute("style");
                document.getElementById(hour).innerHTML='';
            }
            for (var j = 0; j < response.data.length; j++) {
                var sHour = response.data[j].sTimeHour;
                var sMin = response.data[j].sTimeMinute;
                var eHour = response.data[j].eTimeHour;
                var eMin = response.data[j].eTimeMinute;
                var name = response.data[j].eName;
                var idName = name.replace(/\s+/g, '');
                var colors = ['#0066ff', '#9900ff', '#00cc00', '#ffcc00', '#ff33cc', '#cc0000', '#ff6600', '#33ccff']
                var fullHeight = (eHour-sHour)*6 + (eMin - sMin)/10;
                var t = (sMin/10) + "em";
                var elementStyle = document.getElementById(sHour).style;
                elementStyle.top=t;
                elementStyle.height=fullHeight;
                elementStyle.zIndex=5;
                    // chooses a random color for the event, probably will change to have user pick
                    document.getElementById(sHour).style.background=colors[j%7]; 
                    if(eMin===0){eMin="00";} if(sMin===0){sMin="00";}
                    document.getElementById(sHour).innerHTML+=
                    "<div id=" + sHour + idName +"><b>" + name + "</b>--<small>" + sHour + ":" 
                    + sMin + "-" + eHour + ":" + eMin +"</small></div>";
                //}
           } 
        });

        const rows = [];
        let days = [];
        let hour = 0;
        const endHour = 23;
        let time = 12;

        while (hour <= endHour) {

            for (let i = 0; i < 2; i++) {
                if (i == 0) {
                    if (hour<12){
                        days.push(
                            <div className="col cell timedisplay">
                                <span>{time}:00 am</span>
                            </div>
                        );
                    } if (12<=hour && hour<24) {
                        days.push(
                            <div className="col cell timedisplay">
                                <span>{time}:00 pm</span>
                            </div>
                        );
                    }
                } else {
                    days.push(
                        <div id={hour} className="col cell event">
                        </div>
                    ); 
                    days.push(
                        <div id={hour} className="col cell event">
                        </div>
                    );
                }
            }

            if (time<=12){
                time=time+1;
            }

            if (time>12) {
                time=1;
            }

            rows.push(
                <div className="row" key={hour}>
                    {days}
                </div>
            );

            days = [];
            hour=hour+1;
        }

        return <div className="body">{rows}</div>;

    }

    calReturn = () => {
        this.props.history.push({
            pathname: '/cal'
        });
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };

    nextDay = () => {
        this.setState({
            currentDay: dateFns.addDays(this.state.currentDay, 1)
        });
        this.componentWillMount();
    };

    prevDay = () => {
        this.setState({
            currentDay: dateFns.subDays(this.state.currentDay, 1)
        });
        this.componentWillMount();
    };

    nextWeek = () => {
        this.setState({
            currentDay: dateFns.addDays(this.state.currentDay, 7)
        });
        this.componentWillMount();
    };

    prevWeek = () => {
        this.setState({
            currentDay: dateFns.subDays(this.state.currentDay, 7)
        });
        this.componentWillMount();
    };

    render() {
        return (
            <div className="calendar">
                <div className="nav-container">
                    <a href="/auth/logout">Logout</a>
                    <div className="nav-right">
                        <a href="/cal">Back to Month</a>
                        <a href="/add_event">New Event</a>
                        <a href="/add_assignment">New Assignment</a>
                    </div>
                </div>
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default DailyCalendar;
