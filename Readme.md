# Atlan-Assignment

## Contents
- [Problem Statement](#problem-statement)
- [System Architecture](#system-architecture)
- [Steps to run](#steps-to-run)
- [API endpoints](#api-endpoints)
    - [1. /api](#1-api) (API status)
    - [2. /api/task](#2-task) (POST tasks to main server)
        - [2.1. Task 1](#21-task1)
        - [2.2. Task 2](#22-task2)
        - [2.3. Task 3](#23-task3)
        - [2.4. Task 4](#24-task4)

## Problem Statement
The lifecycle of data collection via Collect does not end with the submission of a response. There is usually some post-submission business logic that Collect needs to support over time. This solution must be failsafe, should eventually recover from circumstances like power/internet/service outages, and should scale to cases like millions of responses across hundreds of forms for an organization.

This is a internship task for a Backend Developer Internship where the task given is to build a solution for providing large scale concurrency in long running tasks.

## System Architecture

![Architecture Diagram](assets/Atlan_Arch.png)

## Steps to run

### Requirements
docker , docker-compose, bash
#### NOTE: Make sure to setup the both `.env` files with relevent details as provided in `.env.sample` in `main` and `worker` folders.

Use the `start.sh` script to run the `docker-compose` commands. Use the following command to build and start the services:
```bash
sudo bash start.sh
```

## API endpoints

#### 1. `/api`
```
URL: /api
Request type: GET
```

#### 2. `/task`

- #### 2.1. `Task1`
    ```
    Task: Translate the data to native language of MCQ question using Google Translate API
    URL: /api/task
    Request type: POST
    Task Type: 1
    Sample Request Data:
    {
        "userId": 1,
        "taskType": 1,
        "response": {
            "original": "Hello"
        }
    }
    ```
    
- #### 2.2. `Task2`
    ```
    Task: Validate the data recieved by the users
    URL: /api/task
    Request type: POST
    Task Type: 2
    Sample Request Data:
    {
        "userId": 1,
        "taskType": 2,
        "response": {
            "monthly_income": 500,
            "monthly_savings": 550
        }
    }
    ```
    
- #### 2.3. `Task3`
    ```
    Task: Organizing submitted data on Google Sheets through Google Sheets API 
    URL: /api/task
    Request type: POST
    Task Type: 3
    Sample Request Data:
    {
        "userId": 1,
        "taskType": 3,
        "response": {
            "name": "John",
            "income": "98000",
            "age": "22"
        }
    }
    ```
    
- #### 2.4. `Task4`
    ```
    Task: Send an SMS to the customer whose details are collected in the response
    URL: /api/task
    Request type: POST
    Task Type: 4
    Sample Request Data:
    {
        "userId": 1,
        "taskType": 4,
        "response": {
            "name": "Mike",
            "email": "mike@sample.com",
            "mobile": "1234567890"
        }
    }
    ```

## Implementation Memo

- Queue Implementation
- MongoDB Transactions
- Horizontly scaling by increasing docker containers
- Health Check
- Complete 4 tasks (With approaches)
- Error logging and server logging
