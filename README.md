# News APi Using nodejs with Typescript

Ts Api using nodejs, Typescript, Mongo and Redis with Docker.   

## Compile 

Run `npm run compile` This will compile the api on dist folder.

## Start

Run `npm start` This will start the api on http://localhost:3050.

## Start Dev

Run `npm run start:dev` This will start and compile the api in the same time on http://localhost:3050.

## Update project for dockerCompose and upload on dockerHub:

1- Change package.json - OF: `"start": "node ./dist/program.js",` TO: `"start": "node program.js"`.

2- Change `NewsControler` file in  the follow lines. OF: `let client = redis.createClient();` TO: `let client = redis.createClient(6379, "redis");`.

3- Change `database` file. OF: 
`private  DB_URL = 'mongodb://localhost:27017/db_portal’;`  TO: `private  DB_URL = 'mongodb://link-db/db_portal';`.
