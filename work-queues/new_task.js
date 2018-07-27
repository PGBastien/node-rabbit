#!/usr/bin/env node
// Post a new task to the work queue

var amqp = require('amqplib');

amqp.connect('amqp://moderation:moderation@localhost/moderation').then(function(conn) {
    return conn.createChannel().then(function(ch) {
        var q = 'logs';
        var ok = ch.assertQueue(q, {durable: true});

        return ok.then(function() {
            var msg = process.argv.slice(2).join(' ') || "Koda send a message !";
            ch.sendToQueue(q, Buffer.from(msg), {deliveryMode: true});
            console.log(" [x] Sent '%s'", msg);
            return ch.close();
        });
    }).finally(function() { conn.close(); });
}).catch(console.warn);
