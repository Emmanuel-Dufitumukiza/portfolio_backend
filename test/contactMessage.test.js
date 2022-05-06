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

     describe("POST /api/messages", ()=>{
        it("Sending contact message", (done)=>{

            const msg = {
                names: "James Kim",
                email: "james@gmail.com",
                message: "Great portfolio, keep it up!"
            }

            chai.request(server)
            .post("/api/messages")
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

         describe("GET /api/messages", ()=>{
            it("get contact messages", (done)=>{
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjZhNTNlNGIxNmY5NWI0YTUzZmVhZWIiLCJpYXQiOjE2NTE4NDgyMzd9.6iGmc321Cs-Ox1LZh9wTl7_jVgbyxjvNxGJ7RoF_cPE";
    
                chai.request(server)
                .get("/api/messages")
                .set({ Authorization: `${token}`})
                .end((err, response)=>{
                    response.should.have.status(200);
                done();
                })
            })
        });
});