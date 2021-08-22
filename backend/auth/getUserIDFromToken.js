module.exports = async function getUserIDFromToken(con, token) {
    const result = await con.promise().query(`SELECT * FROM Auth WHERE Token = '${token}'`);
    return result[0][0].UserID;
};
