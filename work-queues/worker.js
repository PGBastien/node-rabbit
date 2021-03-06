#!/usr/bin/env node
// Process tasks from the work queue

var amqp = require('amqplib');

amqp.connect('amqp://moderation:moderation@localhost/moderation').then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
        var ok = ch.assertQueue('logs', {durable: true});
        ok = ok.then(function() { ch.prefetch(1); });
        ok = ok.then(function() {
            ch.consume('logs', doWork, {noAck: false});
            console.log(" [*] Waiting for messages. To exit press CTRL+C");
        });
        return ok;

        function doWork(msg) {
            var body = msg.content.toString();
            console.log(" [x] Received '%s'", body);
            var secs = body.split('.').length - 1;
            console.log(" [x] Task takes %d seconds", secs);
            setTimeout(function() {
                console.log(" [x] Done");
                //ch.ack(msg);  // If ack message, message is not requeue
            }, secs * 1000);
        }
    });
}).catch(console.warn);
