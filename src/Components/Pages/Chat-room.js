import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import { Image, Video } from 'cloudinary-react';

// Assets
import '../../css/chat-room.css';

// Components
import AccountList from '../Reusable/AccountList';

const Chat_room = () => {
  // Variables
  const [username, setUsername] = useState('username');
  const [target, setTarget] = useState(1);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const pusher = new Pusher('f1a87665adcea5a04ace', {
    cluster: 'ap1'
  });
  // setting up pusher
  Pusher.logToConsole = true;

  let allMessages = [];
  let ctr = 0;

  useEffect(() => {
    // load all data
    // getAllMessage();
    getRooms();
  }, []);

  // AXIOS

  const getAllMessage = async () => {
    const temp = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/users/dm/chats/`, {
      headers: {
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQ0Y29ybmlhIiwiZW1haWwiOiJkNGNvcm5pYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY0ZTYwNDc4N2NiZjE5NDg0MWU3YjY4ZDdjZDI4Nzg2ZjZjOWEwYTNhYjlmOGIwYTBlODdjYjQzODdhYjAxMDciLCJpYXQiOjE2NDEyMDAyNTN9.RhpMRdTdbotaP9HLTVQ-WhE_uRGKtE2y5900xbZT81M'
      }
    });
    allMessages = temp.data.data;
    console.log('load', allMessages);
  };

  const getRooms = async () => {
    const temp = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/users/dm/chats/`, {
      headers: {
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQ0Y29ybmlhIiwiZW1haWwiOiJkNGNvcm5pYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY0ZTYwNDc4N2NiZjE5NDg0MWU3YjY4ZDdjZDI4Nzg2ZjZjOWEwYTNhYjlmOGIwYTBlODdjYjQzODdhYjAxMDciLCJpYXQiOjE2NDEyMDAyNTN9.RhpMRdTdbotaP9HLTVQ-WhE_uRGKtE2y5900xbZT81M'
      }
    })
    .then((res) => {
      console.log(res);
    });

    setRooms([
      ...rooms,
      {
        id: 1,
        username: 'Yosuu',
        subtitle: 'Ini adalah pesan terakhir yang sudah kuberikan kepada anda seorang',
        image_id: 'default-user'
      }
    ]);
  };

  // HANDLER

  const channel = pusher.subscribe('1'); // channe; ini = dm_relation, seperti ruangan chat
  // didalam channel ini ada getAllMessage
  channel.bind('sendMessage', function (data) {
    allMessages.push(data);
    setMessages(allMessages);
    console.log(allMessages);
  });

  const roomClick = (data) => {
    console.log('clicking', data);
  };
  // await axios.post(
  //   `${process.env.REACT_APP_BASE_API_URL}/api/users/dm/chats`,
  //   {
  //     dm_relation: 1,
  //     target_user_id: target,
  //     message: message
  //   },
  //   {
  //     headers: {
  //       'x-auth-token':
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQ0Y29ybmlhIiwiZW1haWwiOiJkNGNvcm5pYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY0ZTYwNDc4N2NiZjE5NDg0MWU3YjY4ZDdjZDI4Nzg2ZjZjOWEwYTNhYjlmOGIwYTBlODdjYjQzODdhYjAxMDciLCJpYXQiOjE2NDEyMDAyNTN9.RhpMRdTdbotaP9HLTVQ-WhE_uRGKtE2y5900xbZT81M'
  //     }
  //   }
  // );

  // setMessage('');

  const sendMessage = async () => {
    const textValue = document.querySelector('.chat-input').value;

    await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/dm/chat/send`,
        {
          dm_relation: '',
          target_user_id: target,
          message: textValue
        },
        {
          headers: {
            'x-auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQ0Y29ybmlhIiwiZW1haWwiOiJkNGNvcm5pYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY0ZTYwNDc4N2NiZjE5NDg0MWU3YjY4ZDdjZDI4Nzg2ZjZjOWEwYTNhYjlmOGIwYTBlODdjYjQzODdhYjAxMDciLCJpYXQiOjE2NDEyMDAyNTN9.RhpMRdTdbotaP9HLTVQ-WhE_uRGKtE2y5900xbZT81M'
          }
        }
      );
  };

  const onKeyDown = (e) => {
    console.log(e.keyCode);
    const input = document.querySelector('.chat-input');
    const el = document.querySelector('.chat-input-container');

    if (e.keyCode === 13) {
      // Enter
      e.preventDefault();

      const isShifting = input.getAttribute('data-shift') === '1';
      if (isShifting) {
        // value input jadi ke bawah
        input.value += '\r\n';

        // Scroll ikut turun
        input.scrollTop = input.scrollHeight - input.clientHeight;
      } else sendMessage();
      // sendMessage();
    } else if (e.keyCode === 16) {
      //Shift
      input.setAttribute('data-shift', 1);
    }
  };

  const onKeyUp = (e) => {
    const input = document.querySelector('.chat-input');
    const el = document.querySelector('.chat-input-container');
    const currHeight = el.offsetHeight;
    // Tambah tinggi jika ada line baru
    if (currHeight < 10 * 16 && input.scrollHeight > input.clientHeight) {
      el.style.height = parseInt(currHeight) + 16 + 'px';
    }

    if (e.keyCode === 16) {
      input.setAttribute('data-shift', 0);
    } else if (e.keyCode === 8) {
      const currHeight = el.offsetHeight;
      //Backspace
      if (input.value.length === 0) el.style.height = 16 * 4 + 'px';
      else if (input.clientHeight === input.scrollHeight && el.clientHeight > 16 * 4) {
        el.style.height = parseInt(currHeight) - 16 + 'px';
      }
    }
  };

  return (
    <div className="content-container chatroom">
      <div className="content-wrapper">
        <div className="rooms-container" tabIndex={0}>
          <div className="room-container-expander">
            <svg
              className="expander-icon"
              viewBox="0 0 103 103"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M57.2222 28.6111H52.53C46.1783 28.6111 40.0556 35.4778 40.0556 40.9711V51.5L22.8889 68.6667V51.5H11.4444C5.15 51.5 0 46.35 0 40.0556V11.4444C0 5.15 5.15 0 11.4444 0H45.7778C52.0722 0 57.2222 5.15 57.2222 11.4444V28.6111ZM57.2222 34.3333H91.5556C97.85 34.3333 103 39.4833 103 45.7778V74.3889C103 80.6833 97.85 85.8333 91.5556 85.8333H80.1111V103L62.9444 85.8333H57.2222C50.9278 85.8333 45.7778 80.6833 45.7778 74.3889V45.7778C45.7778 39.4833 50.9278 34.3333 57.2222 34.3333Z"
                fill="#111111"
              />
            </svg>
          </div>
          <div className="room-wrapper">
            <AccountList
              accounts={rooms}
              key={rooms.length}
              title="Direct Messages"
              subtitle="100 new messages"
              selectedIndex={0}
              Clicked={roomClick}
            />
          </div>
        </div>
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header_image">
              <Image
                cloud_name={'projekiso'}
                publicId={`user/profiles/default-user`}
                fetch-format="auto"
                quality="auto"
                className="chat-header_image-content"
              />
            </div>
            <div className="chat-header_detail">
              <div className="chat-header_detail-title fw-bold">{'Daviddd'}</div>
              <div className="chat-header_detail-subtitle text-muted fw-bold text_small">
                {'1.3k followers'}
              </div>
            </div>
          </div>
          <div className="chat-wrapper">
            <div className="chat-bubble-section">
              <div className="timespan fw-bold text_small text-center">Yesterday</div>
              <div className="chat-bubble-wrapper left">
                <div className="chat-bubble">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, reprehenderit
                  cupiditate vel magni dolores velit officia dolore vero expedita nisi!
                </div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper right">
                <div className="chat-bubble">Lorem ipsum dolor sit amet.</div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper left">
                <div className="chat-bubble">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, reprehenderit
                  cupiditate vel magni dolores velit officia dolore vero expedita nisi!
                </div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper right">
                <div className="chat-bubble">Lorem ipsum dolor sit amet.</div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper left">
                <div className="chat-bubble">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, reprehenderit
                  cupiditate vel magni dolores velit officia dolore vero expedita nisi!
                </div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper right">
                <div className="chat-bubble">Lorem ipsum dolor sit amet.</div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
            </div>
            <div className="chat-bubble-section">
              <div className="timespan fw-bold text_small text-center">Today</div>
              <div className="chat-bubble-wrapper left">
                <div className="chat-bubble">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, reprehenderit
                  cupiditate vel magni dolores velit officia dolore vero expedita nisi!
                </div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper right">
                <div className="chat-bubble">Lorem ipsum dolor sit amet.</div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper left">
                <div className="chat-bubble">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, reprehenderit
                  cupiditate vel magni dolores velit officia dolore vero expedita nisi!
                </div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper right">
                <div className="chat-bubble">Lorem ipsum dolor sit amet.</div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper left">
                <div className="chat-bubble">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, reprehenderit
                  cupiditate vel magni dolores velit officia dolore vero expedita nisi!
                </div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
              <div className="chat-bubble-wrapper right">
                <div className="chat-bubble">Lorem ipsum dolor sit amet.</div>
                <p className="text-muted text_small fw-bold chat-bubble-created">1m ago</p>
              </div>
            </div>
          </div>
          <div className="chat-input-container">
            <form
              action="#"
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <textarea
                className="form-control chat-input"
                placeholder="Type here..."
                name="chat"
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}></textarea>
              <svg
                onClick={sendMessage}
                className="send-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.426 11.095L4.42601 3.09504C4.25482 3.0145 4.0643 2.98416 3.87657 3.00756C3.68883 3.03095 3.51158 3.10713 3.36541 3.22723C3.21923 3.34733 3.11012 3.50644 3.05076 3.68607C2.99139 3.8657 2.98419 4.05849 3.03001 4.24205L4.24201 9.09104L12 12L4.24201 14.909L3.03001 19.758C2.98333 19.9417 2.98992 20.1349 3.04902 20.315C3.10811 20.4951 3.21726 20.6546 3.3637 20.7749C3.51014 20.8953 3.68782 20.9714 3.87594 20.9944C4.06406 21.0175 4.25486 20.9865 4.42601 20.905L21.426 12.905C21.5978 12.8243 21.7431 12.6963 21.8448 12.536C21.9466 12.3758 22.0006 12.1899 22.0006 12C22.0006 11.8102 21.9466 11.6243 21.8448 11.464C21.7431 11.3038 21.5978 11.1758 21.426 11.095V11.095Z"
                  fill="#111111"
                />
              </svg>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
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
            </form> */}
    </div>
  );
};

export default Chat_room;
