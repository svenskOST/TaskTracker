import Task from './Task'
import PropTypes from 'prop-types'

function Tasks({ tasks, onDelete, onToggle }) {
   return (
      <>
         {tasks.map((task) => (
            <Task
               key={task.id}
               task={task}
               onDelete={onDelete}
               onToggle={onToggle}
            />
         ))}
      </>
   )
}

Tasks.propTypes = {
   tasks: PropTypes.array,
   onDelete: PropTypes.func,
   onToggle: PropTypes.func,
}

export default Tasks
