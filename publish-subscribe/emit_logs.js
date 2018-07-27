#!/usr/bin/env node

var datetime = require('node-datetime');
var amqp = require('amqplib');
// Connect to RabbitMQ Server
amqp.connect('amqp://moderation:moderation@localhost/moderation').then(function(conn) {
    return conn.createChannel().then(function(ch) {
        // Date time
        var dt = datetime.create();
        var formattedDate = dt.format('d/m/y H:M:S');

        // Exchange logs
        var ex = 'logs';
        var ok = ch.assertExchange(ex, 'direct', {durable: true})

        var message = process.argv.slice(2).join(' ') ||
            'info: Koda send message on exchange at ' + formattedDate;

        return ok.then(function() {
            // Publish message
            ch.publish(ex, '', Buffer.from(message));
            console.log(" [x] Sent '%s'", message);
            return ch.close();
        });
    }).finally(function() { conn.close(); });
}).catch(console.warn);