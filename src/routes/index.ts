import { Router, Request, Response } from "express";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

declare module "express-session" {
    interface SessionData {
        user: { [key: string]: any };
    }
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
    if (req.session.user) {
        return res.redirect("/home");
    }
    res.render("index", { title: "Login" });
});

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        req.session.user = userCredential.user;
        res.redirect("/home");
    } catch (error) {
        res.render("index", { title: "Login", error: (error as Error).message });
    }
});

router.get("/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

router.get("/home", (req: Request, res: Response) => {
    if (!req.session.user) {
        return res.redirect("/");
    }
    res.render("home", { title: "Home" });
});

export default router;