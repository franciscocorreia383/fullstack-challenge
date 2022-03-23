'use strict'

const Task = use('App/Models/Task');

class TaskController {

  async showadmin({ params, request, response}){
    const tasks = await Task.query().with('user').fetch()

    return tasks
  }

  async index({params, request, response, auth }) {
    const tasks = await Task.query().where('user_id', auth.user.id).with('user').fetch()

    return tasks
  }


  async create({ request, response, view }) {
  }


  async store({ request, response, auth }) {
    const data = request.only(['description', 'finish_in'])

    const task = await Task.create({ ...data, user_id: auth.user.id })

    return task;
  }

  async show({ params, request, response, view }) {
    const task = await Task.findOrFail(params.id)

    await task.load('user')

    return task
  }


  async edit({ params, request, response, view }) {

  }


  async update({ params, request, response }) {
    const task = await Task.findOrFail(params.id)
    var data = request.only(['description', 'finish_in', 'finished_at'])



    task.merge(data)

    await task.save()

    return task;
  }

  async destroy({ params, request, response }) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}

module.exports = TaskController
