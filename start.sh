#!/usr/bin/bash

# Start DB and Redis
sudo docker-compose up -d mongo redis
echo 'Waiting for 10 Seconds'
sleep 5s

# Start Main-App, Worker and Health Monitor
sudo docker-compose up app worker health

## Execution-Command ## - sudo bash start.sh