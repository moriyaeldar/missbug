const fs = require('fs')


const gUsers = require('../data/user.json')

function checkLogin({username, password}) {
    const user = gUsers.find(user => user.username === username && user.password === password)
    if (!user) {
        return Promise.resolve(null)
    }
    const res = {...user}
    delete res.password
    return Promise.resolve(res)
}

function getById(userId) {
    const user = gUsers.find(user => user._id === userId)
    const res = {...user}
    delete res.password
    return Promise.resolve(res)
}

function save(user) {
    if (user._id) {
        // TODO - need some work - Edit Profile
        const idx = gUsers.findIndex(currUser => currUser._id === user._id)
        gUsers[idx] = user;
    } else {
        user._id = _makeId()
        gUsers.push(user)
    }
    return _saveUsersToFile()
        .then(() => {
            const res = {...user}
            delete res.password
            return res;
        })
}


module.exports = {
    getById,
    save,
    checkLogin
}

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}
