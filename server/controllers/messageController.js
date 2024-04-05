const Message = require('../models/message');

const createMessage = async (req, res) => {
    const message = new Message(req.body);

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    createMessage,
};