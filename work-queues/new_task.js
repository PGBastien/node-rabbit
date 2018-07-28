const fs = require('fs');

var datetime = require('node-datetime');
var amqp = require('amqplib');

// ssl options
var opts = {
    cert: fs.readFileSync('../certifs/ssl/client/cert.pem'),
    key: fs.readFileSync('../certifs/ssl/client/key.pem'),
    passphrase: 'TheRabbitPass',
    ca: [fs.readFileSync('../certifs/ssl/ca/cacert.pem')]
};

amqp.connect('amqps://moderation:moderation@skynet/moderation', opts).then(function(conn) {
    return conn.createChannel().then(function(ch) {
        // Date time
        var dt = datetime.create();
        var formattedDate = dt.format('d/m/y H:M:S');

        var q = 'logs';
        var q2 = 'logs-bis';
        var ok = ch.assertQueue(q, {durable: true});

        return ok.then(function() {
            // Define message
            var msg = process.argv.slice(2).join(' ') || "Koda send a message at " + formattedDate;

            // Send message at queue
            ch.sendToQueue(q, Buffer.from(msg), {deliveryMode: true});
            ch.sendToQueue(q2, Buffer.from(msg), {deliveryMode: true});

            // Return result to console
            console.log(" [x] Sent '%s'", msg);

            // Close the channel
            return ch.close();
        });
    }).finally(function() { conn.close(); });
}).catch(console.warn);
