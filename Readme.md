### First of all. If you want to run this project in local machine. You must change config in client app. Because now the project is intended for deployment on heroku

```
go to file: client/src/config.js
```

#### change first conditional to your local host

```
export const server_url =
  process.env.NODE_ENV === 'production'
    ? 'YOUR_SERVER_LOCAL_HOST'
    : 'http://localhost:3001';
```

## Create .env and fill in the  file

```
HOST=YOUR_SERVER_LOCAL_HOST   #ex. http://localhost:YOUR_PORT
PORT=YOUR_PORT
DB_URL=mongodb://127.0.0.1:27017
etherKEY=YOUR_ETHERSCAN_KEY
```

#### You can deploy MongoDB in a docker container

```
docker compose up
```

## Installation

```
npm install
npm run build
npm run start  #production
npm run server #development
```

Server will be running on {YOUR_SERVER_LOCAL_HOST:YOUR_PORT}