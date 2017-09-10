var express = require('express');
var app = express();
var port = 3000;
var Drone = require('parrot-minidrone');
const drone = new Drone({
    autoconnect: false
});

var NodeServerMinidrone = function () {

    app.get('/', function (request, response) {
        response.status(200).json({serverup: true});
    });

    app.post('/connect', function (request, response) {
        // TODO : set drone name as a request parameter or on json input.
        if (drone.network == null) {
            drone.connect();
            response.status(200).json({connected: true});
            return;
        }

        if (!drone.network.connected) {
            drone.connect();
            response.status(200).json({connected: true});
        }
        // TODO : give drone name on each response.
        if (drone.network.connected) {
            response.status(200).json({connected: true});
        } else {
            response.status(500).json({connected: false});
        }
    });

    // TODO : find a way to disconnect from bluetooth properly....
    app.post('/disconnect', function (request, response) {
        if (drone.network == null) {
            response.status(200).json({connected: false});
            return;
        }
        if (drone.network.connected && drone.isFlying()) {
            this.land();
        }
        drone.emergency();
        response.status(200).json({connected: false});
    });

    app.post('/takeoff', function (request, response) {
        console.log("Taking off...");
        drone.takeoffOrLand();
        response.status(200).json({takeoff: true});
    });

    app.post('/land', function (request, response) {
        console.log("Stopping activities and landing...");
        drone.land();
        response.status(200).json({landed: true});
    });

    app.post('/up', function (request, response) {
        var speed = request.query.speed;
        if (speed == undefined) {
            console.log("undefined speed value, default to 10");
            speed = 10;
        }
        console.log("Altitude up : " + speed);
        const flightParams = {
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0
        };
        flightParams.altitude = speed;
        drone.setFlightParams(flightParams);
        response.status(200).json({up: true});
    });

    app.post('/down', function (request, response) {
        var speed = request.query.speed;
        if (speed == undefined) {
            console.log("undefined speed value, default to 10");
            speed = 10;
        }
        console.log("Altitude down : " + speed);
        const flightParams = {
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0
        };
        flightParams.altitude = -speed;
        drone.setFlightParams(flightParams);
        response.status(200).json({up: true});
    });

    app.post('/backward', function (request, response) {
        var speed = request.query.speed;
        if (speed == undefined) {
            console.log("undefined speed value, default to 10");
            speed = 10;
        }
        console.log("backward : " + speed);
        const flightParams = {
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0
        };
        flightParams.pitch = -speed;
        drone.setFlightParams(flightParams);
        response.status(200).json({backward: true});
    });

    app.post('/forward', function (request, response) {
        var speed = request.query.speed;
        if (speed == undefined) {
            console.log("undefined speed value, default to 10");
            speed = 10;
        }
        console.log("forward : " + speed);
        const flightParams = {
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0
        };
        flightParams.pitch = speed;
        drone.setFlightParams(flightParams);
        response.status(200).json({forward: true});
    });

    app.post('/roll', function (request, response) {
        var speed = request.query.speed;
        if (speed == undefined) {
            console.log("undefined speed value, default to 10");
            speed = 10;
        }
        console.log("roll : " + speed);
        const flightParams = {
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0
        };
        flightParams.roll = speed;
        drone.setFlightParams(flightParams);
        response.status(200).json({roll: true});
    });

    app.post('/cycle', function (request, response) {
        var speed = request.query.speed;
        if (speed == undefined) {
            console.log("undefined speed value, default to 10");
            speed = 10;
        }
        console.log("cycle : " + speed);
        const flightParams = {
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0
        };
        flightParams.yaw = speed;
        drone.setFlightParams(flightParams);
        response.status(200).json({cycle: true});
    });


    app.post('/stop', function (request, response) {
        drone.setFlightParams({
            yaw: 0,
            pitch: 0,
            roll: 0,
            altitude: 0
        });
        response.status(200).json({stop: true});
    });


    app.post('/exit', function (request, response) {
        response.status(200).json({exit: true});
        process.exit();
    });

    app.listen(port);
    console.log('Node.js minidrone express server started on port %s', port);

};

module.exports = NodeServerMinidrone;


