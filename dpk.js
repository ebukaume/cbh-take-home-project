const { hash, deepType } = require("./util");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (deepType(event) !== 'object' || !event.partitionKey) {
    return hash(event);
  }

  const { partitionKey } = event;
  const key = deepType(partitionKey) === "string"
    ? partitionKey
    : JSON.stringify(partitionKey);

  return key.length > MAX_PARTITION_KEY_LENGTH
    ? hash(key)
    : key;
};

module.exports = { deterministicPartitionKey }
