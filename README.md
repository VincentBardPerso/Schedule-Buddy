# schedule-buddy

# Running Docker Compose

This README explains how to set up and run a Docker Compose project. Follow the steps below to get your application running in a Dockerized environment.

## Prerequisites

Ensure the following are installed on your system:

1. **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
2. **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Set Up Environment Variables**:
   - Ensure you have a `.env` file in the root directory with the necessary environment variables. If not provided, create one based on the `example.env` file in the repository:
     ```bash
     cp example.env .env
     ```
   - Edit the `.env` file to set your configurations:
     ```bash
     nano .env
     ```

3. **Build and Start Services**:
   Run the following command to build and start all services defined in the `docker-compose.yml` file:
   ```bash
   docker-compose up --build
   ```

4. **Verify Services Are Running**:
   Once the services are running, you can verify by checking the logs:
   ```bash
   docker-compose logs
   ```
   Or, check the status of containers:
   ```bash
   docker ps
   ```

## Accessing the Application

- **Web Application**: Open your web browser and navigate to `http://localhost:<port>`, replacing `<port>` with the appropriate port specified in your `docker-compose.yml`.
- **API Endpoints**: Access API endpoints using tools like Postman or `curl` at `http://localhost:<api-port>`.

## Stopping Services

To stop the running containers, use:
```bash
docker-compose down
```

This will stop and remove the containers but keep the volumes and networks intact.

## Additional Commands

- **Rebuild a Specific Service**:
  ```bash
  docker-compose build <service-name>
  ```

- **Start a Specific Service**:
  ```bash
  docker-compose up <service-name>
  ```

- **Stop Containers Without Removing**:
  ```bash
  docker-compose stop
  ```

- **Remove All Containers, Networks, and Volumes**:
  ```bash
  docker-compose down -v
  ```

## Troubleshooting

- **Container Not Starting**:
  Check the logs of the specific container:
  ```bash
  docker logs <container-id>
  ```

- **Permission Issues**:
  Ensure you have appropriate permissions to run Docker commands. Use `sudo` if necessary:
  ```bash
  sudo docker-compose up
  ```

- **Networking Issues**:
  Check the defined networks in `docker-compose.yml` and ensure there are no conflicts with existing networks.

## Documentation

For more details, refer to the [Docker Compose documentation](https://docs.docker.com/compose/).

---

Feel free to customize the `docker-compose.yml` file or `.env` variables to suit your application requirements!
