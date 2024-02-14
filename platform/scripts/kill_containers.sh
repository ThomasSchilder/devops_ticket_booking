#!/bin/bash

# 14/02/2024
# This file is an initial attempt to kill all containers to run a local development environment.
#

# Run script in verbose mode
set -x

# Setting the environment variables required for the core Camunda images
export CAMUNDA_PLATFORM_VERSION='latest' &&
export CAMUNDA_CONNECTORS_VERSION='latest' &&
export ELASTIC_VERSION='8.12.1' &&

docker compose -f ../config/docker-compose-core.yaml down