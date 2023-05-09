import express from 'express';
import {registerValidation, loginValidation} from "./validations.js";
import * as UserController from './Controllers/UserController.js'
import checkAuth from "./Middleware/checkAuth.js";
import Config from "./Config/Enviroments.js";

const app = express();
app.use(express.json());

app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login',  loginValidation, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

const PORT = Config.appPort || 4444;
app.listen(PORT,(err) => {
    if(err) {
        return console.log(err)
    }
    console.log('Server was running on Port ' + PORT);
});
