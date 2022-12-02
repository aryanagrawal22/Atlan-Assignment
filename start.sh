#!/usr/bin/bash

# Start DB
sudo docker-compose up -d mongo redis
echo 'Waiting for 10 Seconds'
sleep 5s

# Start Main-App
sudo docker-compose up app worker

#Execution Command - sudo bash start.sh