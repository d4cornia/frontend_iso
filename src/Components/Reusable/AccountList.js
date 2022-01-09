import React, { useState, useEffect } from 'react';
import { Image, Video } from 'cloudinary-react';
import '../../css/components/AccountList.css';

function AccountList(props) {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    // setOnlineStatus();
    setAccounts(props.accounts);
    console.log(props.accounts);
  }, []);
  const setOnlineStatus = () => {
    // Axios Get Online
  };

  return (
    <div className="accountlists-container">
      <div className="accountlists-header">
        <p className="accountlists-header_title fw-bold">{props.title}</p>
        <p className="accountlists-header_subtitle text-muted fw-bold text_small">
          {props.subtitle}
        </p>
      </div>
      <div className="accountlists-content">
        {accounts.map((account, index) => {
          return (
            <div
              className={`accountlists-content_item ${
                index === props.selectedIndex ? 'selected' : ''
              }`}
              onClick={() => {
                props.Clicked(account);
              }}>
              <div className="accountlists-content_item-image">
                <Image
                  cloud_name={'projekiso'}
                  publicId={`user/profiles/${account.image_id}`}
                  fetch-format="auto"
                  quality="auto"
                  className="accountlists-content_item-image_content"
                />
              </div>
              <div className="accountlists-content_item-detail">
                <div className="accountlists-content_item-detail_title fw-bold">
                  <div
                    className={`accountlists-content_item-detail_online-status ${
                      account.onlineStatus ? 'online' : 'offline'
                    }`}></div>
                  {account.username}
                </div>
                <div className="accountlists-content_item-detail_subtitle text-muted fw-bold text_small">
                  {account.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AccountList;
