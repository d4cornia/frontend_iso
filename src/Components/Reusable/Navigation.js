import { useRef } from 'react';
import 'css/components/Navigation.css';
import CustomInput from './CustomInput';
import LogoText from './LogoText';
import profilImage from 'Image/profil.jpg';

const Navigation = (props) => {
  const search = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchText = search.current.value;
    const postfix = searchText[0] === '#' ? 'by=tag' : 'by=name';
    const searchUrl = `/search?post=${searchText}&${postfix}`;
    console.log('url', searchUrl);
  };

  return (
    <div className="navigation-container">
      <div className="navigation-wrapper">
        <div className="notification-popup">
          <h5>NOTIFICATION</h5>
          <div className="notification-content">
            <img className={'card-head_image'} src={profilImage} alt="Profil Image" />
            <div className="card-head_profile">
              <p className="card-head_profile-followers text_small fw-bold text-muted" style={{"margin-left": "1rem"}}>
                <b>joesentosa1511</b> Started following you! 
              </p>
            </div>
          </div>
          <hr />
          <div className="notification-content">
            <img className={'card-head_image'} src={profilImage} alt="Profil Image" />
            <div className="card-head_profile">
              <p className="card-head_profile-followers text_small fw-bold text-muted" style={{"margin-left": "1rem"}}>
                <b>joesentosa1511</b> Started following you! 
              </p>
            </div>
          </div>
        </div>
        <LogoText className="nav-logo" />
        <form action="#" method="post" className="form-search" onSubmit={handleSubmit}>
          <CustomInput ref={search} placeholder="Search" name="search" />
          <div className="searchButton" onClick={handleSubmit}>
            <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_57_59)">
                <path
                  d="M505 442.7L405.3 343C400.8 338.5 394.7 336 388.3 336H372C399.6 300.7 416 256.3 416 208C416 93.1 322.9 0 208 0C93.1 0 0 93.1 0 208C0 322.9 93.1 416 208 416C256.3 416 300.7 399.6 336 372V388.3C336 394.7 338.5 400.8 343 405.3L442.7 505C452.1 514.4 467.3 514.4 476.6 505L504.9 476.7C514.3 467.3 514.3 452.1 505 442.7ZM208 336C137.3 336 80 278.8 80 208C80 137.3 137.2 80 208 80C278.7 80 336 137.2 336 208C336 278.7 278.8 336 208 336Z"
                  fill="#212121"
                />
              </g>
              <defs>
                <clipPath id="clip0_57_59">
                  <rect width="512" height="512" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </form>
        <ul className="navigation-links">
          <li
            className={`navigation-link ${props.selected === 'home' ? 'selected' : ''}`}
            id="home">
            <svg
              className="home"
              viewBox="0 0 97 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M76.7917 88.9167H20.2084C19.1365 88.9167 18.1085 88.4909 17.3505 87.7329C16.5926 86.975 16.1667 85.9469 16.1667 84.875V45.9012C16.229 44.9107 16.65 43.9768 17.351 43.2742L45.6426 14.9825C46.018 14.6067 46.4637 14.3086 46.9544 14.1052C47.445 13.9018 47.971 13.7971 48.5021 13.7971C49.0332 13.7971 49.5592 13.9018 50.0498 14.1052C50.5405 14.3086 50.9862 14.6067 51.3616 14.9825L79.6532 43.2742C80.0289 43.6489 80.3266 44.0944 80.5292 44.5848C80.7318 45.0753 80.8352 45.601 80.8334 46.1316V84.875C80.8334 85.9469 80.4076 86.975 79.6496 87.7329C78.8917 88.4909 77.8637 88.9167 76.7917 88.9167ZM48.5001 23.5549L24.2501 47.8049V80.8334H72.7501V47.8049L48.5001 23.5549V23.5549ZM48.5001 72.746C47.5833 71.9436 46.6509 71.1594 45.7032 70.3937L45.5133 70.2401C40.8371 66.4248 35.005 61.6759 35.005 55.771C35.0053 54.8025 35.1989 53.8439 35.5746 52.9513C35.9503 52.0587 36.5003 51.2501 37.1926 50.5729C37.8849 49.8957 38.7054 49.3635 39.6061 49.0075C40.5067 48.6516 41.4694 48.479 42.4376 48.5C43.581 48.4969 44.7121 48.7355 45.7569 49.2001C46.8017 49.6647 47.7365 50.3448 48.5001 51.1958C49.2638 50.345 50.1987 49.665 51.2434 49.2004C52.2881 48.7359 53.4192 48.4972 54.5626 48.5C55.5298 48.4812 56.491 48.6555 57.3901 49.0127C58.2891 49.3698 59.1079 49.9027 59.7985 50.5802C60.4891 51.2576 61.0376 52.0659 61.412 52.9579C61.7865 53.8499 61.9792 54.8076 61.979 55.775C61.979 61.7001 56.1105 66.4814 51.398 70.325L51.1676 70.515C50.2097 71.2991 49.3044 72.0387 48.496 72.7541L48.5001 72.746V72.746Z"
                fill="#111111"
              />
            </svg>
            <svg
              className="home selected"
              viewBox="0 0 97 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M76.7917 88.9167H20.2084C19.1365 88.9167 18.1085 88.4909 17.3505 87.7329C16.5926 86.975 16.1667 85.9469 16.1667 84.875V45.9012C16.229 44.9107 16.65 43.9768 17.351 43.2742L45.6426 14.9825C46.018 14.6067 46.4637 14.3086 46.9544 14.1052C47.445 13.9018 47.971 13.7971 48.5021 13.7971C49.0332 13.7971 49.5592 13.9018 50.0498 14.1052C50.5405 14.3086 50.9862 14.6067 51.3616 14.9825L79.6532 43.2742C80.0289 43.6489 80.3266 44.0944 80.5292 44.5848C80.7318 45.0753 80.8352 45.601 80.8334 46.1316V84.875C80.8334 85.9469 80.4076 86.975 79.6496 87.7329C78.8917 88.4909 77.8637 88.9167 76.7917 88.9167ZM45.9862 70.6282C46.8753 71.3557 47.7362 72.067 48.5001 72.75C49.3084 72.0347 50.2137 71.295 51.1757 70.5109L51.406 70.321C56.1186 66.4774 61.9871 61.6961 61.9871 55.771C61.9868 54.8032 61.7934 53.8453 61.4182 52.9532C61.0431 52.0612 60.4937 51.2529 59.8023 50.5758C59.1109 49.8987 58.2913 49.3663 57.3916 49.0099C56.4919 48.6535 55.5301 48.4801 54.5626 48.5C53.4192 48.497 52.288 48.7355 51.2433 49.2001C50.1985 49.6647 49.2637 50.3448 48.5001 51.1958C47.7366 50.3446 46.8019 49.6643 45.7571 49.1997C44.7122 48.7351 43.581 48.4967 42.4376 48.5C41.4704 48.4812 40.5091 48.6555 39.6101 49.0127C38.7111 49.3698 37.8923 49.9027 37.2017 50.5802C36.5111 51.2576 35.9625 52.0659 35.5881 52.9579C35.2137 53.8499 35.0209 54.8076 35.0211 55.775C35.0211 61.6799 40.8411 66.4289 45.5295 70.2442H45.5254H45.5456L45.6184 70.3048H45.6386L45.6709 70.3816L45.8811 70.5554L45.9336 70.5958H45.9579L45.9862 70.6282Z"
                fill="#111111"
              />
            </svg>
          </li>
          <li
            className={`navigation-link ${props.selected === 'addPost' ? 'selected' : ''}`}
            id="addPost">
            <svg className="add" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.55 24.25C14.55 21.6774 15.572 19.2102 17.3911 17.3911C19.2102 15.572 21.6774 14.55 24.25 14.55H72.75C75.3226 14.55 77.7899 15.572 79.609 17.3911C81.4281 19.2102 82.45 21.6774 82.45 24.25V72.75C82.45 75.3226 81.4281 77.7899 79.609 79.609C77.7899 81.4281 75.3226 82.45 72.75 82.45H24.25C21.6774 82.45 19.2102 81.4281 17.3911 79.609C15.572 77.7899 14.55 75.3226 14.55 72.75V24.25ZM24.25 19.4C22.9637 19.4 21.7301 19.911 20.8206 20.8206C19.911 21.7301 19.4 22.9637 19.4 24.25V72.75C19.4 74.0363 19.911 75.27 20.8206 76.1795C21.7301 77.0891 22.9637 77.6 24.25 77.6H72.75C74.0363 77.6 75.27 77.0891 76.1795 76.1795C77.0891 75.27 77.6 74.0363 77.6 72.75V24.25C77.6 22.9637 77.0891 21.7301 76.1795 20.8206C75.27 19.911 74.0363 19.4 72.75 19.4H24.25ZM48.5 29.1C49.1432 29.1 49.76 29.3555 50.2148 29.8103C50.6696 30.2651 50.925 30.8819 50.925 31.525V46.075H65.475C66.1182 46.075 66.735 46.3305 67.1898 46.7853C67.6446 47.2401 67.9 47.8569 67.9 48.5C67.9 49.1432 67.6446 49.76 67.1898 50.2148C66.735 50.6696 66.1182 50.925 65.475 50.925H50.925V65.475C50.925 66.1182 50.6696 66.735 50.2148 67.1898C49.76 67.6446 49.1432 67.9 48.5 67.9C47.8569 67.9 47.2401 67.6446 46.7853 67.1898C46.3305 66.735 46.075 66.1182 46.075 65.475V50.925H31.525C30.8819 50.925 30.2651 50.6696 29.8103 50.2148C29.3555 49.76 29.1 49.1432 29.1 48.5C29.1 47.8569 29.3555 47.2401 29.8103 46.7853C30.2651 46.3305 30.8819 46.075 31.525 46.075H46.075V31.525C46.075 30.8819 46.3305 30.2651 46.7853 29.8103C47.2401 29.3555 47.8569 29.1 48.5 29.1Z"
                fill="#111111"
              />
            </svg>
            <svg
              className="add selected"
              viewBox="0 0 97 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24.25 14.55C21.6774 14.55 19.2102 15.572 17.3911 17.3911C15.572 19.2102 14.55 21.6774 14.55 24.25V72.75C14.55 75.3226 15.572 77.7899 17.3911 79.609C19.2102 81.4281 21.6774 82.45 24.25 82.45H72.75C75.3226 82.45 77.7899 81.4281 79.609 79.609C81.4281 77.7899 82.45 75.3226 82.45 72.75V24.25C82.45 21.6774 81.4281 19.2102 79.609 17.3911C77.7899 15.572 75.3226 14.55 72.75 14.55H24.25ZM50.925 31.525V46.075H65.475C66.1182 46.075 66.735 46.3305 67.1898 46.7853C67.6446 47.2401 67.9 47.8569 67.9 48.5C67.9 49.1432 67.6446 49.76 67.1898 50.2148C66.735 50.6696 66.1182 50.925 65.475 50.925H50.925V65.475C50.925 66.1182 50.6696 66.735 50.2148 67.1898C49.76 67.6446 49.1432 67.9 48.5 67.9C47.8569 67.9 47.2401 67.6446 46.7853 67.1898C46.3305 66.735 46.075 66.1182 46.075 65.475V50.925H31.525C30.8819 50.925 30.2651 50.6696 29.8103 50.2148C29.3555 49.76 29.1 49.1432 29.1 48.5C29.1 47.8569 29.3555 47.2401 29.8103 46.7853C30.2651 46.3305 30.8819 46.075 31.525 46.075H46.075V31.525C46.075 30.8819 46.3305 30.2651 46.7853 29.8103C47.2401 29.3555 47.8569 29.1 48.5 29.1C49.1432 29.1 49.76 29.3555 50.2148 29.8103C50.6696 30.2651 50.925 30.8819 50.925 31.525V31.525Z"
                fill="#111111"
              />
            </svg>
          </li>
          <li className={`navigation-link ${props.selected === 'dm' ? 'selected' : ''}`} id="DM">
            <svg className="dm" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d={
                  'M48.5001 9.85156C41.7607 9.85266 35.1388 11.616 29.2914 14.9666C23.444 18.3173 18.5744 23.1387 15.1657 28.9525C11.7571 34.7663 9.92801 41.3703 9.85989 48.1093C9.79176 54.8483 11.487 61.488 14.7774 67.3695L11.443 79.0019C11.1707 79.9124 11.1498 80.8795 11.3825 81.8008C11.6152 82.7221 12.0929 83.5633 12.7648 84.2353C13.4367 84.9072 14.2779 85.3848 15.1992 85.6175C16.1206 85.8502 17.0877 85.8293 17.9981 85.557L29.6305 82.2227C34.7848 85.1084 40.532 86.7743 46.4305 87.0924C52.3291 87.4104 58.2221 86.3721 63.6567 84.0572C69.0914 81.7424 73.9231 78.2125 77.7807 73.7389C81.6383 69.2653 84.4191 63.967 85.9094 58.2509C87.3998 52.5349 87.5601 46.5533 86.3779 40.7656C85.1958 34.978 82.7027 29.5384 79.0902 24.8646C75.4777 20.1908 70.8419 16.4073 65.539 13.8048C60.2361 11.2022 54.4072 9.84984 48.5001 9.85156V9.85156ZM48.5001 82.6016C42.3769 82.6186 36.3646 80.9682 31.1083 77.8273C30.7464 77.6342 30.3437 77.5303 29.9336 77.5242C29.7285 77.5091 29.5225 77.5349 29.3274 77.6L16.7477 81.1996C16.616 81.2401 16.4758 81.244 16.3421 81.2108C16.2084 81.1776 16.0863 81.1086 15.9888 81.0112C15.8914 80.9138 15.8224 80.7917 15.7892 80.6579C15.756 80.5242 15.7599 80.384 15.8004 80.2523L19.4 67.6727C19.485 67.3759 19.5087 67.065 19.4696 66.7588C19.4305 66.4527 19.3295 66.1577 19.1727 65.8918C15.3354 59.4198 13.7463 51.8604 14.6529 44.3911C15.5595 36.9218 18.9108 29.9621 24.185 24.5959C29.4591 19.2298 36.3599 15.7586 43.8124 14.723C51.2648 13.6874 58.8506 15.1456 65.388 18.8704C71.9254 22.5952 77.0474 28.3775 79.9562 35.3166C82.8649 42.2557 83.3971 49.9619 81.4699 57.235C79.5426 64.5081 75.2641 70.9396 69.3008 75.5277C63.3374 80.1158 56.0241 82.6029 48.5001 82.6016V82.6016ZM34.1016 48.5C34.1016 49.2494 33.8794 49.982 33.463 50.6051C33.0467 51.2282 32.4549 51.7139 31.7626 52.0006C31.0702 52.2874 30.3083 52.3625 29.5733 52.2163C28.8383 52.0701 28.1632 51.7092 27.6333 51.1793C27.1034 50.6494 26.7425 49.9742 26.5963 49.2392C26.4501 48.5042 26.5251 47.7423 26.8119 47.05C27.0987 46.3576 27.5844 45.7659 28.2075 45.3495C28.8306 44.9332 29.5631 44.7109 30.3126 44.7109C31.3175 44.7109 32.2812 45.1101 32.9918 45.8207C33.7024 46.5313 34.1016 47.4951 34.1016 48.5ZM52.2891 48.5C52.2891 49.2494 52.0669 49.982 51.6505 50.6051C51.2342 51.2282 50.6424 51.7139 49.9501' +
                  '52.0006C49.2577 52.2874 48.4958 52.3625 47.7608 52.2163C47.0258 52.0701 46.3507 51.7092 45.8208 51.1793C45.2909 50.6494 44.93 49.9742 44.7838 49.2392C44.6376 48.5042 44.7126 47.7423 44.9994 47.05C45.2862 46.3576 45.7719 45.7659 46.395 45.3495C47.0181 44.9332 47.7506 44.7109 48.5001 44.7109C49.505 44.7109 50.4687 45.1101 51.1793 45.8207C51.8899 46.5313 52.2891 47.4951 52.2891 48.5ZM70.4766 48.5C70.4766 49.2494 70.2544 49.982 69.838 50.6051C69.4217 51.2282 68.8299 51.7139 68.1376 52.0006C67.4452 52.2874 66.6833 52.3625 65.9483 52.2163C65.2133 52.0701 64.5382 51.7092 64.0083 51.1793C63.4784 50.6494 63.1175 49.9742 62.9713 49.2392C62.8251 48.5042 62.9001 47.7423 63.1869 47.05C63.4737 46.3576 63.9593 45.7659 64.5825 45.3495C65.2056 44.9332 65.9381 44.7109 66.6876 44.7109C67.6925 44.7109 68.6562 45.1101 69.3668 45.8207C70.0774 46.5313 70.4766 47.4951 70.4766 48.5Z'
                }
                fill="#111111"
              />
            </svg>
            <svg
              className="dm selected"
              viewBox="0 0 97 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M48.5001 9.09375C41.6563 9.09323 34.9303 10.8751 28.9845 14.2639C23.0386 17.6527 18.0778 22.5316 14.5905 28.4203C11.1032 34.3089 9.20962 41.0043 9.09623 47.8471C8.98284 54.69 10.6535 61.4444 13.9438 67.4453L10.7231 78.7746C10.4202 79.8171 10.401 80.9215 10.6674 81.9739C10.9338 83.0263 11.4763 83.9886 12.2387 84.7613C13.0011 85.5274 13.9567 86.0728 15.0041 86.3397C16.0515 86.6065 17.1515 86.5849 18.1876 86.277L29.5548 83.0563C34.8226 85.9435 40.6809 87.5882 46.6818 87.8645C52.6826 88.1409 58.6673 87.0416 64.1782 84.6508C69.6892 82.2599 74.5805 78.6407 78.4785 74.0699C82.3765 69.499 85.1778 64.0975 86.6684 58.2781C88.159 52.4588 88.2995 46.3757 87.079 40.4937C85.8584 34.6118 83.3093 29.0867 79.6264 24.3409C75.9435 19.595 71.2243 15.754 65.8296 13.1114C60.4348 10.4688 54.5073 9.09458 48.5001 9.09375V9.09375ZM30.3126 53.0469C29.4133 53.0469 28.5342 52.7802 27.7865 52.2806C27.0387 51.781 26.4559 51.0709 26.1118 50.24C25.7677 49.4092 25.6776 48.495 25.8531 47.613C26.0285 46.7309 26.4615 45.9208 27.0974 45.2849C27.7333 44.649 28.5435 44.2159 29.4255 44.0405C30.3075 43.8651 31.2217 43.9551 32.0526 44.2992C32.8834 44.6434 33.5935 45.2262 34.0932 45.9739C34.5928 46.7216 34.8594 47.6007 34.8594 48.5C34.8594 49.7059 34.3804 50.8624 33.5277 51.7151C32.675 52.5678 31.5185 53.0469 30.3126 53.0469ZM48.5001 53.0469C47.6008 53.0469 46.7217 52.7802 45.974 52.2806C45.2262 51.781 44.6434 51.0709 44.2993 50.24C43.9552 49.4092 43.8651 48.495 44.0406 47.613C44.216 46.7309 44.649 45.9208 45.2849 45.2849C45.9208 44.649 46.731 44.2159 47.613 44.0405C48.495 43.8651 49.4092 43.9551 50.2401 44.2992C51.0709 44.6434 51.781 45.2262 52.2806 45.9739C52.7803 46.7216 53.0469 47.6007 53.0469 48.5C53.0469 49.7059 52.5679 50.8624 51.7152 51.7151C50.8625 52.5678 49.706 53.0469 48.5001 53.0469ZM66.6876 53.0469C65.7883 53.0469 64.9092 52.7802 64.1615 52.2806C63.4137 51.781 62.8309 51.0709 62.4868 50.24C62.1427 49.4092 62.0526 48.495 62.2281 47.613C62.4035 46.7309 62.8365 45.9208 63.4724 45.2849C64.1083 44.649 64.9185 44.2159 65.8005 44.0405C66.6825 43.8651 67.5967 43.9551 68.4276 44.2992C69.2584 44.6434 69.9685 45.2262 70.4682 45.9739C70.9678 46.7216 71.2344 47.6007 71.2344 48.5C71.2344 49.7059 70.7554 50.8624 69.9027 51.7151C69.05 52.5678 67.8935 53.0469 66.6876 53.0469Z"
                fill="#111111"
              />
            </svg>
          </li>
          <div className="profile-container">
            <img src={props.profileImage} alt="Profile" className="profile-img" />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
