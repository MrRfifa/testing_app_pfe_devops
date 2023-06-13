const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Assuming you have a User model defined
const { register } = require("../controllers/adminController");
const { isAdmin } = require("../middlewares/Auth");

describe("Admin Controller - Register", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        lastname: "Doe",
        firstname: "John",
        email: "johndoe@example.com",
        password: "Test123!",
        passwordVerify: "Test123!",
        role: "tester",
      },
      headers: {
        authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Y0ZTlmMmYxMjE0ZWY2MzBiOTVkZjYiLCJ1c2VyUm9sZSI6InRlc3RlciIsImlhdCI6MTY3ODQ1ODU1N30.DVI3KHV-wQ6a65Yl-S1dtjLCnAzC0SxGPaAoLX_pq0A",
      },
    };

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return status 200 with success message when registration is successful", async () => {
    sinon.stub(User, "findOne").returns(null);
    sinon.stub(User.prototype, "save");
    await register(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: "Registred successfully!" })).to.be
      .true;
  });

  it("should return status 400 with error message when user with the same email already exists", async () => {
    sinon.stub(User, "findOne").returns({ email: req.body.email });

    await register(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        error: "An account with those informations already exists",
      })
    ).to.be.true;
  });

  it("should return status 400 with error message when required fields are missing", async () => {
    req.body.lastname = "";
    sinon.stub(User, "findOne").returns(null);

    await register(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: "Please enter all required fields" }))
      .to.be.true;
  });

  it("should return status 400 with error message when password is invalid", async () => {
    req.body.password = "invalidpassword";
    sinon.stub(User, "findOne").returns(null);

    await register(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        error: "Invalid password : Password must contain ...",
      })
    ).to.be.true;
  });

  it("should return status 400 with error message when passwords do not match", async () => {
    req.body.passwordVerify = "differentpassword";
    sinon.stub(User, "findOne").returns(null);

    await register(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: "Please enter the same password" })).to
      .be.true;
  });

  it("should return status 500 with error message when an error occurs during registration", async () => {
    sinon.stub(User, "findOne").throws(new Error("Test error"));

    await register(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: "error in adding user" })).to.be.true;
  });
});
