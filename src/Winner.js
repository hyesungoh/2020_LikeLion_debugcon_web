import React from "react";

class Winner extends React.Component {
    state = {
        winners: [],
    };
    componentDidMount() {
        const winnerForm = document.querySelector("form");
        winnerForm.addEventListener("submit", this.handleSubmit);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const input = event.target.querySelector("input");
        const name = input.value;
        const time = new Date().toLocaleTimeString();
        const tempWinner = { name, time };

        this.saveWinner(tempWinner);
        input.value = "";
    };

    saveWinner = (obj) => {
        const lsWinner = JSON.parse(localStorage.getItem("winners"));

        if (lsWinner === null) {
            localStorage.setItem("winners", JSON.stringify([obj]));
        } else {
            const winner = lsWinner.concat(obj);
            localStorage.setItem("winners", JSON.stringify(winner));
        }

        this.setState((current) => ({
            winners: JSON.parse(localStorage.getItem("winners")),
        }));
    };

    render() {
        const winner_data = JSON.parse(localStorage.getItem("winners"));

        return (
            <div className="winner">
                <form>
                    <input type="text" placeholder="다 한 사람 ?"></input>
                </form>
                {winner_data === null ? (
                    <span></span>
                ) : (
                    <div
                        className={
                            winner_data.length > 4
                                ? "winner__list"
                                : "winner__list__low"
                        }
                    >
                        {winner_data.map((e, index) => (
                            <div className="winner__card" key={index}>
                                <span className="rank">{index + 1}</span>
                                <span className="name">{e.name}</span>
                                <span className="time">{e.time}</span>
                                <span className="congr">
                                    디버깅 완료 ! 축하드립니다 !!
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default Winner;
