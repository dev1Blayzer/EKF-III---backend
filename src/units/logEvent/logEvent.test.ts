import connect from "../../connect";
connect();

import logEvent from "./logEvent";

describe("This creates a log for an event on the system", () => {
  it("Should ", async done => {
    const type = "Test";
    const name = "jest";
    const response = await logEvent({
      type,
      name
    });
    console.log(response);
    expect(response).toMatchObject({
      type,
      name
    });
    done();
  });
});
