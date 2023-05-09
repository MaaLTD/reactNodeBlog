import jwt from "jsonwebtoken";
import Config from "../Config/Enviroments.js";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token) {
        try {
            const decoded = jwt.verify(token, Config.appSecretKey);
            if(decoded) {
                req.userId = decoded._id;
                return next();
            }

            res.status(403).json({message: "access denied"});

        } catch (e) {
            res.status(500).json({message: "access denied"});
        }
    }
};