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
        this.checkTimeOverlap = this.checkTimeOverlap.bind(this);
        this.createTime = this.createTime.bind(this);
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
        var self = this;
        console.log(this.state.currentDay);
        // Pulling all the events for the current day
        axios.post('/func/getevents', {
            date: this.state.currentDay
        }).then(function(response) { //sorry this code is a huge mess

            console.log(response);
            // Resets for each new /day page
            for (var hour = 0; hour < 24; hour++) {
                for (var col = 1; col < 7; col++){
                    var divid = "row"+hour+"col"+col;
                    document.getElementById(divid).removeAttribute("style");
                    document.getElementById(divid).innerHTML='';
                }
            }

            // Adding events, very complicated, please be careful with this code <3
            var eventsAdded = [];
            for (var j = 0; j < response.data.length; j++) {
                var colNum = 1;
                var event = response.data[j],
                    sHour = event.sTimeHour,
                    name = event.eName,
                    idName = sHour+name.replace(/\s+/g, '');
                for (var c = 0; c < eventsAdded.length; c++) {

                    // At this point, colNum should always equal c+1. Otherwise there is a bug
                    var overlap = false,
                        column = eventsAdded[c];
                    for (var k = 0; k < column.length; k++) {
                        var colEvent = column[k];
                        if (self.checkTimeOverlap(event, colEvent)) {

                            // If there is an overlap, move to the next column
                            overlap = true;
                            colNum++;
                            break;
                        }
                    }
                    if (!overlap) {
                        break;
                    }
                }

                event.col = colNum;
                var sHour = event.sTimeHour,
                    sMin = event.sTimeMinute,
                    eHour = event.eTimeHour,
                    eMin = event.eTimeMinute;
                var fullHeight = ((eHour-sHour)*6 + (eMin - sMin)/10) + "em";
                var t = (sMin/10) + "em"; 

                // Formatting display times
                if(eMin===0){eMin="00";} if(sMin===0){sMin="00";} 
                var sHourDisplay = sHour<10 ? ("0"+sHour) : sHour;
                var eHourDisplay = eHour<10 ? ("0"+eHour) : eHour;

                // Actually creating the event display here!!!
                if (colNum <= 6) {
                    document.getElementById("row"+sHour+"col"+colNum).innerHTML+=
                    "<div id=" + idName +" class=userEvent><b>" + name + "</b><br/><small class=eTime>" + sHourDisplay + ":" 
                    + sMin + "-" + eHourDisplay + ":" + eMin +"</small></div>";
                    var elementStyle = document.getElementById(idName).style;
                    var divStyle = document.getElementById("row"+sHour+"col"+colNum).style;
                    elementStyle.background=event.color;
                    divStyle.top=t;
                    elementStyle.height=fullHeight;
                    divStyle.zIndex=5;

                    // colNum-1 (since colNum is 1-indexed) should only ever be 1 more than last col in eventsAdded
                    if (!eventsAdded[colNum-1]) {
                        eventsAdded.push([]);
                    }
                    eventsAdded[colNum-1].push(response.data[j]);
                }
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
                    for (var i = 1; i < 7; i++) {
                        var divid = "row"+hour+"col"+i;
                        days.push(
                            <div id={divid} className="col cell event">
                            </div>
                        ); 
                    }
                }
            }

            if (time<=12){
                time=time+1;
            }

            if (time>12) {
                time=1;
            }

            var rowid = "row" + hour;
            rows.push(
                <div id={rowid} className="row" key={hour}>
                    {days}
                </div>
            );

            days = [];
            hour=hour+1;
        }

        return <div className="body">{rows}</div>;

    }

    createTime(hour, min) {
        return hour;// * 60 + min;
    }

    checkTimeOverlap(event1, event2) {
        var sTime1 = this.createTime(event1.sTimeHour, event1.sTimeMinute);
        var sTime2 = this.createTime(event2.sTimeHour, event2.sTimeMinute);
        var eTime1 = this.createTime(event1.eTimeHour, event1.eTimeMinute);
        var eTime2 = this.createTime(event2.eTimeHour, event2.eTimeMinute);
        if (sTime1 === sTime2) {
            return true;
        }
        if (sTime1 < sTime2) {
            return eTime1 > sTime2;
        }
        return sTime1 < eTime2;
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
