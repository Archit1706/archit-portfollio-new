---
title: "Docker — A Complete Guide"
slug: docker-complete-guide
date: 2023-09-28
tags: [DevOps, Docker, Engineering]
excerpt: "Learn Docker in a simple and easy way — containers, images, volumes, networking, and how to actually ship with Docker in production."
readingTime: 7
featured: false
---

# Docker - A containerization tool

## What is Docker?

Docker is a containerization tool that allows you to create, deploy, and run applications using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package.

![Docker](/assets/blogs/docker.jpg)

Docker is a tool that allows developers, sys-admins etc. to easily deploy their applications in a sandbox (called containers) to run on the host operating system i.e. Linux. The key benefit of Docker is that it allows users to package an application with all of its dependencies into a standardized unit for software development. Unlike virtual machines, containers do not have the high overhead and hence enable more efficient usage of the underlying system and resources.

> **_Fun Fact_**: Now Developers cannot say that the code is working on my machine. Because the code will run on the same environment as the developer's machine. 😉

## Installation

Follow the Installation Steps - [here](https://docs.docker.com/engine/install/)

## Docker Architecture

Docker uses a client-server architecture. The Docker client talks to the Docker daemon, which does the heavy lifting of building, running, and distributing your Docker containers. The Docker client and daemon can run on the same system, or you can connect a Docker client to a remote Docker daemon.

The Docker daemon is the persistent process that manages Docker containers on the host system. The daemon is the process that runs in the operating system to which clients talk to.

The Docker client is the primary way that many Docker users interact with Docker. When you use commands such as docker run, the client sends these commands to dockerd, which carries them out. The docker command uses the Docker API. The Docker client can communicate with more than one daemon.

![Docker Architecture](/assets/blogs/docker-architecture.png)

## Docker Images

Docker images are the basis of containers. Images are read-only files that contain instructions on how to create a container. Often, an image is based on another image, with some additional customization. For example, you may build an image which is based on the ubuntu image, but installs the Apache web server and your application, as well as the configuration details needed to make your application run.

You might create your own images or you might only use those created by others and published in a registry. To build your own image, you create a Dockerfile with a simple syntax for defining the steps needed to create the image and run it. Each instruction in a Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.

## Docker Containers

Docker containers are a standardized unit of software. Docker containers wrap up software and its dependencies into a standardized unit for software development that includes everything it needs to run: code, runtime, system tools and libraries. This guarantees that your application will always run the same and makes collaboration as simple as sharing a container image.

Containers are created from Docker images. A container is a runtime instance of an image—what the image becomes in memory when executed (that is, an image with state, or a user process). You can see a list of your running containers with the command, docker ps, just as you would in Linux.

## Docker Registry

A Docker registry stores Docker images. Docker Hub is a public registry that anyone can use, and Docker is configured to look for images on Docker Hub by default. You can even run your own private registry. If you use Docker Datacenter (DDC), it includes Docker Trusted Registry (DTR).

When you use the docker pull or docker run commands, the required images are pulled from your configured registry. When you use the docker push command, your image is pushed to your configured registry.

## Dockerfile

A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession.

## Docker Compose

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services. Then, with a single command, you create and start all the services from your configuration.

## Docker Commands

Some basic Docker commands that you can use to work with Docker containers:

1. `docker run`: Creates and starts a new container from an image.

    Example: `docker run -d --name my-container nginx`

    This command creates a new container named "my-container" from the "nginx" image in the background (detached mode).

2. `docker ps`: Lists running containers.

    Example: `docker ps`

    This command lists all the running containers on your system.

3. `docker stop`: Stops a running container.

    Example: `docker stop my-container`

    This command stops the container named "my-container".

4. `docker start`: Starts a stopped container.

    Example: `docker start my-container`

    This command starts the container named "my-container".

5. `docker restart`: Stops and starts a container.

    Example: `docker restart my-container`

    This command stops and then starts the container named "my-container".

6. `docker rm`: Removes a container.

    Example: `docker rm my-container`

    This command removes the container named "my-container".

7. `docker images`: Lists available images.

    Example: `docker images`

    This command lists all the images that are currently available on your system.

8. `docker rmi`: Removes an image.

    Example: `docker rmi nginx`

    This command removes the "nginx" image from your system.

9. `docker exec`: Runs a command inside a running container.

    Example: `docker exec -it my-container sh`

    This command starts an interactive shell session inside the container named "my-container".

10. `docker build`: Builds a docker Image based on the contents of the dockerfile.

    Example: `docker build -t my-image .`

    This command builds an image named "my-image" using the Dockerfile in the current directory (. represents the current directory as the build context).

---
