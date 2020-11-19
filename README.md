## 2020 멋쟁이사자처럼 Debug-Contest를 위한 Web

###### 소요시간 : 약 5시간

###### 첫 React 활용이라 기능에 비해 오래 걸린 듯

---

### 기능

#### 시계

-   ##### `state`를 이용하여 시간, 분, 초를 사용

```js
render() {
    const { hour, minute, second } = this.state;
    // 시간이 한자리일 때를 삼항연산자로 구분
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
```

-   ##### `constructor`를 이용하여 render 전에 시간, 분, 초를 `state`에 저장

```js
constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    };
}
```

-   ##### `componentDidMount`를 이용하여 render 후에 `setInterval` 사용

```js
componentDidMount() {
    setInterval(this.getTime, 1000);
}

// setState를 이용하여 자동적으로 render 호출
getTime = () => {
    const date = new Date();
    this.setState({
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    });
};
```

#### 등수

-   ##### 등수를 `[{name: "", time: ""}, {}...]` 와 같은 형식으로 사용
-   ##### `componentDidMount`을 이용하여 input에 `eventListener` 사용

```js
componentDidMount() {
    const winnerForm = document.querySelector("form");
    winnerForm.addEventListener("submit", this.handleSubmit);
}

handleSubmit = (event) => {
    // submit 후 새로고침 되는 것을 방지하기 위해
    event.preventDefault();
    const input = event.target.querySelector("input");
    // 작성된 이름
    const name = input.value;
    // 작성된 시간
    const time = new Date().toLocaleTimeString();
    const tempWinner = { name, time };

    // ls에 저장하는 함수 호출
    this.saveWinner(tempWinner);
    // input value 초기화
    input.value = "";
};
```

-   ##### localStorage를 사용하여 새로고침하여도 등수가 남아있게 함

```js
saveWinner = (obj) => {
    const lsWinner = JSON.parse(localStorage.getItem("winners"));

    if (lsWinner === null) {
        // 비어있다면 [{}] 형식으로 저장
        localStorage.setItem("winners", JSON.stringify([obj]));
    } else {
        // 비어있지 않다면 concat을 이용하여 새로운 array를 만들어 저장
        const winner = lsWinner.concat(obj);
        localStorage.setItem("winners", JSON.stringify(winner));
    }

    // setState를 이용하여 자동적으로 render 호출 및 저장
    this.setState({
        winners: JSON.parse(localStorage.getItem("winners")),
    });
};
```

-   ##### 삼항연산자를 이용하여 데이터가 null, 5 미만 일 때 예외처리
-   ##### map을 이용하여 데이터를 렌더링

```js
render() {
    // ls에 저장된 데이터를 사용
    const winner_data = JSON.parse(localStorage.getItem("winners"));

    return (
        <div className="winner">
            <form>
                <input type="text" placeholder="다 한 사람 ?"></input>
            </form>

            // 비어있을 때 span을 보여줌
            {winner_data === null ? (
                <span></span>
            ) : (

                // flex-wrap을 사용하여 데이터가 적을 때 gap이 커지는 것을
                // 방지하고자 길이에 따라 className을 다르게 할당
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
```

#### 남은 시간 계산

-   ##### 종료 시간과 현재 시간을 초로 계산 후 Date 클래스를 생성하는 데 이용

```js
// 종료 시간 연산
const endHour = 20,
    endMinute = 0,
    endSecond = 0;
const endTotalSecond = endHour * 60 * 60 + endMinute + endSecond;

// in class ...
getTime = () => {
    const date = new Date();

    // 현재 시간 연산
    const currentTotalSecond =
        date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
    // 남은 시간 연산
    const leftSecond = endTotalSecond - currentTotalSecond;
    // 초를 이용하여 date 생성 후 toISOString를 이용하여 문자열로,
    // substr을 이용하여 슬라이싱
    const leftTime = new Date(leftSecond * 1000).toISOString().substr(11, 8);

    // 필요한 시간, 분, 초를 setState
    this.setState({
        hour: leftTime.slice(0, 2),
        minute: leftTime.slice(3, 5),
        second: leftTime.slice(6, 8),
    });
};
```
