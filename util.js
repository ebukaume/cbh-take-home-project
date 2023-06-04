const crypto = require("crypto");

const deepType = (value) => Object.prototype.toString.apply(value).slice(8, -1).toLowerCase();

const hash = value => {
  const data = deepType(value) === 'string'
    ? value
    : JSON.stringify(value);

  return crypto.createHash("sha3-512").update(data).digest("hex")
}

module.exports = { deepType, hash }
