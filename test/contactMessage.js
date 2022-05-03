const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("Contact Message API", ()=>{
    /**
     * Test the send contact message
     */

     describe("POST /api/sendMessage", ()=>{
        it("Sending contact message", (done)=>{

            const msg = {
                names: "James Kim",
                email: "james@gmail.com",
                message: "Great portfolio, keep it up!"
            }

            chai.request(server)
            .post("/api/sendMessage")
            .send(msg)
            .end((err, response)=>{
                response.should.have.status(200);
            done();
            })
        })
    });

        /**
     * Test the get contact messages
     */

         describe("GET /api/getMessages", ()=>{
            it("get contact messages", (done)=>{
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU4NGExNmEyZjRjZTUzNGE4YWU3OGYiLCJpYXQiOjE2NTA0NzI1NTJ9.XvaHajfmaslvNqlD40TcooK7lLi9IOvs3fox0qnvgZc";
    
                chai.request(server)
                .get("/api/getMessages")
                .set({ Authorization: `${token}`})
                .end((err, response)=>{
                    response.should.have.status(200);
                done();
                })
            })
        });
});