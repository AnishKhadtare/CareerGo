import passport from "passport";
import { User } from "../models/user.model.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async(refreshToken, accessToken, profile, done) => {
            try {
                const role = req.body;
                const user = await User.findOne({googleId : profile.id});
                if(!user){
                    user = await User.create({
                        googleId : profile.id,
                        email : profile.emails[0].value,
                        firstName : profile.name.givenName,
                        lastName : profile.name.familyName,
                        role,
                        profilePic : profile.photos[0].value,
                        refreshToken,
                    })
                }
                return done(null, user)
            }
            catch (error) {
                return done(error, false);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
});