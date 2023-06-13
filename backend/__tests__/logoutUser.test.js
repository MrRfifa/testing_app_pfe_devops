const { expect } = require("chai");
const sinon = require("sinon");
const { logout } = require("../controllers/usersController");

describe("logout", () => {
  it("should clear the token cookie and return a success message", () => {
    // Create fake request and response objects
    const req = {};
    const res = {
      cookie: sinon.stub().returnsThis(), // Chainable method stub
      send: sinon.stub(),
    };

    // Call the controller function
    logout(req, res);

    // Assert the expected behavior
    expect(
      res.cookie.calledWith("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
    ).to.be.true;
    expect(res.send.calledWith({ message: "logged out successfully" })).to.be
      .true;
  });
});
