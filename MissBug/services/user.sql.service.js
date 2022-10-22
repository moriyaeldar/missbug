const DBService = require('./DBService')



async function getById(userId) {
    var query = `SELECT * FROM user WHERE user.id = ${userId}`;

    var users = await DBService.runSQL(query);
    if (users.length === 1) return users[0];
    throw new Error(`user id ${userId} not found`);
}


function add(user) {
    console.log('!!',user);
    var sqlCmd = `INSERT INTO user (fullname,username, password) 
                VALUES ("${user.fullname}",
                        "${user.username}",
                        "${user.password}")`;
                       
    
    return DBService.runSQL(sqlCmd)
}


function checkLogin({username, password}) {
    var user = `SELECT * FROM user WHERE user.password = ${password}`;
    
    if (!user) {
        return Promise.resolve(null)
    }
    const res = {...user}
    delete res.password
    return Promise.resolve(res)
}


function remove(userId) {
    var query = `DELETE FROM user WHERE user.id = ${userId}`;

    return DBService.runSQL(query)
            .then(okPacket => okPacket.affectedRows === 1
                ? okPacket
                : Promise.reject(new Error(`No user deleted - user id ${userId}`)));
}

module.exports = {
    getById,
    add,
    checkLogin,
    remove
}