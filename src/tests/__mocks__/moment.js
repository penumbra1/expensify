// Grab the moment module
const moment = require.requireActual("moment");

// Mock the moment constructor to return moment(0)
// if no timestamp is provided
export default (timestamp = 0) => moment(timestamp);
