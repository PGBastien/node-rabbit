#!/usr/bin/env node

var amqp = require('amqplib');
// Connect to RabbitMQ Server
amqp.connect('amqp://moderation:moderation@localhost').then(function(conn) {
    return conn.createChannel().then(function(ch) {
        // Exchange logs
        var ex = 'logs-autodelete';
        var ok = ch.assertExchange(ex, 'direct', {durable: true})

        var message = process.argv.slice(2).join(' ') ||
            'info: Send on exchange !';

        return ok.then(function() {
            // Publish message
            ch.publish(ex, '', Buffer.from(message));
            console.log(" [x] Sent '%s'", message);
            return ch.close();
        });
    }).finally(function() { conn.close(); });
}).catch(console.warn);