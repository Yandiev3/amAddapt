const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const botToken = '7005164378:AAENutHhc9cdsrHpjuvKe4xICKAmhd6-76Y';
const chatId = '613074726';

app.post('/submit-form', (req, res) => {
    const { firstName, phone } = req.body;

    const message = `Новая заявка от ${firstName}! Телефон: ${phone}`;

    axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    })
    .then(() => {
        res.status(200).send('Сообщение отправлено!');
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Ошибка при отправке сообщения');
    });
});

app.listen(3333, () => {
    console.log('Сервер запущен');
});