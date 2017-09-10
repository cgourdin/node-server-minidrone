#!/bin/sh
curl -X POST http://localhost:3000/connect
sleep 3

curl -X POST http://localhost:3000/takeoff
sleep 1

curl -X POST http://localhost:3000/cycle?speed=10
sleep 2

curl -X POST http://localhost:3000/cycle?speed=-30
sleep 2

curl -X POST http://localhost:3000/forward?speed=5
sleep 2

curl -X POST http://localhost:3000/backward?speed=5
sleep 2

curl -X POST http://localhost:3000/land

# Exit the server, for use with test only.
curl -X POST http://localhost:3000/exit



