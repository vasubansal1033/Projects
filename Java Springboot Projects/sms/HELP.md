# Student Management System
This is a very simple Springboot based CRUD app in which you can create, update, delete student records.
It uses a MySQL docker image for db and the entire app is dockerized.

`docker` directory contains docker files related to running db image only. Then you can run the app on your IDE.

`Dockerfile` is used for building the image for the app using jar files inside `build/libs`. This image is then used by `docker-compose` in root to run the application alongwith the MySQL db.

To run the app ->
- `docker-compose up -d`
- Visit `localhost:8080/listAllStudents`
