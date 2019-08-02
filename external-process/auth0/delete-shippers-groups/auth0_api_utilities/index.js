const config = require('../config.json');
const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

let setToken = async () => {
    const response = await axios.post(config.auth0_issuer, {
        "client_id": config.auth0_client_id,
        "client_secret": process.env.auth0_client_secret,
        "audience": config.auth0_audience,
        "grant_type": config.auth0_grant_type
    });
    axios.defaults.headers.post['Authorization'] = `Bearer ${response.data.access_token}`;
    axios.defaults.headers.put['Authorization'] = `Bearer ${response.data.access_token}`;
    axios.defaults.headers.delete['Authorization'] = `Bearer ${response.data.access_token}`;
    axios.defaults.headers.get['Authorization'] = `Bearer ${response.data.access_token}`;
    return response.data.access_token;
};

let getAllShippersGroupFromAuth0 = async () => {
    try {
        const response = await axios.get(`${config.auth0_authorization_extension_api}groups`);
        return response;
    } catch(error) {
        console.error(error); 
    }
}

let deleteShipperGroup =  async (shipperAuth0Id) => {
    let messageLog = `shipperAuth0Id: ${shipperAuth0Id},`;
    try {
        const response = await axios.delete(`${config.auth0_authorization_extension_api}groups/${shipperAuth0Id}`);
        messageLog += ` Status Deleted: ${response.status === 204 ? 'Ok' : 'Error' }`
    } catch(error) {
        console.error(error); 
        messageLog += ` Status: Error`;
    }

    /* For save log PM2. */
    console.info(messageLog);
};

module.exports.setToken = setToken;
module.exports.deleteShipperGroup = deleteShipperGroup;
module.exports.getAllShippersGroupFromAuth0 = getAllShippersGroupFromAuth0;
