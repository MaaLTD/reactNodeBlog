// для включения функций импортирования включить type = module в package.json или в тэге script
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sanitize, {middleware} from 'sanitize';
import * as sanitizeHtml from 'sanitize-html';
import {validationResult} from "express-validator";
import {registerValidation} from "./validations/auth.js";
import {User} from './Models/User.js';

const app = express();
app.use(express.json());
app.use(sanitize.middleware);


app.get('/', (req, res) => {
    res.send("Hello form backend !!!");
});

app.post('/auth/register', registerValidation, async(req, res) => {
    const errors = validationResult(req);
    sanitize.middleware(req, res);

    if(!errors.isEmpty()) {
        res.status(400).json(errors.array());

    }

    const password = sanitizeHtml(req.body.password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doc = {
        email: sanitize(req.body.email),
        fullName: sanitizeHtml(req.body.fullName),
        avatarUrl: sanitizeHtml(req.body.avatarUrl),
        password : hashedPassword
    };

    const [user, created] = await User.findOrCreate({
        where: {email: req.body.email},
        defaults: doc
    });

    try {
        if(created) {
            const jwToken = jwt.sign({
                    _id: user._id,
                    name: user.fullName
                },
                'secretZeusenko',
                {
                    expiresIn: '30d'
                });
            return res.json({"message": "Welcome you, " + user.fullName, "token": jwToken})
        }
        res.json({"message": "Try to login"});

    } catch (e) {
        console.log(e);
        res.json({"message": "Не удалось зарегестрировать Вас. Обратитесь в службу поддержки."})
    }
});

app.post('/auth/login', (req, res) => {

    const token = jwt.sign({
        email: req.body.email,
        fullName: "Anton Zeusenko"
    }, 'secret123');

    res.json({
        success: true,
        token
    });
});

app.listen(4444,(err) => {
    if(err) {
        return console.log(err)
    }
    console.log('Server is running');
});
