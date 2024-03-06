import express from 'express'
import pg from "pg";
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Victor Blog',
    password: 'tejasnanoti1406',
    port: 5432,
})

const connectDB = async () => {
    await db
        .connect()
        .then(() => console.log("Database Connected"))
        .catch(err => console.log(err))
}

app.listen(3000, async () => {
    await connectDB();
    console.log('Server started on port 3000');
})

app.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM blogs'
        const results = await db.query(query)

        res
            .json(results.rows)
            .status(200)
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
})

app.post('/new', async (req, res) => {
    try {
        const { authorname, blog } = req.body

        const query = 'INSERT INTO blogs (authorname, blog) VALUES ($1, $2)'
        await db.query(query, [authorname, blog])

        res
            .status(200)
            .json({ message: "Blog saved Succesfully" })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params

        const query = 'DELETE FROM blogs WHERE id = $1'

        await db.query(query, [id])

        res
            .status(200)
            .json({ message: 'Blog Deleted Successfully' })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
})

app.put('/update/:id', async (req, res) => {
    try {
        const { blog, authorname } = req.body
        const { id } = req.params

        const query = 'UPDATE blogs SET authorname = $1, blog = $2 WHERE id = $3'

        await db.query(query, [authorname, blog, id])

        res
            .status(200)
            .json({ message: 'Blog updated succesfully' })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
})