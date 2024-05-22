const crypto = require('crypto');

// Generate a secure random string of bytes
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);
