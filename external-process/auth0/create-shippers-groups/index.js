const db_utilities  = require('./db_utilities');
const auth0_api_utilities  = require('./auth0_api_utilities');

db_utilities.getAllShippers(async (shippers) => {
    await auth0_api_utilities.setToken();
    for (let shipper of shippers) {
        await auth0_api_utilities.saveShipperGroup(shipper);
    }
});