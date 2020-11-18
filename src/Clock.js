import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        };
    }

    componentDidMount() {
        setInterval(this.getTime, 1000);
    }

    getTime = () => {
        const date = new Date();
        this.setState({
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        });
    };

    render() {
        const { hour, minute, second } = this.state;
        return (
            <div className="clock">
                <span className="hour">{hour > 9 ? hour : `0${hour}`}</span>
                <span>:</span>
                <span className="minute">
                    {minute > 9 ? minute : `0${minute}`}
                </span>
                <span>:</span>
                <span className="second">
                    {second > 9 ? second : `0${second}`}
                </span>
            </div>
        );
    }
}

export default Clock;
