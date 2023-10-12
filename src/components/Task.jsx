import './style/task.css'
import { HiOutlineXMark } from 'react-icons/hi2'
import PropTypes from 'prop-types'

function Task({ task, onDelete, onToggle }) {
   return (
      <div
         className={`task ${task.reminder ? 'reminder' : ''}`}
         onDoubleClick={() => onToggle(task.id)}
      >
         <h3>
            {task.text}{' '}
            <HiOutlineXMark
               style={{ color: 'red', cursor: 'pointer' }}
               onClick={() => onDelete(task.id)}
            />
         </h3>
         <p>{task.day}</p>
      </div>
   )
}

Task.propTypes = {
   task: PropTypes.object,
   onDelete: PropTypes.func,
   onToggle: PropTypes.func,
}

export default Task
