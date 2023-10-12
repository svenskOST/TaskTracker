/* eslint-disable react/prop-types */
import './style/task.css'
import { HiOutlineXMark } from 'react-icons/hi2'

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

export default Task