const express = require('express');
const { Telegraf } = require('telegraf');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

bot.on('text', async (ctx) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ctx.message.text,
        max_tokens: 100,
    });
    ctx.reply(response.data.choices[0].text);
});

bot.launch();
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
