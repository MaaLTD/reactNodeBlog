import express from 'express';
import {registerValidation} from "./validations/auth.js";
import * as UserController from './Controllers/UserController.js'
import checkAuth from "./Middleware/checkAuth.js";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello form backend !!!");
});

app.post('/auth/register', registerValidation, UserController.register);

app.post('/auth/login',  UserController.login);

app.get('/auth/me', checkAuth, UserController.getMe);

const PORT = process.env.APP_PORT || 4444;
app.listen(PORT,(err) => {
    if(err) {
        return console.log(err)
    }
    console.log('Server is running on Port ' + PORT);
});
