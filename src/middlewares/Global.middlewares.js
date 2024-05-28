import mongoose from "mongoose";
const validId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: 'ID invalid' })
    }

    req.userId = id;
    next();
}

export {
    validId
}