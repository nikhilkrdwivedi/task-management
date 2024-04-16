import Button from '../base/Button'
import { GoTasklist } from "react-icons/go";


export default function TaskHeader({manageTaskFormModal}:any) {
    return (
        <div className='flex justify-between items-center py-2'>
            <div className='text-md last:md:text-lg lg:text-lg font-medium text-white'>Your Tasks</div>
            <div className=''>
                <Button title="Create Task" Icon={GoTasklist} classNames='text-white font-semibold px-2 py-1 gap-1 bg-green-400 hover:bg-green-500 shadow-md ' onClick={()=>manageTaskFormModal({}, true)} />
            </div>
        </div>
    )
}
