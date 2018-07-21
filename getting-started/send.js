#!/usr/bin/env node

// Require amqp library
var amqp = require('amqplib/callback_api');

// Connect to RabbitMQ server
amqp.connect('amqp://localhost', function(err, conn) {
    // Create channel
    conn.createChannel(function(err, ch) {
        var q = 'hello';
        var msg = 'Koda :-)';

        ch.assertQueue(q, {durable: false});
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});