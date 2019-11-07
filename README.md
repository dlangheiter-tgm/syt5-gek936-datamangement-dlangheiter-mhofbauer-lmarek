# "*Datamanagement - Synchronization*"

## Task
You can find the task details under [Task Description](TASK.md) which describes the required steps for realization.

## Participantss
  - David Langheiter
  - Matthias Hofbauer
  - Lukas Marek


## Execute
To execute this project you need to have Node/NPM and Docker/docker-compose installed.

There are two parts to this project:

### The WebApp
This is a React based OnePage Application.

To install all necessary dependencies run
```shell script
npm install
```

To run this you need to go into the folder `unicorn-webshop`.
For development run
```shell script
npm start
```
This will open a server on port 3000. This will autoreload if you make changes to the srcs.

If you want to deploy it run
```shell script
npm run build
```
This will build the application into the directory build. This can be hosted by any webserver (Apache, ...).

### The DB-Server
The DB-server is a simple couchbase server hosted in docker.

To run the db server go into the directory `server`. Then run
```shell script
docker-compose up -d
```

**On First startup** you need to run the `setup-db.sh` script. This setups all necessary databases and users.

This will start the db server in disconnected (-d) mode.
The default login credentials are admin admin.

## Implementation
For our project we use React and PouchDB for the WebApp and CouchDB as server, for reasons, which are explained here: [Latex]()

### Responsibilities
To achieve our project we split it into three parts, that will be managed by one person each.
  - David Langheiter will be responsible for the DB-Server(CouchDB)
  - Matthias Hofbauer will manage the synchronization between all the parts(PouchDB)
  - Lukas Marek will create the WebApp(React)

## Quellen

[Docker Couchbase](https://hub.docker.com/_/couchbase)

[Pouch Db](https://couchdb.apache.org/)

[React](https://reactjs.org )



