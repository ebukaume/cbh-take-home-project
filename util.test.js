const crypto = require("crypto");
const { deepType, hash } = require("./util");

describe("deepType", () => {
  it.each([
    ['string', 'abc'],
    ['number', 12],
    ['boolean', false],
    ['object', {}],
    ['array', ['abc']],
    ['set', new Set()],
    ['map', new Map()],
  ])("returns %s type for %s", (expected, value) => {
    const result = deepType(value);

    expect(result).toBe(expected);
  });
});

describe("hash", () => {
  it("hashes strings using sha3-512 and return as hex", () => {
    const data = 'some-data';
    const expected = crypto.createHash("sha3-512").update(data).digest("hex")

    const result = hash(data);

    expect(result).toBe(expected);
  });

  it.each([
    1,
    [],
    {},
    new Map(),
    new Set(),
  ])("stringifies and hashes other data types using sha3-512 and return as hex", (data) => {
    const expected = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(data))
      .digest("hex")

    const result = hash(data);

    expect(result).toBe(expected);
  });
});
