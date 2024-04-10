const { sendMail } = require('../utils/mailing');
const { Router } = require("express");

const router = Router();

router.post('/contactEmail', async (req, res) => {
    try {
        const { title, corps, user } = req.body;

        const htmlContent = `
            <h2>De ${user.username}
            <p>-----------------------------</p>
            <p>${corps}</p>
            <p>-----------------------------</p>
            <p>Message de ${user.username} ayant pour mail ${user.email}</p>
        `;
        const mailData = {
            to: 'animenasayametekudasai@gmail.com',
            subject: "Formulaire de Contact - Objet : "+title,
            html: htmlContent,
        };

        await sendMail(mailData);

        return res.status(200).json('Email envoyé');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

router.post('/reportEpisode', async (req, res) => {
    try {
        const { customReportDescription, user, pageLink } = req.body;

        const htmlContent = `
            <p> Problème sur la page ${pageLink}</p>
            <p>${customReportDescription}</p>
            <p>-----------------------------</p>
            <p>Message de ${user.username} ayant pour mail ${user.email}</p>
        `;
        const mailData = {
            to: 'animenasayametekudasai@gmail.com',
            subject: "Signalement episode",
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
