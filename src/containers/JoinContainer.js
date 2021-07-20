import { useEffect } from 'react';
import { useState } from 'react';
import { reqPostJoin } from '../api/apiCall';
import Join from '../pages/Join';

function JoinContainer({ history }) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });
  const [isSame, setIsSame] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const { password, passwordCheck } = userInfo;
    if (passwordCheck.length > 0) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
    if (password === passwordCheck) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [userInfo]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    // setState는 이벤트 핸들러 안에서 비동기로 동작
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const onJoin = async (e) => {
    e.preventDefault();
    try {
      await reqPostJoin(userInfo);
      alert('회원가입이 완료되었습니다.');
      history.push('/login');
    } catch (err) {
      console.log('Join Error 🚫 ', err);
    }
  };

  return (
    <Join
      userInfo={userInfo}
      isSame={isSame}
      isFocus={isFocus}
      onJoin={onJoin}
      onHandleChange={onHandleChange}
    />
  );
}

export default JoinContainer;
