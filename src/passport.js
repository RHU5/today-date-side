import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User';
import { getHashBySalt } from './utils/util';

async function validPassword(password, salt, hash) {
  try {
    const passwordHash = await getHashBySalt(password, salt);
    return passwordHash === hash ? true : false;
  } catch (err) {
    console.log('validPassword Error ๐ซ ', err);
  }
}

function passportConfig() {
  // passport.authenticate() ๋ฉ์๋๋ก ์๋ ๋ก์ปฌ ์ ๋ต์ ํตํด
  // ์ ์ ๊ฐ ์กด์ฌํ๋์ง, ๋น๋ฐ๋ฒํธ๊ฐ ์ผ์นํ๋์ง ์ธ์ฆ์ ๊ฑฐ์นจ
  passport.use(
    new LocalStrategy(
      // ํด๋ผ์ด์ธํธ์์ ๋์ด์ค๋ ํ๋๊ฐ์ผ๋ก ๋ณ๊ฒฝ
      { usernameField: 'email', passwordField: 'password' },
      async function (email, password, done) {
        try {
          // ์๋ ฅ ๋ฐ์ email์ด DB์ ์กด์ฌํ๋์ง ํ์ธ
          const isUser = await User.findOne({ email });
          if (!isUser) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          // ์๋ ฅ ๋ฐ์ password๋ฅผ ์ํธํํ ๊ฒ๊ณผ DB์ ๊ฒ๊ณผ ๊ฐ์์ง ํ์ธ
          const isValid = await validPassword(
            password,
            isUser.salt,
            isUser.hash,
          );
          if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, isUser);
        } catch (err) {
          console.log('LocalStrategy Error ๐ซ ', err);
          return done(err);
        }
      },
    ),
  );

  // ์ธ์ฆ ๊ณผ์ ์ ๊ฑฐ์น ํ User data์ ๊ณ ์  ID๋ก ์ธ์ ID ์์ฑ
  passport.serializeUser(function (user, done) {
    console.log('์ธ์ ID ์์ฑ');
    done(null, user._id);
  });

  // ์ธ์ ID๋ฅผ ๋ค์ User data์ ๊ณ ์  ID๋ก ๋ณ๊ฒฝ
  passport.deserializeUser(async function (id, done) {
    console.log('์ธ์ ID ํด์ ๋ฐ ๋ณํ');
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.log('deserial Error ๐ซ ', err);
      return done(err);
    }
  });
}

export default passportConfig;
