const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const expected = '0'
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe(expected);
  });

  it("Returns the hash of the stringified event when 'partitionKey' is falsy", () => {
    const event = {
      partitionKey: false
    };
    const expected = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex")

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expected);
  });

  it("Returns the 'event.partitionKey' if it is of type 'string'", () => {
    const event = {
      partitionKey: 'some-string'
    };
    const expected = 'some-string'

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expected);
  });

  it("Returns the stringified 'event.partitionKey' if it is not of type 'string'", () => {
    const event = {
      partitionKey: 1,
    };

    const expected = '1'

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expected);
  });

  it("Returns the hash of the stringified event when the length of the stringified 'event.partitionKey' is > 256", () => {
    const event = {
      partitionKey: '1'.repeat(257),
    };
    const expected = '3f2e417dd3287bb9d5a0e47a8a25191210abdd7739d882cea800f3180dc91508c047c737c51abad48d4d4f2469776294e2b4d9de0af65bffb147d7655ff49fa8'

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expected);
  });
});
