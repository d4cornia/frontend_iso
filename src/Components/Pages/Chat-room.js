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
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('username')));
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('id')));
  const [target, setTarget] = useState([]);
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
    const temp = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/users/dm`, {
      headers: {
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQ0Y29ybmlhIiwiZW1haWwiOiJkNGNvcm5pYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjY0ZTYwNDc4N2NiZjE5NDg0MWU3YjY4ZDdjZDI4Nzg2ZjZjOWEwYTNhYjlmOGIwYTBlODdjYjQzODdhYjAxMDciLCJpYXQiOjE2NDEyMDAyNTN9.RhpMRdTdbotaP9HLTVQ-WhE_uRGKtE2y5900xbZT81M'
      }
    })
    .then((res) => {
      console.log(res)
      for (let i = 0; i < res.data.data.length; i++) {
        setRooms([
          ...rooms,
          {
            id: res.data.data[i].id,
            username: res.data.data[i].target_user.username,
            subtitle:  res.data.data[i].lastChat.message,
            image_id: res.data.data[i].target_user.image_id,
            followersCtr: res.data.data[i].target_user.followersCtr, 
            chats: res.data.data[i].chats
          }
        ])
      }
    });

    // setRooms([
    //   ...rooms,
    //   {
    //     id: 1,
    //     username: 'Yosuu',
    //     subtitle: 'Ini adalah pesan terakhir yang sudah kuberikan kepada anda seorang',
    //     image_id: 'default-user'
    //   }
    // ]);
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
    setTarget(data)
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
    <div className="content-container chatroom full-height">
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
              selectedId={target.id}
              Clicked={roomClick}
              childClassName="room-item"
            />
          </div>
        </div>
        {target && Object.keys(target).length !== 0 && (
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
                <div className="chat-header_detail-title fw-bold">{target.username}</div>
                <div className="chat-header_detail-subtitle text-muted fw-bold text_small">
                  {`${target.followersCtr} followers`}
                </div>
              </div>
            </div>
            <div className="chat-wrapper">
              {target.chats.map((chat) => {
                return (
                  <div className="chat-bubble-section">
                      <div className="timespan fw-bold text_small text-center">{chat.momentDate}</div>
                      
                      {chat.value.map((chatValue) => {
                        if(chatValue.user_sender_id == userId){
                          return (
                            <div className="chat-bubble-wrapper right">
                              <div className="chat-bubble">
                                {chatValue.message}
                              </div>
                              <p className="text-muted text_small fw-bold chat-bubble-created">{chatValue.moment}</p>
                            </div>
                          )
                        } else {
                          return (
                            <div className="chat-bubble-wrapper left">
                              <div className="chat-bubble">
                                {chatValue.message}
                              </div>
                              <p className="text-muted text_small fw-bold chat-bubble-created">{chatValue.moment}</p>
                            </div>
                          )
                        }
                      })}
                </div>
                )
              })}
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
        )}
        {target && Object.keys(target).length === 0 && (
          <div className="empty-chat">
            <svg
              className="empty-chat-icon"
              viewBox="0 0 97 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M48.5001 9.09375C41.6563 9.09323 34.9303 10.8751 28.9845 14.2639C23.0386 17.6527 18.0778 22.5316 14.5905 28.4203C11.1032 34.3089 9.20962 41.0043 9.09623 47.8471C8.98284 54.69 10.6535 61.4444 13.9438 67.4453L10.7231 78.7746C10.4202 79.8171 10.401 80.9215 10.6674 81.9739C10.9338 83.0263 11.4763 83.9886 12.2387 84.7613C13.0011 85.5274 13.9567 86.0728 15.0041 86.3397C16.0515 86.6065 17.1515 86.5849 18.1876 86.277L29.5548 83.0563C34.8226 85.9435 40.6809 87.5882 46.6818 87.8645C52.6826 88.1409 58.6673 87.0416 64.1782 84.6508C69.6892 82.2599 74.5805 78.6407 78.4785 74.0699C82.3765 69.499 85.1778 64.0975 86.6684 58.2781C88.159 52.4588 88.2995 46.3757 87.079 40.4937C85.8584 34.6118 83.3093 29.0867 79.6264 24.3409C75.9435 19.595 71.2243 15.754 65.8296 13.1114C60.4348 10.4688 54.5073 9.09458 48.5001 9.09375V9.09375ZM30.3126 53.0469C29.4133 53.0469 28.5342 52.7802 27.7865 52.2806C27.0387 51.781 26.4559 51.0709 26.1118 50.24C25.7677 49.4092 25.6776 48.495 25.8531 47.613C26.0285 46.7309 26.4615 45.9208 27.0974 45.2849C27.7333 44.649 28.5435 44.2159 29.4255 44.0405C30.3075 43.8651 31.2217 43.9551 32.0526 44.2992C32.8834 44.6434 33.5935 45.2262 34.0932 45.9739C34.5928 46.7216 34.8594 47.6007 34.8594 48.5C34.8594 49.7059 34.3804 50.8624 33.5277 51.7151C32.675 52.5678 31.5185 53.0469 30.3126 53.0469ZM48.5001 53.0469C47.6008 53.0469 46.7217 52.7802 45.974 52.2806C45.2262 51.781 44.6434 51.0709 44.2993 50.24C43.9552 49.4092 43.8651 48.495 44.0406 47.613C44.216 46.7309 44.649 45.9208 45.2849 45.2849C45.9208 44.649 46.731 44.2159 47.613 44.0405C48.495 43.8651 49.4092 43.9551 50.2401 44.2992C51.0709 44.6434 51.781 45.2262 52.2806 45.9739C52.7803 46.7216 53.0469 47.6007 53.0469 48.5C53.0469 49.7059 52.5679 50.8624 51.7152 51.7151C50.8625 52.5678 49.706 53.0469 48.5001 53.0469ZM66.6876 53.0469C65.7883 53.0469 64.9092 52.7802 64.1615 52.2806C63.4137 51.781 62.8309 51.0709 62.4868 50.24C62.1427 49.4092 62.0526 48.495 62.2281 47.613C62.4035 46.7309 62.8365 45.9208 63.4724 45.2849C64.1083 44.649 64.9185 44.2159 65.8005 44.0405C66.6825 43.8651 67.5967 43.9551 68.4276 44.2992C69.2584 44.6434 69.9685 45.2262 70.4682 45.9739C70.9678 46.7216 71.2344 47.6007 71.2344 48.5C71.2344 49.7059 70.7554 50.8624 69.9027 51.7151C69.05 52.5678 67.8935 53.0469 66.6876 53.0469Z"
                fill="#111111"
              />
            </svg>
          </div>
        )}
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
