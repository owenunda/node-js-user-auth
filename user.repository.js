import DBLocal from 'db-local'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }

})

export class UserRepository {
  static async create ({ username, password }) {
    // 1. validaciones del username

    Validation.username(username)
    Validation.password(password)

    // 2. asegurarse quye el username NO existe
    const user = User.findOne({ username })
    if (user) throw new Error('usernmae already exists')

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('username does not exist')

    const isValid = await bcrypt.compareSync(password, user.password)
    if (!isValid) throw new Error('password is invalid')

    const { password: _, ...publicUSer } = user
    return publicUSer
  }
}

class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username < 3) throw new Error('username must be at least 3 characteres long')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password < 6) throw new Error('password must be at least 3 characteres long')
  }
}
