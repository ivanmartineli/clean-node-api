import express from 'express'
import router from './routes'

const dotenv = require('dotenv')

dotenv.config()

const app = express()
// const route = Router()

const port = process.env.PORT;

app.use(express.json())
app.use(router)

// route.get('/', (req: Request, res: Response) => {
//     res.json({ message: 'hello world with Typescript sucesss XPTO !!!' })
// })


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})


// ou 
/*
import express from 'express'

const app = express();

app.get('/', (_request, response) => {
    return response.json({ message: 'OK' })
})

app.listen(3000, () => {
    console.log('APP is running port 3000')
})
*/