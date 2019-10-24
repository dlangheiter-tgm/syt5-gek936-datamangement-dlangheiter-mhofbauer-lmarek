#!/bin/bash

HOST="localhost:5984"
USER="admin"
PWD="admin"

function send_req() {
  curl -L -s -o /dev/null -w "%{http_code}" --user "$USER:$PWD" -X $2 "$HOST/$1"
}

res=$(send_req shopping-list PUT)
