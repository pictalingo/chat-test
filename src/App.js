import React from "react";
import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    useParams
} from "react-router-dom";

import './App.css';


function App() {

    const [selectedRoom, setSelectedRoom] = React.useState(null);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/messages")
            .then((res) => res.json())
            .then((data) => {
                setSelectedRoom(+localStorage.getItem('selectedRoomId'));
                setData(data)
            });
    }, []);

    return (
        <Router>

            <div className="chat">
                <section className="navigable">
                    <Router>
                        <div className="logo-holder">
                            <a href="/root/home">
                                <img src="//app.workiz.com/_assets/img/workizlogo370.png" alt=""/>
                            </a>
                        </div>
                        <ul id="big-menu" className="big-menu">
                            {data.map(room => (
                                <li className={"jobLink" + (selectedRoom === room.roomId ? ' selected' : '')}
                                    key={'room-id-' + room.roomId}>
                                    <a href={"/room/" + room.roomId}>
                                        <span className="nameCircle">
                                            <span className="_smalMenuMsgFirst">{room.fromName.charAt(0)}</span>
                                        </span>
                                        <strong>{room.fromName}</strong><br/>
                                        <small>{room.fromNumber}</small>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Router>
                </section>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainChat/>
                        </Route>
                        <Route path="/room">
                            <Rooms/>
                        </Route>
                    </Switch>
                </main>
            </div>

        </Router>
    );
}

function MainChat() {

    return (
        <div className="choose-room">
            <h5>Please select chat to show messages</h5>
        </div>
    );
}

function Rooms() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:roomId`}>
                <Room/>
            </Route>
        </Switch>
    );
}

function Room() {

    let {roomId} = useParams();
    localStorage.setItem('selectedRoomId', roomId);

    return (
        <Router>
            <Messages roomId={roomId}/>
        </Router>
    );
}


class Messages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            time: null,
            roomId: props.roomId,
            text: localStorage.getItem('roomMessages' + props.roomId) || ''
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.getMessages(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getMessages() {

        axios.get('/api/chat/' + this.state.roomId).then((res) => {
            let text = this.state.text.toString() + `<div class="chat-message ${res.data.direction.toString()}">${res.data.body.toString()}</div>`;
            localStorage.setItem('roomMessages' + this.state.roomId, text.toString());
            this.setState({text});
        });

        let time = new Date().toTimeString();
        this.setState({time});
    }

    render() {
        return (
            <div className="chat-wrapper" dangerouslySetInnerHTML={{__html: this.state.text}}></div>
        );
    }

}

export default App;
