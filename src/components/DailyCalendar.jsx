import React from "react";
import dateFns from "date-fns";
import axios from "axios";

class DailyCalendar extends React.Component {
    state = {
        currentDay: new Date(),
        currentMonth: new Date(),
        selectedDate: new Date()
    };

    componentWillMount(){
      axios.get('/auth/current_user').then(res=>{
        //console.log(typeof res.data);
        if(res.data===""){
          console.log("Redirect");
          this.props.history.push('/');
        }
      })
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

                <div className="col col-center">
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

        const rows = [];
        let days = [];
        let hour = 0;
        const endHour = 23;
        let time = 6;

        while (hour <= endHour) {

            for (let i = 0; i < 2; i++) {
                if (i == 0) {
                    if (hour<6){
                        days.push(
                            <div className="col cell timedisplay">
                                <span>{time}:00 am</span>
                            </div>
                        );
                    } if (6<=hour && hour<18) {
                        days.push(
                            <div className="col cell timedisplay">
                                <span>{time}:00 pm</span>
                            </div>
                        );
                    } if (hour>=18) {
                        days.push(
                            <div className="col cell timedisplay">
                                <span>{time}:00 am</span>
                            </div>
                        );
                    }

                } else {
                    days.push(
                        <div className="col cell">
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

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };

    nextDay = () => {
        this.setState({
            currentDay: dateFns.addDays(this.state.currentDay, 1)
        });
    };

    prevDay = () => {
        this.setState({
            currentDay: dateFns.subDays(this.state.currentDay, 1)
        });
    };

    nextWeek = () => {
        this.setState({
            currentDay: dateFns.addDays(this.state.currentDay, 7)
        });
    };

    prevWeek = () => {
        this.setState({
            currentDay: dateFns.subDays(this.state.currentDay, 7)
        });
    };

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default DailyCalendar;
