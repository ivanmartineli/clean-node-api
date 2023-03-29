import { Router, Request, Response } from "express"

const routes = Router()

console.log('ORDEM DE CHAMADA: routes.ts  ')


routes.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello world with Typescript sucesss XPTO !!!' })
})

export default routes