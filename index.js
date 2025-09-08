import express from 'express'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user.repository.js'
import jwt from 'jsonwebtoken'
import cookeParser from 'cookie-parser'

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookeParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch { }

  next() // -> seguir a la siguiente ruta o middlewire
})

app.get('/', (req, res) => {
  const { user } = req.session
  console.log(user)
  res.render('index', user)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    // se crea el token con la informacion sensible del usuario y la clave secreta y el tiempo de expiracion
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
      expiresIn: '1h'
    })

    // lo vamos a guardar en una cookie en el front
    res
      .cookie('access_token', token, {
        httpOnly: true, // la cookie solo tiene se puede acceder en el servidor
        secure: process.env.NODE_ENV === 'produccion', // la cookie solo se puede acceder en https
        sameSite: 'strict', // la cookie solo se puede accerder en el mismo dominio
        maxAge: 1000 * 60 * 60 // la cookie tiene un tiempo de validez de 1 hora

      })
      .send({ user, token })
  } catch (error) {
    res.status(401).send(error.message)
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const id = await UserRepository.create({ username, password })
    res.json({ id })
  } catch (error) {
    // no es buena idea mandar el error del repositorio
    res.status(400).send(error.message)
  }
})

app.post('/logout', (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'logout successfull' })
})

app.get('/protected', (req, res) => {
  const { user } = req.session
  console.log(user)
  if (!user) return res.status(403).send('Access not authorized')
  res.render('protected', user)
})

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT} - index.js:82`)
})
