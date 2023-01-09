require('dotenv').config();
const mc = require('mineflayer');

const client = mc.createBot({
    host: process.env.HOST,
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
    await client.waitForTicks(1);
    client.chat('/tp @s 204 253 24');
});

client.on('entitySleep', (entity) => {
    goToSleep();
});

client.on('entityWake', (entity) => {
    wakeUp();
});

async function goToSleep() {
    const bed = client.findBlock({
        matching: block => client.isABed(block),
    });

    if (bed) {
        try {
            await client.sleep(bed);
        } catch (err) {
            console.error(err);
        };
    } else {
        client.chat('Không thể tìm thấy block giường ở xung quanh');
    };
};

async function wakeUp() {
    try {
        await client.wake();
    } catch (err) {
        console.error(err);
    };
};

client.on('death', () => {
    client.emit('respawn');
});

client.on('kicked', (reason, loggedIn) => {
    console.log(reason, loggedIn);
});