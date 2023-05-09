export const create = (req, res) => {
    try {
        res.json({'1': req.body})
    } catch (err) {

    }
};