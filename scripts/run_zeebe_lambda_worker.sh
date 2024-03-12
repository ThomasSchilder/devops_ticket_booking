#!/bin/bash

# 29/02/2024
# Run zeebe-lambda-worker
docker run --env-file ../platform/credential/camunda.env --env-file ../platform/credentail/aws.env -p 8081:8080 camunda/zeebe-lambda-worker:SNAPSHOT
