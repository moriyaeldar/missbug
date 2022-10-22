
const STORAGE_KEY = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup
}



function signup(credentials) {
    return axios.post('/api/signup', credentials).then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            return user
        }) 
}

function login(credentials) {
    return axios.post('/api/login', credentials).then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            return user
        })
}

function logout() {
    return axios.post('/api/logout').then(() =>
        sessionStorage.removeItem(STORAGE_KEY)
    )
}
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

