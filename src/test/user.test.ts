import request from "supertest";

import User from '../api/models/user';
import Server from '../api/models/server'
import { dbConnect, dbClose } from "../api/db/connection";
import { Model } from "sequelize/types";

const server = new Server();

beforeAll(() => { 

  dbConnect();

});

afterAll(() => {

  dbClose();
  
});

describe("Users endpoint integration testing", () => {

  describe("GET    /api/users/", () => {

    test("Receive complete User DB", async () => {

      // Prepare data
      const user1 = await User.create({
        division_id: 1,
        full_name: "Person One",
        phone: 12345678,
        age: 10,
        email: "one@person.com",
        position: "first",
        address: "test street 1",
        state: true
      });

      const user2 = await User.create({
        division_id: 2,
        full_name: "Person Two",
        phone: 87654321,
        age: 20,
        email: "two@person.com",
        position: "second",
        address: "test street 2",
        state: true
      });
    
      // Act and verify results
      await request(server.app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
          // Check the response type and length
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
    
          // Check the response data
          // Ver como acceder a ID
          //expect(response.body[0]._id).toBe(user1.pk);
          expect(response.body[0].division_id).toBe(user1.get('division_id'));
          expect(response.body[0].full_name).toBe(user1.get('full_name'));
          expect(response.body[0].phone).toBe(user1.get('phone'));
          expect(response.body[0].age).toBe(user1.get('age'));
          expect(response.body[0].email).toBe(user1.get('email'));
          expect(response.body[0].position).toBe(user1.get('position'));
          expect(response.body[0].address).toBe(user1.get('address'));
          expect(response.body[0].state).toBe(user1.get('state'));

          expect(response.body[1].division_id).toBe(user2.get('division_id'));
          expect(response.body[1].full_name).toBe(user2.get('full_name'));
          expect(response.body[1].phone).toBe(user2.get('phone'));
          expect(response.body[1].age).toBe(user2.get('age'));
          expect(response.body[1].email).toBe(user2.get('email'));
          expect(response.body[1].position).toBe(user2.get('position'));
          expect(response.body[1].address).toBe(user2.get('address'));
          expect(response.body[1].state).toBe(user2.get('state'));;
        });
      
      // Teardown data
      await user1.destroy();
      await user2.destroy();      
    });
  });

  describe("GET    /api/users/:id", async () => {

    const user = await User.create({
      division_id: 1,
      full_name: "Person One",
      phone: 12345678,
      age: 10,
      email: "one@person.com",
      position: "first",
      address: "test street 1",
      state: true
    });

    afterAll( async () => {
      await user.destroy();
    });

    test("Request valid User ID, receive complete user info", async () => {

      await request(server.app)
        .get("/api/users/" + user.get('id').toString())
        .expect(200)
        .then((response) => {
          // Check the response type and length
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
    
          // Check the response data
          expect(response.body[0].division_id).toBe(user.get('division_id'));
          expect(response.body[0].full_name).toBe(user.get('full_name'));
          expect(response.body[0].phone).toBe(user.get('phone'));
          expect(response.body[0].age).toBe(user.get('age'));
          expect(response.body[0].email).toBe(user.get('email'));
          expect(response.body[0].position).toBe(user.get('position'));
          expect(response.body[0].address).toBe(user.get('address'));
          expect(response.body[0].state).toBe(user.get('state'));
        });
    });

    test("Request invalid User ID, receive error", async () => {

      await request(server.app)
        .get("/api/users/" + '999')
        .expect(400);
    });
  });

  describe("PUT    /api/users/:id", async () => {

    const user = await User.create({
        division_id: 1,
        full_name: "Person One",
        phone: 12345678,
        age: 10,
        email: "one@person.com",
        position: "first",
        address: "test street 1",
        state: true
    });

    afterAll(async () => {
      await user.destroy();
    });

    test("Update valid User data", async () => {

      const data = {
        division_id: 2,
        full_name: "New Person",
        phone: 87654321,
        age: 30,
        email: "new@person.com",
        position: "new",
        address: "new street 1",
        state: true
      };
    
      await request(server.app)
        .put("/api/users/" + user.get('id').toString())
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body.id).toBeTruthy();
          expect(response.body.division_id).toBe(data.division_id);
          expect(response.body.full_name).toBe(data.full_name);
          expect(response.body.phone).toBe(data.phone);
          expect(response.body.age).toBe(data.age);
          expect(response.body.email).toBe(data.email);
          expect(response.body.position).toBe(data.position);
          expect(response.body.address).toBe(data.address);
          expect(response.body.state).toBe(data.state);
    
          // Check the data in the database
          const id = response.body.id;
          const user = await User.findOne( id );
          expect(user).toBeTruthy();
          expect(user.get('division_id')).toBe(data.division_id);
          expect(user.get('full_name')).toBe(data.full_name);
          expect(user.get('phone')).toBe(data.phone);
          expect(user.get('age')).toBe(data.age);
          expect(user.get('email')).toBe(data.email);
          expect(user.get('position')).toBe(data.position);
          expect(user.get('address')).toBe(data.address);
        });
    });

    test("Update User with incomplete data, receive error", async () => {

      const data = {
        id: 1,
        division_id: 1,
        full_name: "",
        phone: 12345678,
        age: 10,
        email: "",
        position: "",
        address: "",
        state: true
      };
    
      await request(server.app)
        .put("/api/users/" + data.id.toString())
        .send(data)
        .expect(400);
    });

    test("Update invalid User data, receive error", async () => {

      const data = {
        id: 1,
        division_id: 1,
        full_name: 1234,
        phone: "12345678",
        age: "10",
        email: "trash",
        position: "first",
        address: "test street 1",
        state: true
      };
    
      await request(server.app)
        .put("/api/users/" + user.get('id').toString())
        .send(data)
        .expect(400);
    });
  });

  describe("POST   /api/users/", () => {

    test("Create valid User", async () => {

      const data = {
        division_id: 1,
        full_name: "Person One",
        phone: 12345678,
        age: 10,
        email: "one@person.com",
        position: "first",
        address: "test street 1",
        state: true
      };
    
      await request(server.app)
        .post("/api/users")
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body.id).toBeTruthy();
          expect(response.body.division_id).toBe(data.division_id);
          expect(response.body.full_name).toBe(data.full_name);
          expect(response.body.phone).toBe(data.phone);
          expect(response.body.age).toBe(data.age);
          expect(response.body.email).toBe(data.email);
          expect(response.body.position).toBe(data.position);
          expect(response.body.address).toBe(data.address);
          expect(response.body.state).toBe(data.state);
    
          // Check the data in the database
          const id = response.body.id;
          const user = await User.findOne( id );
          expect(user).toBeTruthy();
          expect(user.get('division_id')).toBe(data.division_id);
          expect(user.get('full_name')).toBe(data.full_name);
          expect(user.get('phone')).toBe(data.phone);
          expect(user.get('age')).toBe(data.age);
          expect(user.get('email')).toBe(data.email);
          expect(user.get('position')).toBe(data.position);
          expect(user.get('address')).toBe(data.address);

          await user.destroy();
        });

    });

    test("Create User with incomplete data, receive error", async () => {

      const data = {
        id: 1,
        division_id: 1,
        full_name: "",
        phone: 12345678,
        age: 10,
        email: "",
        position: "",
        address: "",
        state: true
      };
    
      await request(server.app)
        .post("/api/users")
        .send(data)
        .expect(400);
    });
  });

  describe("PATCH  /api/users/:id", async () => {

    const user = await User.create({
      division_id: 1,
      full_name: "Person One",
      phone: 12345678,
      age: 10,
      email: "one@person.com",
      position: "first",
      address: "test street 1",
      state: true
    });

    afterAll(async () => {
      await user.destroy();
    });

    test("Update valid User ID", async () => {

      const data = {
        division_id: 2,
        full_name: "New Person",
        phone: 87654321,
        age: 30,
        email: "new@person.com",
        position: "new",
        address: "new street 1",
        state: true
      };
    
      await request(server.app)
        .patch("/api/users/" + user.get('id').toString())
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body.id).toBeTruthy();
          expect(response.body.division_id).toBe(data.division_id);
          expect(response.body.full_name).toBe(data.full_name);
          expect(response.body.phone).toBe(data.phone);
          expect(response.body.age).toBe(data.age);
          expect(response.body.email).toBe(data.email);
          expect(response.body.position).toBe(data.position);
          expect(response.body.address).toBe(data.address);
          expect(response.body.state).toBe(data.state);
    
          // Check the data in the database
          const id = response.body.id;
          const user = await User.findOne( id );
          expect(user).toBeTruthy();
          expect(user.get('division_id')).toBe(data.division_id);
          expect(user.get('full_name')).toBe(data.full_name);
          expect(user.get('phone')).toBe(data.phone);
          expect(user.get('age')).toBe(data.age);
          expect(user.get('email')).toBe(data.email);
          expect(user.get('position')).toBe(data.position);
          expect(user.get('address')).toBe(data.address);
        });

    });

    test("Update invalid User ID, receive error", async () => {

      const data = '';
      const fakeId = "fake lol";
    
      await request(server.app)
        .patch("/api/users/" + fakeId)
        .send(data)
        .expect(400) 
    });
  });

  describe("DELETE /api/users/:id", () => {

    test("Request delete valid User ID", async () => {

      const user = await User.create({
        division_id: 1,
        full_name: "Person One",
        phone: 12345678,
        age: 10,
        email: "one@person.com",
        position: "first",
        address: "test street 1",
        state: true
      });

      const id = user.get('id'); 
    
      await request(server.app)
        .delete("/api/users/" + id.toString())
        .expect(204)
        .then(async () => {
          return expect(await User.findOne( id )).toBeFalsy();
        });
      
      user.destroy();
    });

    test("Request delete invalid User ID, receive error", async () => {

      const fakeId = "fake lol";
    
      await request(server.app)
        .delete("/api/users/" + fakeId)
        .expect(400)

    });
  });
});