const { expect } = require("chai");
const sinon = require("sinon");
const User = require("../models/userModel"); // Assuming you have a User model defined
const { deleteUser } = require("../controllers/adminController");

describe("deleteUser", () => {
  it("should return status 200 and success message when user deletion is successful", async () => {
    // Mock the User.findByIdAndDelete function
    const deleteResult = { n: 1, deletedCount: 1 };
    sinon.stub(User, "findByIdAndDelete").yields(null, deleteResult);

    // Create fake request and response objects
    const req = {
      params: { id: "user-id" },
    };
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      send: sinon.stub(), // Stub for res.send()
    };

    // Call the controller function
    await deleteUser(req, res);

    // Assert the expected behavior
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.send.calledWith({ message: "User deleted successfully." })).to.be
      .true;

    // Restore the original behavior of User.findByIdAndDelete
    User.findByIdAndDelete.restore();
  });

  it("should return status 500 and an error message when an error occurs during user deletion", async () => {
    // Mock the User.findByIdAndDelete function to throw an error
    const error = new Error("Database error");
    sinon.stub(User, "findByIdAndDelete").yields(error);

    // Create fake request and response objects
    const req = {
      params: { id: "user-id" },
    };
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      send: sinon.stub(), // Stub for res.send()
    };

    // Call the controller function
    await deleteUser(req, res);

    // Assert the expected behavior
    expect(res.status.calledWith(500)).to.be.true;
    expect(
      res.send.calledWith({
        error: "An error occurred while deleting the user.",
      })
    ).to.be.true;

    // Restore the original behavior of User.findByIdAndDelete
    User.findByIdAndDelete.restore();
  });

  it("should return status 500 and an error message when an exception occurs during user deletion", async () => {
    // Mock the User.findByIdAndDelete function to throw an exception
    sinon
      .stub(User, "findByIdAndDelete")
      .throws(new Error("Exception occurred"));

    // Create fake request and response objects
    const req = {
      params: { id: "user-id" },
    };
    const res = {
      status: sinon.stub().returnsThis(), // Chainable method stub
      send: sinon.stub(), // Stub for res.send()
    };

    // Call the controller function
    await deleteUser(req, res);

    // Assert the expected behavior
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.send.calledWith({ error: " Ooops! error in deleting the user" }))
      .to.be.true;

    // Restore the original behavior of User.findByIdAndDelete
    User.findByIdAndDelete.restore();
  });
});
