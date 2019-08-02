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
    return response.data.access_token;
};

let saveShipperGroup =  async (shipper) => {
    let messageLog = `Code: ${shipper.number}, Name: ${shipper.name},`;
    try {
        const response = await axios.post(`${config.auth0_authorization_extension_api}groups`, {
            "name": shipper.number, // We manage the number as name in auth0 for validations.
            "description": shipper.name
        });
        messageLog += ` Status: ${response.status === 200 ? 'Ok' : 'Error' }`
    } catch(error) {
        console.error(error); 
        messageLog += ` Status: Error`;
    }

    /* For save log PM2. */
    console.info(messageLog);
};

module.exports.setToken = setToken;
module.exports.saveShipperGroup = saveShipperGroup;
