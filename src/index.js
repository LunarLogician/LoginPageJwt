import bodyParser from 'body-parser';
import router from './routes/router.js';
import express from 'express';
import { fileURLToPath } from 'url';
import Logincol from './model/db.js';
import bcrypt from 'bcrypt';
import path from 'path';
import { register } from 'module';
import jwt from 'jsonwebtoken';
import { fail } from 'assert';
import dotenv from 'dotenv';
import auth from '../middleware/auth.js';
import cookieParser from 'cookie-parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paath=path.join(__dirname,"../templates/views")


const app = express();
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.set('view engine', 'ejs'); 
app.set('views', paath); 
app.use(cookieParser());
app.use(router);
const port = process.env.PORT || 3000;


app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/registeruser", async (req, res) => {
    const { username, email, password, cpassword } = req.body; 
    if (password === cpassword) {
        const savedData = new Logincol({
            username: username,
            email: email,
            password: password 
        });
        
const token = await savedData.generateAuthToken();
res.cookie("jwt",token,{
    expires : new Date(Date.now()+3 ),
    httpOnly : true
})
 

        savedData.save()
            .then(() => {
                res.render("home"); 
            })
            .catch((e) => {
                res.render("error", { errorMessage: e.message }); 
            });

    } else {
        const errorMessage = "Registration failed: Passwords do not match.";
        res.render("fail", { errorMessage }); 
    }
});




router.get("/secret", auth, (req, res) => {
 
    const username = req.user.username; 
    res.render("secret", { username });
});

app.get("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.cookies.jwt);
        await req.user.save(); // Ensure you save the user after removing the token

        res.clearCookie("jwt");
        console.log("Logout successful");
        res.render("home");
    } catch (e) {
        res.render("error", { errorMessage: e.message });
    }
});



app.get("/login",(req,res)=>{

    res.render("Login")
})


app.post("/userlogin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Logincol.findOne({ email: email.trim() });
        if (user) {
            const isMatch = await bcrypt.compare(password.trim(), user.password);
            if (isMatch) {
                const token = await user.generateAuthToken();
                res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.render("home", { message: "Login successful!" });
            } else {
                res.render("fail", { message: "Incorrect password" });
            }
        } else {
            res.render("fail", { message: "Email not found" });
        }
    } catch (error) {
        res.render("fail", { message: "An error occurred during login" });
    }
});






app.get("/more",(req,res)=>{
  
    res.render("more")
})



app.listen(port, () => {
    console.log('Server is running on port 3000');
}
)  