const cookieParser = require('cookie-parser')
const userService = require('./services/user.sql.service')
const bugService = require('./services/bug.sql.service')
const session = require('express-session')
const express = require('express')
const app = express()
const cors = require('cors') 
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))
app.use(session({
    secret: 'some secret token',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))




app.get('/', (req, res) => res.send('Hello!'))
app.listen(3030, () => console.log('Server ready at port 3030!'))

app.get('/api/bug', (req, res) => {

    bugService.query()
        .then(bugs => {
            res.send(bugs)
        })
})

app.delete('/api/bug/:bugId', (req, res) => {
    const { loggedinUser} = req.session;
    if (!loggedinUser) return res.status(403).send('Login first')

    console.log('User requesting delete:',loggedinUser)
    const { bugId } = req.params
    bugService.remove(bugId, "loggedinUser")
        .then(() => {
            res.send('Deleted')
        })
        .catch((err) => {
            res.status(403).send('Cannot remove bug')
        })
})



app.post('/api/login', (req, res)=>{
    const credentials = req.body
    // if (credentials.nickname === 'Dror') {
    //     res.cookie('theUser', credentials.nickname)
    //     res.send({_id: 'u101', fullname: 'Dror lala', nickname: 'Dror'})
    // } else {
    //     res.status(401).send('Invalid nickname/password');
    // }
    userService.checkLogin(credentials)
    .then (user=>{
        if(user){
            req.session.loggedinAt=Date.now()
            req.session.loggedinUser=user
            res.send(user)
        }else{
            res.status(401).send('Invalid username/password')   
        }
    })
})

app.post('/api/signup', (req, res) => {
    const credentials = req.body

    userService.add(credentials)//{}
        .then(user => {
            // if (user) {
            //     req.session.loggedinAt = Date.now()
            //     req.session.loggedinUser = user
            console.log('user in server',user);
                res.send(user)
            // }
        })
})

app.post('/api/logout', (req, res)=>{
    req.session.destroy()
    res.send()
})

app.post('/api/bug', (req, res) => {
    const {loggedinUser} = req.session;
    if (!loggedinUser) return res.status(403).send('Login first')

    console.log('User Adding bug:', loggedinUser)

    const bug =req.body
bug.creator=loggedinUser
    bugService.add(bug)
        .then(savedBug => {
            res.send(savedBug)
        })
})

app.put('/api/bug', (req, res) => {
    const {loggedinUser} = req.session;

    const bug = {
        title: req.body.title,
        description: req.body.description,
        severity: req.body.severity,
        creator:{nickname: loggedinUser.username}
    }
    bugService.save(bug)
        .then(savedBug => {
            res.send(savedBug)
        })
})

app.get('/api/user/:userId', (req, res) => {
    const { userId } = req.params
    userService.getById(userId)
        .then(user => {
            res.send(user)
        })
})


