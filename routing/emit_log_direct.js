#!/usr/bin/env node

var amqp = require('amqplib');

var args = process.argv.slice(2);
var severity = (args.length > 0) ? args[0] : 'info';
var message = args.slice(1).join(' ') || 'Koda emit log!';

amqp.connect('amqp://moderation:moderation@localhost/moderation').then(function(conn) {
    return conn.createChannel().then(function(ch) {
        var ex = 'direct_logs';
        var ok = ch.assertExchange(ex, 'direct', {durable: false});

        return ok.then(function() {
            ch.publish(ex, severity, Buffer.from(message));
            console.log(" [x] Sent %s:'%s'", severity, message);
            return ch.close();
        });
    }).finally(function() { conn.close(); });
}).catch(console.warn);
