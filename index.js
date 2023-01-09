require('dotenv').config();
const mc = require('mineflayer');

const client = mc.createBot({
    host: `${process.env.HOST}:${process.env.PORT}`,
    port: process.env.PORT,
    username: process.env.NAME,
    password: process.env.PASS,
});

client.on('login', () => {
    console.log('Connected');
});

client.on('spawn', async () => {
    console.log('Spawned');
    client.chat('/gamemode creative');
    client.creative.startFlying();
    await client.waitForTicks(1);
    client.chat('/tp @s 204 -30 23');
});

client.on('death', () => {
    client.emit('respawn');
});

client.on('kicked', (reason, loggedIn) => {
    console.log(reason, loggedIn);
});