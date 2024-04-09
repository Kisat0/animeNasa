require('dotenv').config();
const { sendMail } = require('../utils/mailing');
const User = require("../models/user");
const { Router } = require("express");

const router = Router();

router.post('/contactEmail', async (req, res) => {
    try {
        const { title, corps } = req.body;

        const htmlContent = `
            de
            <h2>${title}</h2>
            <p>${corps}</p>
        `;
        const mailData = {
            to: 'animenasayametekudasai@gmail.com',
            subject: title,
            html: htmlContent,
        };

        await sendMail(mailData);

        return res.status(200).json('Email envoyé');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
