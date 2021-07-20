import passport from 'passport';
import User from '../models/User';
import { getHashAndSalt } from '../utils/util';

// 회원가입 로직
export const resPostJoin = async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    const [salt, hash] = await getHashAndSalt(password);
    const newUser = new User({
      email,
      salt,
      hash,
      nickname,
    });
    await newUser.save();
    res.send('Join Success!');
  } catch (err) {
    console.log('resPostJoin Error 🚫 ', err);
  }
};

// 로그인 로직
export const resPostLogin = (req, res, next) => {
  // passport.js에 정의되어 있는 local 전략에 따른 유효성 검사 진행
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.send({ isLoggedIn: false });
    }
    // serializer & deserializer 함수 실행
    req.logIn(user, function (err) {
      if (err) {
        next(err);
      }
      res.send({ isLoggedIn: true });
    });
  })(req, res, next);
};

export const resGetLogout = (req, res) => {
  req.session.destroy();
  req.logout();
  res.clearCookie('session_id');
  res.send('Logout Success!');
};

export const resGetUser = (req, res) => {
  res.send(req.user);
};
