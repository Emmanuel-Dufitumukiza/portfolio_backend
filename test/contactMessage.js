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
                message: "hjgjdkglksglkdhjlkfhlkshlkshskldhhhhhdgssdshhhhhhhhhdsghgshhhhhhhhhhhhhhhhhhhhhhsjdshjsdhjkshslhshs"
            }

            chai.request(server)
            .post("/api/sendMessage")
            .send(msg)
            .end((err, response)=>{
                response.should.have.status(200);
                response.text.should.be.eq("Message Was Sent Successfully!");
            done();
            })
        })
    });
});