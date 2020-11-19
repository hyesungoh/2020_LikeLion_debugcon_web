import React from "react";
const endHour = 20,
    endMinute = 0,
    endSecond = 0;
const endTotalSecond = (endHour * 60 * 60) + endMinute + endSecond;

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

        const currentTotalSecond =
            date.getHours() * 60 * 60 +
            date.getMinutes() * 60 +
            date.getSeconds();
        const leftSecond = endTotalSecond - currentTotalSecond;
        const leftTime = new Date(leftSecond * 1000)
            .toISOString()
            .substr(11, 8);

        this.setState({
            hour: leftTime.slice(0, 2),
            minute: leftTime.slice(3, 5),
            second: leftTime.slice(6, 8),
        });
    };

    render() {
        const { hour, minute, second } = this.state;
        return (
            <div className="clock">
                <span className="hour">
                    {/* {hour > 9 ? hour : `0${hour}`} */}
                    {hour}
                </span>
                <span>:</span>
                <span className="minute">
                    {/* {minute > 9 ? minute : `0${minute}`} */}
                    {minute}
                </span>
                <span>:</span>
                <span className="second">
                    {/* {second > 9 ? second : `0${second}`} */}
                    {second}
                </span>
            </div>
        );
    }
}

export default Clock;
