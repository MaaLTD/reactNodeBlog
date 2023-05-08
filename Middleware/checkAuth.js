import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);
            if(decoded) {
                req.userId = decoded._id;
                return next();
            }
        } catch (e) {
            res.status(500).json({"message": "access denied"});
        }
    }
    res.status(403).json({message: "access denied"});
};