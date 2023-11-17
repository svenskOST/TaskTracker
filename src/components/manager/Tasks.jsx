import Task from './Task'
import PropTypes from 'prop-types'

function Tasks({ tasks, onRemove, onToggle }) {
   return (
      <>
         {tasks.map((task) => (
            <Task
               key={task.id}
               task={task}
               onRemove={onRemove}
               onToggle={onToggle}
            />
         ))}
      </>
   )
}

Tasks.propTypes = {
   tasks: PropTypes.array,
   onRemove: PropTypes.func,
   onToggle: PropTypes.func,
}

export default Tasks
