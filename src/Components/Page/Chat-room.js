import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

const Chat_room = () => {
    const [username, setUsername] = useState('username');
    const [target, setTarget] = useState(1);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    let allMessages = []
    let ctr = 0;

    useEffect(() => {
        // load all data
        const getAllMessage = async () => {
            const temp = await axios.get(
                `${process.env.REACT_APP_BASE_API_URL}/api/users/dm/chats/1`, {
                    headers: {
                        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQ0Y29ybmlhIiwiZW1haWwiOiJkNGNvcm5pYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY0ZTYwNDc4N2NiZjE5NDg0MWU3YjY4ZDdjZDI4Nzg2ZjZjOWEwYTNhYjlmOGIwYTBlODdjYjQzODdhYjAxMDciLCJpYXQiOjE2NDEyMDAyNTN9.RhpMRdTdbotaP9HLTVQ-WhE_uRGKtE2y5900xbZT81M'
                    }
                }
            )
            allMessages = temp.data.data
            console.log('load', allMessages)
        }
        getAllMessage()

        // setting up pusher
        Pusher.logToConsole = true;

        var pusher = new Pusher('f1a87665adcea5a04ace', {
            cluster: 'ap1'
        });


        const channel = pusher.subscribe('1'); // channe; ini = dm_relation, seperti ruangan chat
        // didalam channel ini ada getAllMessage
        channel.bind('sendMessage', function (data) {
            allMessages.push(data);
            setMessages(allMessages);
            console.log(allMessages);
        });
    }, []);

    const submit = async (e) => {
        console.log("subit")
        e.preventDefault();

        await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/users/dm/chats`, {
            "dm_relation": 1,
            "target_user_id" : target,
            "message": message
        }, {
            headers: {
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQ0Y29ybmlhIiwiZW1haWwiOiJkNGNvcm5pYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY0ZTYwNDc4N2NiZjE5NDg0MWU3YjY4ZDdjZDI4Nzg2ZjZjOWEwYTNhYjlmOGIwYTBlODdjYjQzODdhYjAxMDciLCJpYXQiOjE2NDEyMDAyNTN9.RhpMRdTdbotaP9HLTVQ-WhE_uRGKtE2y5900xbZT81M'
            }
        });

        setMessage('');
    };

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input
                        className="fs-5 fw-semibold"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="fs-5 fw-semibold"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    />
                </div>
                <div className="list-group list-group-flush border-bottom scrollarea">
                    {messages.map(message => {
                        return (
                            <div key={ctr++} className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{message.user_sender_id}</strong>
                                </div>
                                <div className="col-10 mb-1 small">{message.message}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <form onSubmit={(e) => submit(e)}>
                <input
                className="form-control"
                placeholder="Write a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Chat_room;
