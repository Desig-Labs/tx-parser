import { expect } from "chai";

import { functionExample } from "../dist";

describe("@michael-template/template-typescript-library", function () {
  let NAME: string;
  before(async () => {
    NAME = "template-typescript-library";
  });

  it("functionExample", async () => {
    const result = functionExample(NAME);
    expect(result).equal(`function-example::${NAME}`);
  });
});
