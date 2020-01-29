const restify = require('restify');
const server = restify.createServer();

//settings
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const users = {
    1: {
        nombre: 'John',
        apellido: 'Carter'
    },
    2: {
        nombre: 'Bruce',
        apellido: 'Wayne'
    }
};

let usersCount = 2;

//routes
server.get('/', (req, res) => res.json({message: "Hello world"}));

server.get('/user', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users));
});

server.get('/user/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users[parseInt(req.params.id)]));
});

server.post('/user', (req, res, next) => {
    let user = req.body;
    usersCount++;
    //user.id = usersCount;
    users[usersCount] = user;
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(user));
});

server.put('/user/:id', (req, res, next) => {
    const user = users[parseInt(req.params.id)];
    let update = req.body;
    for (let field in update) {
        user[field] = update[field]
    }
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(user));
});

server.del('/user/:id', (req, res, next) => {
    delete users[parseInt(req.params.id)];
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users));
});

//start server
server.listen(3000, () => {
    console.log('server on port 3000');
});