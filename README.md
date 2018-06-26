# 12 factor app

Build with nodejs (express), mongodb and docker

- npm install
- npm start

### nginx balancer
```
  docker build -t app-nodejs .
  docker run -d -e "SERVER_NAME=chicken" --name=chicken app-nodejs
  docker run -d -e "SERVER_NAME=steak" --name=steak app-nodejs
```

```
  cd nginx
  docker build -t app-nginx .
  docker run -d -p 8080:80 --link chicken --link steak app-nginx
```

### Ensure Containers Run with High-Availability
- use `restart: always` in your docker-compose
- docker-compose up --scale app-nodejs=3
