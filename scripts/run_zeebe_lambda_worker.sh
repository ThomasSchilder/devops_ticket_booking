#!/bin/bash

# 29/02/2024
# Run zeebe-lambda-worker
docker run --env-file ../camunda.env --env-file ../aws.env -p 8080:8080 camunda/zeebe-lambda-worker:SNAPSHOT
