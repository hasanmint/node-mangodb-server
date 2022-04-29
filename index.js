const express = require('express'); //require express
const cors = require('cors');
const port = process.env.PORT || 5000; //port
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();



// Middileware  must be need for add post
app.use(cors());//use cors()
app.use(express.json());//body parse

//user:user
//pass: ykIQjwIlrxtQieff



const uri = "mongodb+srv://user:ykIQjwIlrxtQieff@cluster0.09kxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('db connect');

//data insert
async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        //Find Data
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })


        //Post Add a New User
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);

            // res.send('user data received');// just testing
        })

        //Delete User
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.insertOne(query);
            res.send(result);
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Welcome My CURD Server');
});

app.get('/test', (req, res) => {
    res.send('Hero Testing deploy')
})

app.listen(port, () => {
    console.log('CRUD Listen Server is Running');
})





