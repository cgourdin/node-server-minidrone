var request = require('request');
var NodeServerMiniDrone = require("../src/node_server");
var NodeServerMiniDrone = new NodeServerMiniDrone();

describe("The Parrot Minidrone node server",function(){
    
    it("should be running.", function(done) {        
        request("http://localhost:3000/", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    
    it("should take off drone or land", function(done) {
        request.post("http://localhost:3000/takeoff", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    
});
