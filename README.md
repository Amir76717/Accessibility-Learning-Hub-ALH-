# Accessibility-Learning-Hub-ALH: An Interactive LMS for Digital Accessibility
Accessibility Learning Hub is a dynamic and educational platform designed to introduce MLH Fellows and other users to the fundamentals of digital accessibility. Using cutting-edge web technologies, ALH offers resources, tools, and hands-on learning for automated accessibility testing and best practices.

### Table of Contents

- [Installation](#Installation-)
- [Technology Stack](#Technology-Stack-)
- [Features](#Features)
- [Web server](#Web-Server)
- [Database](#Database)
- [Containers](#Containers)
- [Monitoring and Analysis](#Monitoring-and-Analysis)
- [Deployment and CI/CD](#Deployment-and-CI/CD)
- [Challenges Encountered](#Challenges-Encountered)

## Installation 🏗
**1. Prerequisites:**

- Docker: Installation Guide
- Clone the repository and navigate to the project directory:

		git clone https://github.com/your-github-username/Accessibility-Learning-Hub.git
		cd Accessibility-Learning-Hub

**2. Run the application:**

- Start the application using Docker:

		docker-compose up -d --build
Access the web interface at http://localhost/.

**3. Optional**

	Navigate to `http://localhost/grafana` to set up Grafana
	- 
## Technology Stack 🍔

### Frontend
- **React:** Core framework for building the user interface.
- **React Markdown:** For rendering educational content.
- **Bootstrap:** For responsive design elements.
### Backend
- **Flask:** Serves as the API server.
- **PostgreSQL:** Database for storing user data.
### DevOps
- **Docker:** For containerization and isolation of services.
- **GitHub Actions:** For CI/CD processes.
- **Grafana & Prometheus:** For monitoring and analytics.

**API Endpoints**
User authentication

| HTTP Verb | Endpoint | Description |
| -------- | -------- | -------- |
| `POST`   | /register     | register new user     |
| `POST`   | /login     | login user     |

### Database 
User

| Property | Type | Description |
| -------- | -------- | -------- |
| username | string | user's username |
| password | string  | user's password | 


### Containers

| Container Name | Component | Networks | Depends On
| -------- | -------- | -------- | ---- | 
| app   | React app (front-end)| nginx_client | api
| api   | Flask web server| api_db, nginx_api | db
| db    | PostgreSQL db | api_db       | n/a
| nginx | Nginx server | nginx_api, nginx_client, monitoring | n/a
| cadvisor   | Container Monitoring | monitoring   | n/a
| prometheus | Prometheus data gathering | monitoring | cadvisor
| grafana    | Monitoring visualization| monitoring | prometheus

### CI/CD

| Workflow 			| Run on | Description |
| -------- 			| -------- | -------- |
| docker-build	| push to master/pull request | run docker-build tests |
| linters	| push to master/pull request | run python linters |
| deploy	| push to master | deploy application to AWS |

### Monitoring

For our project, we setup three monitoring tools. We setup cAdvisor, Prometheus, and Grafana. These three monitoring tools depend on one another. The dependency line is as follows: cAdvisor --> Prometheus --> Grafana. Grafana is setup runnin on the `/grafana` endpoint of our application. Monitoring tools endpoints:

- cadvisor: `/cadvsisor`
- grafana: `/grafana`

**Grafana**

<img src="https://i.imgur.com/RGY5fNI.png" height=300>

**cAdvisor**

<img src="https://i.imgur.com/nJu2jl8.png" height=300>

**Prometheus**

<img src="https://i.imgur.com/588I1ty.png" width=600>



### Deployment

MLH-A11y is deployed on t2.medium CentOS Stream 8 EC2 instance hosted on AWS. The domain, [mlha11y.tech](https://mlha11y.tech), was bought and configured on Domain.com, and is secured with [Let's Encrypt](https://letsencrypt.org/) using `certbot-nginx`.

## Issues Encountered

#### Web Server/DB Issues

When building our web server, we had some trouble using requesting data from our markdown files and converting it into React for the different unit pages. However, we got around this by using Axios. We decided to use `axios.get` in order to retrieve the markdown file and set its contents as a variable.

#### Client Issues

In launching our unit-based educational approach, we initially dealt with several barriers in finding appropriate libraries to easily and efficiently render lesson material, videos, and content. We immediately began looking at the options and settled on `react-markdown`, a library by `remarkjs` for rendering markdown files in React. We immediately came across an obstacle: delivering interactive and reactive markdown-based content - a key feature we wanted to implement to ensure that users would be able to get hands-on experience with coding using custom [Repl.it](https://replit.com) exercises. The base implementation of `react-markdown` did not enable us to render inline HTML, but we were able to resolve this issue by utilizing the `rehypeRaw` [package](https://github.com/rehypejs/rehype-raw), allowing us to both style and customize our Markdown templates to a greater degree.

We also had some issues with created protected routes for some of the pages. We originally wanted to have the unit pages only be accessible when logged in, but we kept getting errors that various variables are undefined.


#### Production Issues

We encountered several speed bumps with securing our routing, using `nginx` and Docker, and setting up monitoring tools like Prometheus and Grafana. Early on, the most notable issue was that our project's full dependencies would consistently crash our VM on each `docker-compose up --build` command. As a stop-gap, we had to reboot our t2.micro instance, remove all Docker containers, generated files, volumes, and images, and rebuild. This was a tedious process, but after we received the go-ahead to upgrade our instance to a t2.medium, we were able to resolve other docker-based issues with relative ease.

## Authors

- Guillermo Sanchez – [**@membriux**](https://github.com/membriux)
- Nikhil Vytla - [**@nikhil-vytla**](https://github.com/nikhil-vytla)
- Ashley Ye - [**@ashleyye**](https://github.com/ashleyye)


