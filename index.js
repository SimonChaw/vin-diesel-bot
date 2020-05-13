'use strict';

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');
const fs = require('fs');

// Create an instance of a Discord client
const client = new Discord.Client();
let responses = [];
let generic_responses = [
    "Thank you!",
    "Yo.",
    "Yeah, I appreciate you, wanna rewatch Tokyo Drift with me? I'm actually at the end. It's like a Marvel after movie scene.",
    "Did you wanna ask me a question or something?",
    "Sorry I didn't catch that hot shot.",
    "What's wrong with you, are you Egyptian or something?",
    "That's tight dude.",
    "Don't say Fortnite.",
    "Hang on. I'm working out right now. Lemme know if you have any questions",
    "That's kind of cringe baby."
];

function load() {
    let data = fs.readFileSync('quotes.json');
    responses = JSON.parse(data.toString());
    data = fs.readFileSync('secret');
    // Log our bot in using the token from https://discordapp.com/developers/applications/me
    client.login(data.toString());
}
load();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    let regex = new RegExp("(vin|@vin|vinny)", "gmi");
    if(regex.test(message.content)){
        if(message.content.includes("?")) {
            let str = responses[Math.floor(Math.random() * responses.length)];
            message.channel.send(str);
        } else {
            let str = generic_responses[Math.floor(Math.random() * generic_responses.length)];
            message.channel.send(str);
        }
    }
});
