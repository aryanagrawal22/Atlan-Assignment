#!/usr/bin/bash

# Start DB
sudo docker-compose up -d mongo
echo 'Waiting for 10 Seconds'
sleep 10s

# Start Main-App
sudo docker-compose up app
echo 'Waiting for 5 Seconds'
sleep 5s

#Execution Command - sudo bash start.sh