#!/usr/bin/bash

# Start DB and Redis
sudo docker-compose up -d mongo redis
echo 'Waiting for 10 Seconds'
sleep 5s

# Start Main-App and Worker
sudo docker-compose up app worker

## Execution-Command ## - sudo bash start.sh