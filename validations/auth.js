import {body} from 'express-validator';

export const registerValidation = [
    body('email', 'Не верный формат электронной почты').isEmail(),
    body('fullName', 'Имя пользователя должно быть не менее 3 символов').isLength({min:3}),
    body('password', 'Пароль пользователя должен быть не менее 5 символов').isLength({min:5}),
    body('avatarUrl', 'Не верный формат ссылки').optional().isURL(),
];
