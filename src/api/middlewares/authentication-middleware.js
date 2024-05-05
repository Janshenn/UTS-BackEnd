const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('../../core/config');
const { User } = require('../../models');

const { errorResponder, errorTypes } = require('../../core/errors');

// Authenticate user based on the JWT token
passport.use(
  'user',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: config.secret.jwt,
    },
    async (payload, done) => {
      console.log('payload', payload);
      const user = await User.findOne({ email: payload.email });
      console.log('user', user);
      if (user && user.role === 'user') {
        if (user.account_status === true) {
          return user ? done(null, user) : done(null, false);
        } else {
          return done(
            errorResponder(
              errorTypes.FORBIDDEN,
              'Your account is not activated yet. Please contact the administrator.'
            )
          );
        }
      } else {
        return done(
          errorResponder(
            errorTypes.FORBIDDEN,
            "2Your account doesn't have the necessary permissions to access this resource."
          )
        );
      }
    }
  )
);

module.exports = passport.authenticate('user', { session: false });
