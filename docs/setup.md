# Local development environment

The first step is to make sure you have docker running on your system.

## RabbitMQ
Using the following command, we make sure RabbitMQ is running:

```
docker run -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

## Camunda Platform 8
The booking service is built on Camunda Platform 8. Camunda have published the docker compose files required to run their software on your machine. How nice!

First move to the platform directory of this repostiory (/platform/). In this folder, we have included a folder containing shell-scripts (/scripts/). Enter this folder (please do so, somehow we get a lot of bugs if we run the scripts using ```/path/to/script/script.sh```) shell-script called setup.sh. This script includes all necessary steps for spinning up all Camunda core services.

It might be possible that you get a permission error like the following:
```
bash: ./setup.sh: Permission denied
```

In this case, your shell-script doesn't have permission to be executed. Run the following command to give permission:

```
chmod +x ./setup.sh
```

After the permission is granted, run the following command to spin up all required services:
```
./setup.sh
```


## What's next:

A bunch of containers have been started and should be running now. Execute the following command to check the status

```
sudo docker ps
```

In the PORTS column, the ports of all containers are summarized. For more information about the ports, read: https://docs.docker.com/network/#published-ports

One container is called ```camunda/operate:latest```. This container contains the web interface required for setting up the API credentials for our application.

From here, please follow the steps in chapter ```Create Camunda Platform 8 SaaS Cluster``` in the README.md on the root level of this repository.


## Done? Let's tear down our containers.

We have made it simple to tear down our application. Just execute the following script:
```
./kill_containers.sh
```

Again, it could be possible that you run into a permission error. Run the following script in case this happens

```
chmod +x ./kill_containers.sh
```
