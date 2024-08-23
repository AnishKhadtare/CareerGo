import { Router } from "express";
import passport from "passport";

const router = Router();

router.route("/google/callback").post(
    passport.authenticate("google",
        {
            failureRedirect : "/login"
        }
    ), (req, res) => {
        res.redirect("/");
    }
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

export default router;