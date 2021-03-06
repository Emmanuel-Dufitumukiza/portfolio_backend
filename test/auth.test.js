const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("Authentication API", ()=>{
    /**
     * Test the Get all users route
     */

    describe("GET /api/users", ()=>{
        it("It should GET all users who have an account", (done)=>{
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU4NGExNmEyZjRjZTUzNGE4YWU3OGYiLCJpYXQiOjE2NTA0NzI1NTJ9.XvaHajfmaslvNqlD40TcooK7lLi9IOvs3fox0qnvgZc";

            chai.request(server)
            .get("/api/users")
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("array");
            done();
            })
        })

        it("It should GET single user", (done)=>{
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU4NGExNmEyZjRjZTUzNGE4YWU3OGYiLCJpYXQiOjE2NTA0NzI1NTJ9.XvaHajfmaslvNqlD40TcooK7lLi9IOvs3fox0qnvgZc";
            let userId = "62584a16a2f4ce534a8ae78f"

            chai.request(server)
            .get("/api/users/"+userId)
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
            done();
            })
        })

        it("It should GET logged in user", (done)=>{
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU4NGExNmEyZjRjZTUzNGE4YWU3OGYiLCJpYXQiOjE2NTA0NzI1NTJ9.XvaHajfmaslvNqlD40TcooK7lLi9IOvs3fox0qnvgZc";

            chai.request(server)
            .get("/api/users/info/loggedinuser")
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
            done();
            })
        })

        it("It should Not GET logged in user with invalid token", (done)=>{
            const token = "eyJhbGciOiJIUzI1NiIsInWQiOiI2MjU4NGExNmEyZjRjZTUzNGE4YWU3OGYiLCJpYXQiOjE2NTA0NzI1NTJ9.XvaHajfmaslvNqlD40TcooK7lLi9IOvs3fox0qnvgZc";

            chai.request(server)
            .get("/api/users/info/loggedinuser")
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Invalid Token");
            done();
            })
        })

        it("It should Not GET logged in user without token", (done)=>{

            chai.request(server)
            .get("/api/users/info/loggedinuser" )
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Access Denied! You need to login first");
            done();
            })
        })

    })

    /**
     * Test the POST register user route
     */

     describe("POST /api/users", ()=>{
        it("It should register new user", (done)=>{
            const user = {
                username: "Manzi Patrick",
                email: "patrick@gmail.com",
                password: "1234567"
            }

            chai.request(server)
            .post("/api/users")
            .send(user)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
            done();
            })
        })
    });

    describe("POST /api/users/login", ()=>{
        it("It should login user who have an account", (done)=>{
            const user = {
                email: "emmy@gmail.com",
                password: "123456"
            }

            chai.request(server)
            .post("/api/users/login")
            .send(user)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
            done();
            })
        })
    });
    
    describe("POST /api/users/login", ()=>{
        it("It should not login user with invalid credentials", (done)=>{
            const user = {
                email: "emmy@gmail.com",
                password: "rca.acv.rw"
            }

            chai.request(server)
            .post("/api/users/login")
            .send(user)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
            done();
            })
        })
    });

    describe("PATCH /api/users/:id", ()=>{
        it("It should update user credentials", (done)=>{
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU4NGExNmEyZjRjZTUzNGE4YWU3OGYiLCJpYXQiOjE2NTA0NzI1NTJ9.XvaHajfmaslvNqlD40TcooK7lLi9IOvs3fox0qnvgZc";

            const user = {
                username: "Emmy Dufitumukiza",
                password: "123456",
                currentPassword: "123456",
                profileImage: {
                    url: "http://cloudinary/images/gsfhsjk/sdhsdkg.jpg",
                    public_id: "hdsdfsdg"
                }
            }

            chai.request(server)
            .patch("/api/users")
            .set({ Authorization: `${token}`})
            .send(user)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
            done();
            })
        })
    });

});