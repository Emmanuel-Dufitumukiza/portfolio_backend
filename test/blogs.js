const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("Blogs API", ()=>{
    /**
     * Test the Get all blogs route
     */

    describe("GET /api/blogs", ()=>{
    
        it("It should GET all created blogs", (done)=>{
            chai.request(server)
            .get("/api/blogs")
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("array");
            done();
            })
        })

        it("It should Not GET all created blogs", (done)=>{
            chai.request(server)
            .get("/api/blo")
            .end((err, response)=>{
                response.should.have.status(404);
            done();
            })
        })
    })

    /**
     * Test the Get single blog route
     */ 

     describe("GET /api/blogs/:id", ()=>{
        it("It should GET single blog by ID", (done)=>{
            let id = "626839ab85375fcecaddbbd2";
            chai.request(server)
            .get("/api/blogs/" + id)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property("_id").eq("626839ab85375fcecaddbbd2");
                response.body.should.have.property("title");
                response.body.should.have.property("text");
                response.body.should.have.property("likes");
                response.body.should.have.property("comments");
                response.body.should.have.property("fileUrl");
            done();
            })
        });

        it("It should NOT GET single blog by ID", (done)=>{
            let id = "62522342";
            chai.request(server)
            .get("/api/blogs/" + id)
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Blog does not exist");
            done();
            })
        });
    });

    /**
     * Test the POST blog route
     */ 

     describe("POST /api/blogs/new", ()=>{
        it("It should POST a new blog", (done)=>{
            const blog = {
                title: "NodeJS Tutorial",
                text: "hjgkjfsjlkgkksglkssgs",
                fileUrl: "https://cloudinary/images/hjfaaj",
                filePublicId: "gkjsgklslkgs"
            }
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU0NjEyZDY4YzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE2NDk5NDI4NDZ9.fysAvT-Ambpy9TK5VfFx1K014dTNeHAn6MucxohctCQ";
            chai.request(server)
            .post("/api/blogs/new")
            .send(blog)
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property("_id");
                response.body.should.have.property("title").eq("NodeJS Tutorial");
                response.body.should.have.property("text").eq("hjgkjfsjlkgkksglkssgs");
                response.body.should.have.property("likes");
                response.body.should.have.property("comments");
                response.body.should.have.property("fileUrl").eq("https://cloudinary/images/hjfaaj");
                response.body.should.have.property("filePublicId").eq("gkjsgklslkgs");
            done();
            })
        });

        it("It should NOT POST a new blog without token", (done)=>{
            const blog = {
                title: "NodeJS Tutorial",
                text: "hjgkjfsjlkgkksglkssgs",
                fileUrl: "https://cloudinary/images/hjfaaj",
                filePublicId: "gkjsgklslkgs"
            }

            chai.request(server)
            .post("/api/blogs/new")
            .send(blog)
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Access Denied! You need to login first");
            done();
            })
        });

        it("It should NOT POST a new blog with invalid token", (done)=>{
            const blog = {
                title: "NodeJS Tutorial",
                text: "hjgkjfsjlkgkksglkssgs",
                fileUrl: "https://cloudinary/images/hjfaaj",
                filePublicId: "gkjsgklslkgs"
            }
            const token = "dfjkhdfl;hhss.sdkjlkshshsh.jgjsdhlks";
            chai.request(server)
            .post("/api/blogs/new")
            .send(blog)
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Invalid Token");
            done();
            })
        });

    });

    /**
     * Test the PATCH blog route
     */ 

     describe("PATCH /api/blogs/:id", ()=>{
        it("It should PATCH an existing blog", (done)=>{
            const blog = {
                title: "NodeJS Framework",
                text: "hjgkjfsjlkgkksglkssgs",
                fileUrl: "https://cloudinary/images/hjfaaj",
                filePublicId: "gkjsgklslkgs"
            }
            const id = "626839ab85375fcecaddbbd2"
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU0NjEyZDY4YzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE2NDk5NDI4NDZ9.fysAvT-Ambpy9TK5VfFx1K014dTNeHAn6MucxohctCQ";
            chai.request(server)
            .patch("/api/blogs/"+id)
            .send(blog)
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property("_id");
                response.body.should.have.property("title").eq("NodeJS Framework");
                response.body.should.have.property("text").eq("hjgkjfsjlkgkksglkssgs");
                response.body.should.have.property("likes");
                response.body.should.have.property("comments");
                response.body.should.have.property("fileUrl").eq("https://cloudinary/images/hjfaaj");
                response.body.should.have.property("filePublicId").eq("gkjsgklslkgs");
            done();
            })
        });

        it("It should NOT PATCH an existing blog with invalid blog id", (done)=>{
            const blog = {
                title: "NodeJS Framework",
                text: "hjgkjfsjlkgkksglkssgs",
                fileUrl: "https://cloudinary/images/hjfaaj",
                filePublicId: "gkjsgklslkgs"
            }
            const id = "hggksdglksdlkglksdg"
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU0NjEyZDY4YzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE2NDk5NDI4NDZ9.fysAvT-Ambpy9TK5VfFx1K014dTNeHAn6MucxohctCQ";
            chai.request(server)
            .patch("/api/blogs/"+id)
            .send(blog)
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Blog does not exist");
            done();
            })
        });

        it("It should PATCH an existing blog without title", (done)=>{
            const blog = {
                title: "",
                text: "hjgkjfsjlkgkksglkssgs",
                fileUrl: "https://cloudinary/images/hjfaaj",
                filePublicId: "gkjsgklslkgs"
            }
            const id = "626839ab85375fcecaddbbd2"
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU0NjEyZDY4YzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE2NDk5NDI4NDZ9.fysAvT-Ambpy9TK5VfFx1K014dTNeHAn6MucxohctCQ";
            chai.request(server)
            .patch("/api/blogs/"+id)
            .send(blog)
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(400);
                response.body.should.be.a("object");
            done();
            })
        });

        it("It should NOT PATCH an existing blog without token", (done)=>{
            const blog = {
                title: "NodeJS Tutorial",
                text: "hjgkjfsjlkgkksglkssgs",
                fileUrl: "https://cloudinary/images/hjfaaj",
                filePublicId: "gkjsgklslkgs"
            }
            const id = "626839ab85375fcecaddbbd2"
            chai.request(server)
            .patch("/api/blogs/"+id)
            .send(blog)
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Access Denied! You need to login first");
            done();
            })
        });

        it("It should NOT PATCH an existing blog with invalid token", (done)=>{
            const blog = {
                title: "NodeJS Framework",
                text: "hjgkjfsjlkgkksglkssgs",
                fileUrl: "https://cloudinary/images/hjfaaj",
                filePublicId: "gkjsgklslkgs"
            }
            const id = "626839ab85375fcecaddbbd2"
            const token = "dfjkhdfl;hhss.sdkjlkshshsh.jgjsdhlks";
            chai.request(server)
            .patch("/api/blogs/"+id)
            .send(blog)
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Invalid Token");
            done();
            })
        });

    });
    
    /**
     * Test the DELETE blog route
     */ 

     describe("DELETE /api/blogs/delete/:id", ()=>{
        // it("It should DELETE an existing blog", (done)=>{
        //     let id = "626839ab85375fcecaddbbd2";
        //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU0NjEyZDY4YzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE2NDk5NDI4NDZ9.fysAvT-Ambpy9TK5VfFx1K014dTNeHAn6MucxohctCQ";
        //     chai.request(server)
        //     .delete("/api/blogs/delete/" + id)
        //     .set({ Authorization: `${token}`})
        //     .end((err, response)=>{
        //         response.should.have.status(200);
        //         response.text.should.be.eq("Blog deleted successfully");
        //     done();
        //     })
        // });

        it("It should NOT DELETE blog with invalid id", (done)=>{
            let id = "62522342";
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU0NjEyZDY4YzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE2NDk5NDI4NDZ9.fysAvT-Ambpy9TK5VfFx1K014dTNeHAn6MucxohctCQ";
            chai.request(server)
            .delete("/api/blogs/delete/" + id)
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Blog does not exist");
            done();
            })
        });

        it("It should NOT DELETE blog without token ", (done)=>{
            let id = "626839ab85375fcecaddbbd2";
            chai.request(server)
            .delete("/api/blogs/delete/" + id)
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Access Denied! You need to login first");
            done();
            })
        });

        it("It should NOT DELETE blog with invalid token ", (done)=>{
            let id = "626839ab85375fcecaddbbd2";
            const token = "eyJhbGciOiJIUz0NjEyZDY4YzQyNTRlZmNmYWYzYJpYXQiOjE2NDk5NDI4NDZ9.fysAvT-Ambpy9TK5VfFx1K014dTNeHAn6MucxohctCQ";
            chai.request(server)
            .delete("/api/blogs/delete/" + id)
            .set({ Authorization: `${token}`})
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Invalid Token");
            done();
            })
        });
    });

});

/**
 * Test PATCH Like a blog
 */

 describe("PATCH /api/blogs/like/:userId/:blogId", ()=>{
    it("It should Like an existing blog", (done)=>{
        let id = "626839ab85375fcecaddbbd2";
        let userId = "62505c35c6766aff52b87fec";
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU0NjEyZDY4YzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE2NDk5NDI4NDZ9.fysAvT-Ambpy9TK5VfFx1K014dTNeHAn6MucxohctCQ";
        chai.request(server)
        .patch("/api/blogs/like/" + userId +"/"+id)
        .set({ Authorization: `${token}`})
        .end((err, response)=>{
            response.should.have.status(200);
        done();
        })
    });

    it("It should Not Like an existing blog without token", (done)=>{
        let id = "626839ab85375fcecaddbbd2";
        let userId = "62505c35c6766aff52b87fec";
        chai.request(server)
        .patch("/api/blogs/like/" + userId +"/"+id)
        .end((err, response)=>{
            response.should.have.status(400);
            response.text.should.be.eq("Access Denied! You need to login first");
        done();
        })
    });

    it("It should Not Like an existing blog with invalid token", (done)=>{
        let id = "626839ab85375fcecaddbbd2";
        let userId = "62505c35c6766aff52b87fec";
        const token = "eyJhbGcYzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE5VfFx1K014dTNeHAn6MucxohctCQ";
        chai.request(server)
        .patch("/api/blogs/like/" + userId +"/"+id)
        .set({ Authorization: `${token}`})
        .end((err, response)=>{
            response.should.have.status(400);
            response.text.should.be.eq("Invalid Token");
        done();
        })
    });
});

/**
 * Test PATCH Commenting on a blog
 */

 describe("PATCH /api/blogs/comment/:blogId", ()=>{
    it("It should Add comment an existing blog", (done)=>{
        let id = "626839ab85375fcecaddbbd2";
        let comment = [
            {
            userId: "62505c35c6766aff52b87fec",
            comment: "Greate article"
            }
        ]

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU0NjEyZDY4YzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE2NDk5NDI4NDZ9.fysAvT-Ambpy9TK5VfFx1K014dTNeHAn6MucxohctCQ";
        chai.request(server)
        .patch("/api/blogs/comment/"+id)
        .send(comment)
        .set({ Authorization: `${token}`})
        .end((err, response)=>{
            response.should.have.status(200);
            response.text.should.be.eq("Comment added successfully!");
        done();
        })
    });

    it("It should Not Comment an existing blog without token", (done)=>{
        let id = "626839ab85375fcecaddbbd2";
        let comment = [
            {
            userId: "62505c35c6766aff52b87fec",
            comment: "Greate article"
            }
        ]

        chai.request(server)
        .patch("/api/blogs/comment/"+id)
        .send(comment)
        .end((err, response)=>{
            response.should.have.status(400);
            response.text.should.be.eq("Access Denied! You need to login first");
        done();
        })
    });

    it("It should Not Comment an existing blog with invalid token", (done)=>{
        let id = "626839ab85375fcecaddbbd2";
        let comment = [
            {
            userId: "62505c35c6766aff52b87fec",
            comment: "Greate article"
            }
        ]

        const token = "eyJhbGcYzQyNTRlZmNmYWYzY2UiLCJpYXQiOjE5VfFx1K014dTNeHAn6MucxohctCQ";
        chai.request(server)
        .patch("/api/blogs/comment/"+id)
        .send(comment)
        .set({ Authorization: `${token}`})
        .end((err, response)=>{
            response.should.have.status(400);
            response.text.should.be.eq("Invalid Token");
        done();
        })
    });
});