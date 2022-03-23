'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {
    async store({ request }){
        const data = request.only(['username','email','password','isAdmin'])

        console.log(request);

        const user = await User.create(data)

        return user
    }   

    async show({auth, request}){
        const user = await Database
        .table('users')
        .where('id', auth.user.id)
        .first()

        return user
    }
}

module.exports = UserController
