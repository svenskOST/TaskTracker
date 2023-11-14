import { HiOutlineXMark } from 'react-icons/hi2'
import PropTypes from 'prop-types'

function Task({ task, onRemove, onToggle }) {
   return (
      <div
         className={`mx-1 my-2 rounded-md bg-[#f4f4f4] px-5 py-3 border-[green] transition-[border-left-width] duration-[150ms] ease-in-out ${
            task.reminder ? ' border-l-4' : 'border-l-0'
         }`}
         onDoubleClick={() => onToggle(task.id)}
      >
         <h3 className='flex select-none items-center justify-between text-xl'>
            {task.text}{' '}
            <HiOutlineXMark
               className='cursor-pointer text-[red] transition-transform hover:scale-125 active:scale-90'
               onClick={() => onRemove(task.id)}
            />
         </h3>
         <p className='select-none'>{task.date}</p>
      </div>
   )
}

Task.propTypes = {
   task: PropTypes.object,
   onRemove: PropTypes.func,
   onToggle: PropTypes.func,
}

export default Task
