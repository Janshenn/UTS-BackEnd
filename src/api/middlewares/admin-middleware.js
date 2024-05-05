const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('../../core/config');
const { User } = require('../../models');

const { errorResponder, errorTypes } = require('../../core/errors');

// Authenticate user based on the JWT token
passport.use(
  'admin',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: config.secret.jwt,
    },
    async (payload, done) => {
      console.log('wasyu', payload);
      const admin = await User.findOne({ email: payload.email });
      console.log(admin);
      if (admin && admin.role === 'admin') {
        return admin ? done(null, admin) : done(null, false);
      } else {
        return done(
          errorResponder(
            errorTypes.FORBIDDEN,
            "1Your account doesn't have the necessary permissions to access this resource."
          )
        );
      }
    }
  )
);

module.exports = passport.authenticate('admin', { session: false });
