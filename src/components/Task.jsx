import { HiOutlineXMark } from 'react-icons/hi2'
import PropTypes from 'prop-types'

function Task({ task, onDelete, onToggle }) {
   return (
      <div
         className={`mx-1 my-2 rounded-md bg-[#f4f4f4] px-5 py-3 ${
            task.reminder ? ' border-l-4 border-[green]' : ''
         }`}
         onDoubleClick={() => onToggle(task.id)}
      >
         <h3 className='flex select-none items-center justify-between text-xl'>
            {task.text}{' '}
            <HiOutlineXMark
               style={{ color: 'red', cursor: 'pointer' }}
               onClick={() => onDelete(task.id)}
            />
         </h3>
         <p>{task.date}</p>
      </div>
   )
}

Task.propTypes = {
   task: PropTypes.object,
   onDelete: PropTypes.func,
   onToggle: PropTypes.func,
}

export default Task
