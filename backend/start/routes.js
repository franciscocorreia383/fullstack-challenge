'use strict'

const Route = use('Route')


Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')


Route.group(() => {
    Route.resource('tasks', 'TaskController').apiOnly()
    Route.get('tasksadmin', 'Taskcontroller.showadmin')
    Route.get('users', 'UserController.show')
}).middleware(['auth'])

