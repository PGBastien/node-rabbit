# RabbitMQ Server

## Protocols / Ports

| Protocols         | Ports         | 
| :-------------    |:-------------:|
| amqp              | 5672          |
| amqps (ssl)       | 5671          |
| clustering        | 25672         |


## Http management
http://localhost:15672/

## Rabbit commands

### Systemctl

`systemctl start rabbitmq-server.service` : Start RabbitMQ service

`systemctl stop rabbitmq-server.service` : Stop RabbitMQ service

`systemctl status rabbitmq-server.service` : Get status RabbitMQ service


### rabbitmqctl
`sudo rabbitmqctl start_app` : Start a node

`sudo rabbitmqctl stop_app` : Stop the node(s) of the cluster

`sudo rabbitmqctl cluster_status` : Display cluster status of node(s)


### rabbitmq-server
`sudo rabbitmq-server restart` : Restart the server


# Node JS
node [script.js]


# Docker : RabbitMQ Server and management 

## Server 
docker run -d --hostname my-rabbit --name the-rabbit -p 5672:5672 rabbitmq:3

## http management
docker run -d --hostname my-rabbit --name admin-rabbit -p 8081:15672 rabbitmq:3-management
