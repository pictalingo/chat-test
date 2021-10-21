import React from "react";
import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import './App.css';


function App() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/messages")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            });
    }, []);

    const [messages, setMessages] = React.useState({
        data: '',
        loading: true
    });

    const [name, setName] = React.useState('')

    const getRoomMessages = async (e, roomId) => {
        console.log(roomId);
        const data = await axios.get('http://localhost:3001/api/chat/' + roomId)
        setMessages({
            data: data,
            loading: false
        })
    }

    return (
        <Router>

            <div className="chat">
                <section className="navigable">
                    <Router>
                        <ul id="big-menu" className="big-menu">
                            {data.map(room => (
                                <li className="undefined jobLink">
                                    <button onClick={(e) => {
                                        getRoomMessages(e, room.roomId);
                                    }} className=" " title="Select room">
                                        {room.roomId}
                                    </button>
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
                        <Route path="/topics">
                            <Topics/>
                        </Route>
                    </Switch>
                </main>
            </div>

        </Router>
    );
}

function MainChat() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function Topics() {
    let match = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>

            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>

            {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic/>
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    let {topicId} = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}


export default App;
