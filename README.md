# RabbitMQ Server and management 

## Server 
docker run -d --hostname my-rabbit --name the-rabbit -p 5672:5672 rabbitmq:3

## http management
docker run -d --hostname my-rabbit --name admin-rabbit -p 8081:15672 rabbitmq:3-management



# Node JS
