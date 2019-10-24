# "*Datamanagement - Synchronisation*"

## Aufgabenstellung
Die detaillierte [Aufgabenstellung](TASK.md) beschreibt die notwendigen Schritte zur Realisierung.

## Execute
To execute this project you need to have Node/NPM and Docker/docker-compose installed.

There are two parts to this project:

### The WebApp
This is a React based OnePage Application.

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

### The db Server
The DB server is a simple couchbase server hosted in docker.

To run the db server go into the directory `server`. Then run
```shell script
docker-compose up -d
```
This will start the db server in disconnected (-d) mode.

## Implementierung
For our project we use React and PouchDB for the WebApp and CouchDB as server, for reasons, which are explained here: [Latex]()


## Quellen

[Docker Couchbase](https://hub.docker.com/_/couchbase)

[Pouch Db](https://couchdb.apache.org/)

[React](https://reactjs.org )



