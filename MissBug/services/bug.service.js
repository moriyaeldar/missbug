const fs=require('fs')

const gBugs=require('../data/bug.json')

function query(){
    return Promise.resolve(gBugs)
}

module.exports={
    query,
    getById,
    remove,
    save
}


function getById(bugId) {
    const bug = gBugs.find(bug=>bug._id===bugId)
   return promises.resolve(bug)
}

function remove(bugId) {
    const idx=gBugs.findIndex(bug=>bug._id===bugId)
    gBugs.splice(idx,1)
    return _saveBugsToFile()
}

function save(bug) {
    if (bug._id) {
        const idx = gBugs.findIndex(currbug => currbug._id === bug._id)
        gBugs[idx] = bug;
    } else {
        bug._id = _makeId()
        gBugs.push(bug)
    }
    return _saveBugsToFile()
        .then(() => {
            return bug;
        })
}


function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/bug.json', JSON.stringify(gBugs, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}
