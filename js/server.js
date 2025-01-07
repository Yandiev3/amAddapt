const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); // Добавляем CORS

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Разрешаем запросы с любого домена

const botToken = '7005164378:AAENutHhc9cdsrHpjuvKe4xICKAmhd6-76Y';
const chatId = '613074726';

app.post('/submit-form', (req, res) => {
    const { firstName, phone } = req.body;

    // Формируем сообщение для Telegram
    const message = `Новая заявка от ${firstName}! Телефон: ${phone}`;

    // Отправляем сообщение в Telegram
    axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    })
    .then(() => {
        res.status(200).json({ success: true, message: 'Сообщение отправлено!' });
    })
    .catch((err) => {
        console.error('Ошибка при отправке сообщения:', err);
        res.status(500).json({ success: false, message: 'Ошибка при отправке сообщения' });
    });
});

app.listen(3333, () => {
    console.log('Сервер запущен на http://localhost:3333');
});