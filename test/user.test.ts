import supertest from "supertest";
// importar BD
// importar server
// importar modelo User

beforeEach(() => {
  
  const app = Server.createServer();
  // Debe conectar a una base de pruebas
  dbConnect();

});

afterEach(() => {

  dbClose();
  Server.closeServer();
  
});

describe("Users endpoint integration testing", () => {

  describe("GET    /api/users/", () => {

    test("Receive complete User DB", async () => {
      const user1 = await User.create({
        title: "User 1",
        content: "Lorem ipsum",
      });

      const user2 = await User.create({
        title: "User 1",
        content: "Lorem ipsum",
      });
    
      await supertest(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
          // Check the response type and length
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
    
          // Check the response data
          expect(response.body[0]._id).toBe(user1.id);
          expect(response.body[0].title).toBe(user1.title);
          expect(response.body[0].content).toBe(user1.content);

          expect(response.body[0]._id).toBe(user2.id);
          expect(response.body[0].title).toBe(user2.title);
          expect(response.body[0].content).toBe(user2.content);
        });
      
      // Teardown
      User.delete(user1);
      User.delete(user2);      
    });
  });

  describe("GET    /api/users/:id", () => {

    test("Request valid User ID, receive complete user info", async () => {

      const user = await User.create({
        title: "User 1",
        content: "Lorem ipsum",
      });
    
      await supertest(app)
        .get("/api/users" + user.id)
        .expect(200)
        .then((response) => {
          // Check the response type and length
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
    
          // Check the response data
          expect(response.body[0]._id).toBe(user.id);
          expect(response.body[0].title).toBe(user.title);
          expect(response.body[0].content).toBe(user.content);
        });
      
      // Teardown
      User.delete(user);
    });

    test("Request invalid User ID, receive error", async () => {

      const user = await User.create({
        title: "User 1",
        content: "Lorem ipsum",
      });
    
      await supertest(app)
        .get("/api/users" + user.id)
        .expect(200)
        .then((response) => {
          // Check the response type and length
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
    
          // Check the response data
          expect(response.body[0]._id).toBe(user.id);
          expect(response.body[0].title).toBe(user.title);
          expect(response.body[0].content).toBe(user.content);
        });
      
      // Teardown
      User.delete(user);
    });
  });

  describe("PUT    /api/users/:id", () => {

    test("Update valid User data", async () => {

      const data = {
        title: "User 1",
        content: "Lorem ipsum",
      };
    
      await supertest(app)
        .put("/api/users" + data.id)
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBeTruthy();
          expect(response.body.title).toBe(data.title);
          expect(response.body.content).toBe(data.content);
    
          // Check the data in the database
          const user = await User.findOne({ _id: response.body._id });
          expect(user).toBeTruthy();
          expect(user.title).toBe(data.title);
          expect(user.content).toBe(data.content);
        });

    });

    test("Update User with incomplete data, receive error", async () => {

      const data = {
        title: "User 1",
        content: "Lorem ipsum",
      };
    
      await supertest(app)
        .put("/api/users" + data.id)
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBeTruthy();
          expect(response.body.title).toBe(data.title);
          expect(response.body.content).toBe(data.content);
    
          // Check the data in the database
          const user = await User.findOne({ _id: response.body._id });
          expect(user).toBeTruthy();
          expect(user.title).toBe(data.title);
          expect(user.content).toBe(data.content);
        });

    });

    test("Update invalid User data, receive error", async () => {

      const data = {
        title: "User 1",
        content: "Lorem ipsum",
      };
    
      await supertest(app)
        .put("/api/users")
        .send(data + data.id)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBeTruthy();
          expect(response.body.title).toBe(data.title);
          expect(response.body.content).toBe(data.content);
    
          // Check the data in the database
          const user = await User.findOne({ _id: response.body._id });
          expect(user).toBeTruthy();
          expect(user.title).toBe(data.title);
          expect(user.content).toBe(data.content);
        });
    });
  });

  describe("POST   /api/users/", () => {

    test("Create valid User", async () => {

      const data = {
        title: "User 1",
        content: "Lorem ipsum",
      };
    
      await supertest(app)
        .post("/api/users")
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBeTruthy();
          expect(response.body.title).toBe(data.title);
          expect(response.body.content).toBe(data.content);
    
          // Check the data in the database
          const user = await User.findOne({ _id: response.body._id });
          expect(user).toBeTruthy();
          expect(user.title).toBe(data.title);
          expect(user.content).toBe(data.content);
        });

    });

    test("Create User with incomplete data, receive error", async () => {

      const data = {
        title: "User 1",
        content: "Lorem ipsum",
      };
    
      await supertest(app)
        .post("/api/users")
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBeTruthy();
          expect(response.body.title).toBe(data.title);
          expect(response.body.content).toBe(data.content);
    
          // Check the data in the database
          const user = await User.findOne({ _id: response.body._id });
          expect(user).toBeTruthy();
          expect(user.title).toBe(data.title);
          expect(user.content).toBe(data.content);
        });

    });
  });

  describe("PATCH  /api/users/:id", () => {

    test("Update valid User ID", async () => {

      const data = {
        title: "User 1",
        content: "Lorem ipsum",
      };
    
      await supertest(app)
        .patch("/api/users" + data.id)
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBeTruthy();
          expect(response.body.title).toBe(data.title);
          expect(response.body.content).toBe(data.content);
    
          // Check the data in the database
          const user = await User.findOne({ _id: response.body._id });
          expect(user).toBeTruthy();
          expect(user.title).toBe(data.title);
          expect(user.content).toBe(data.content);
        });

    });

    test("Update invalid User ID, receive error", async () => {

      const data = {
        title: "User 1",
        content: "Lorem ipsum",
      };
    
      await supertest(app)
        .patch("/api/users" + data.id)
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBeTruthy();
          expect(response.body.title).toBe(data.title);
          expect(response.body.content).toBe(data.content);
    
          // Check the data in the database
          const user = await User.findOne({ _id: response.body._id });
          expect(user).toBeTruthy();
          expect(user.title).toBe(data.title);
          expect(user.content).toBe(data.content);
        });
    });
  });

  describe("DELETE /api/users/:id", () => {

    test("Request delete valid User ID", async () => {

      const user = await User.create({
        title: "User 1",
        content: "Lorem ipsum",
      });
    
      await supertest(app)
        .delete("/api/users/" + user.id)
        .expect(204)
        .then(async () => {
          expect(await User.findOne({ _id: user.id })).toBeFalsy();
        });
    });

    test("Request delete invalid User ID, receive error", async () => {

      const user = await User.create({
        title: "User 1",
        content: "Lorem ipsum",
      });
    
      await supertest(app)
        .delete("/api/users/" + user.id)
        .expect(204)
        .then(async () => {
          expect(await User.findOne({ _id: user.id })).toBeFalsy();
        });
    });
  });
});