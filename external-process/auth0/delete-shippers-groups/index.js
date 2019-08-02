const auth0_api_utilities  = require('./auth0_api_utilities');

let main = async () => {
    await auth0_api_utilities.setToken();
    const shippersGroups =  await auth0_api_utilities.getAllShippersGroupFromAuth0();

    for (let shipperGroup of shippersGroups.data.groups) {
        await auth0_api_utilities.deleteShipperGroup(shipperGroup._id);
    }
}

main();