import React from "react";
import "./App.css";
import Clock from "./Clock.js";
import Winner from "./Winner.js";

import bg from "./imgs/bg1.jpg";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <img src={bg} alt="background" title="background" />
                <Clock />
                <div className="welcome">
                    <h2>! 2020 멋쟁이사자처럼 Debuging Contest에 오신 여러분을 환영합니다 !</h2>
                </div>

                <Winner />
                
            </div>
        );
    }
}
export default App;
