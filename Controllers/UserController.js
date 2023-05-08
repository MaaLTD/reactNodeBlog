import {User} from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator";

export const register = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doc = {
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        password : hashedPassword
    };

    const [user, created] = await User.findOrCreate({
        where: {email: req.body.email},
        defaults: doc
    });

    try {
        if(created) {
            const token = jwt.sign({
                    _id: user._id
                },
                process.env.APP_SECRET_KEY,
                {
                    expiresIn: '30d'
                });
            return res.status(201).json({"message": "Welcome you, " + user.fullName, "token": token})
        }
    } catch (e) {
        console.log(e);
        res.json({"message": "Не удалось зарегестрировать Вас. Обратитесь в службу поддержки."})
    }
};
export const login = async (req, res) => {
    const user = await User.findOne({where: {email: req.body.email}});
    if(user) {
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (isValidPassword) {
            const token = jwt.sign({
                    _id: user._id
                },
                process.env.APP_SECRET_KEY,
                {
                    expiresIn: '30d'
                });

            return res.status(202).json({
                "message": user.fullName + ", добро пожаловать!",
                "token" : token
            });
        }
    }
    res.status(401).json({
        "message": "Логин или пароль введен не верно"
    });
};
export const getMe = async (req, res) => {
    const userId = req.userId;
    const user = await User.findOne({where: {_id: userId}});

    res.status(200).json({reqs: user});
    // res.json({userID: req.userId});
};