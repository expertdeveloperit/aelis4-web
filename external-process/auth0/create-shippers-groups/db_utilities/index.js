const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 5,
  host     : process.env.aelis4_db_host,
  user     : process.env.aelis4_db_user,
  password : process.env.aelis4_db_password,
  database : process.env.aelis4_db_database
});

let getAllShippers = (cb) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const sql = ` SELECT shipper.number AS number,
          shipper.name AS name
          FROM tblaccount shipper WHERE shipper.accounttypeid = 1 `
        connection.query(sql, (err, result) => {
            connection.release();
            cb(result);
            if (err) throw err;
        });
    });
}

module.exports.getAllShippers = getAllShippers;
