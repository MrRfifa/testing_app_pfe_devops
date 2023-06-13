const { expect } = require("chai");
const sinon = require("sinon");
const User = require("../models/userModel"); // Assuming you have a User model defined
const { getAllUsers } = require("../controllers/adminController");

describe("getAllUsers", () => {
  it("should return status 200 and an array of users when fetching users is successful", async () => {
    // Mock the User.find function to return a sample array of users
    const sampleUsers = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];
    sinon.stub(User, "find").resolves(sampleUsers);

    // Create fake request and response objects
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      json: sinon.stub(), // Stub for res.json()
    };

    // Call the controller function
    await getAllUsers(req, res);

    // Assert the expected behavior
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(sampleUsers)).to.be.true;

    // Restore the original behavior of User.find
    User.find.restore();
  });

  it("should return status 500 and an error message when an error occurs during user retrieval", async () => {
    // Mock the User.find function to throw an error
    sinon.stub(User, "find").throws(new Error("Database error"));

    // Create fake request and response objects
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      json: sinon.stub(), // Stub for res.json()
    };

    // Call the controller function
    await getAllUsers(req, res);

    // Assert the expected behavior
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: "error in getting users" })).to.be
      .true;

    // Restore the original behavior of User.find
    User.find.restore();
  });
});
