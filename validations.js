import {body} from 'express-validator';

export const loginValidation = [
    body('email', 'Не верный формат электронной почты').isEmail(),
    body('password', 'Пароль пользователя должен быть не менее 5 символов').isLength({min:5}),
];

export const registerValidation = [
    body('email', 'Не верный формат электронной почты').isEmail(),
    body('fullName', 'Имя пользователя должно быть не менее 3 символов').isLength({min:3}),
    body('password', 'Пароль пользователя должен быть не менее 5 символов').isLength({min:5}),
    body('avatarUrl', 'Не верный формат ссылки').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Загловок не может быть пустым и не меньше 5 символов и не больше 50').isLength({min:5, max:50}).isString(),
    body('text', 'Текст статьи должен быть не менее 10 символов').isLength({min:10}).isString(),
    body('tags', 'Не верный формат тэгов').optional().isString(),
    body('imageUrl', 'Не вернная ссылка').optional().isURL(),
];