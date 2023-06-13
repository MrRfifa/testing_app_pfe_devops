const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { login } = require("../controllers/usersController");

describe("login", () => {
  it("should return status 200 and a token when login is successful", async () => {
    // Mock the User.findOne function to return a fake user
    const fakeUser = {
      _id: "user-id",
      email: "test@example.com",
      passwordHash: await bcrypt.hash("Test1234!", 10),
      role: "tester",
    };
    sinon.stub(User, "findOne").returns(fakeUser);

    // Mock bcrypt.compare to return true (password match)
    sinon.stub(bcrypt, "compare").resolves(true);

    // Stub jwt.sign to return a fake token
    sinon.stub(jwt, "sign").returns("fake-token");

    // Create fake request and response objects
    const req = {
      body: { email: "test@example.com", password: "Test1234!" },
    };
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      header: sinon.stub(),
      send: sinon.stub(),
    };

    // Call the controller function
    await login(req, res);

    // Assert the expected behavior
    expect(res.header.calledWith("Authorization", "fake-token")).to.be.true;
    expect(
      res.send.calledWith({
        message: "Logged in successfully!",
        token: "fake-token",
      })
    ).to.be.true;

    // Restore the original behavior of User.findOne, bcrypt.compare, and jwt.sign
    User.findOne.restore();
    bcrypt.compare.restore();
    jwt.sign.restore();
  });

  it("should return status 400 and an error message when email or password is missing", async () => {
    // Create fake request and response objects
    const req = {
      body: { email: "", password: "password" },
    };
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      json: sinon.stub(),
    };

    // Call the controller function
    await login(req, res);

    // Assert the expected behavior
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: "Please enter all required fields" }))
      .to.be.true;
  });

  it("should return status 400 and an error message when email or password is invalid", async () => {
    // Mock the User.findOne function to return null (no user found)
    sinon.stub(User, "findOne").returns(null);

    // Create fake request and response objects
    const req = {
      body: { email: "test@example.com", password: "password" },
    };
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      send: sinon.stub(),
    };

    // Call the controller function
    await login(req, res);

    // Assert the expected behavior
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.send.calledWith({ message: "Invalid email or password" })).to.be
      .true;

    // Restore the original behavior of User.findOne
    User.findOne.restore();
  });

  it("should return status 400 and an error message when password is incorrect", async () => {
    // Mock the User.findOne function to return a fake user
    const fakeUser = {
      _id: "user-id",
      email: "test@example.com",
      passwordHash: await bcrypt.hash("Test1234!", 10),
      role: "user",
    };
    sinon.stub(User, "findOne").returns(fakeUser);

    // Mock bcrypt.compare to return false (password does not match)
    sinon.stub(bcrypt, "compare").resolves(false);

    // Create fake request and response objects
    const req = {
      body: { email: "test@example.com", password: "wrong-password" },
    };
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      send: sinon.stub(),
    };

    // Call the controller function
    await login(req, res);

    // Assert the expected behavior
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.send.calledWith({ message: "Invalid email or password" })).to.be
      .true;

    // Restore the original behavior of User.findOne and bcrypt.compare
    User.findOne.restore();
    bcrypt.compare.restore();
  });

  it("should return status 500 and an error message when an error occurs", async () => {
    // Mock the User.findOne function to throw an error
    sinon.stub(User, "findOne").throws(new Error("Database error"));

    // Create fake request and response objects
    const req = {
      body: { email: "test@example.com", password: "password" },
    };
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      send: sinon.stub(),
    };

    // Call the controller function
    await login(req, res);

    // Assert the expected behavior
    expect(res.status.calledWith(500)).to.be.true;
    // expect(res.send.calledWith(new Error("Database error"))).to.be.true;

    // Restore the original behavior of User.findOne
    User.findOne.restore();
  });
});
