
import Button from "../base/Button"
import MyModal from "../base/Modal"

export default function TaskDeleteModal({ showModal, hideModal, deleteTask }: {
    showModal: boolean, hideModal: () => void,
    deleteTask: () => void
}) {
    const getBody = () => {
        return (
            <div
                data-testid="delete-task-confirmation-message"
                className='text-md font-normal'>Are you sure you want to <span className="font-semibold">DELETE</span> task?
            </div>
        )
    }
    const getFooter = () => {
        return (
            <div className='flex justify-end items-center w-full gap-4'>
                <Button
                    testId="delete-task-modal-cancel-btn"
                    title="Cancel"
                    classNames='w-24 text-white text-sm font-bold px-2 py-1 gap-2 bg-gradient-to-t hover:bg-gradient-to-b from-red-400 to-red-600 shadow-md'
                    onClick={() => hideModal()} />
                <Button
                    testId="delete-task-modal-save-btn"
                    title="Delete"
                    classNames='w-24 text-white text-sm font-bold px-2 py-1 gap-2 bg-gradient-to-t hover:bg-gradient-to-b from-green-400 to-green-600 shadow-md'
                    onClick={() => deleteTask()} />
            </div>
        )
    }
    return (
        <MyModal headerTitle={"Delete Task"} body={getBody()} footer={getFooter()} openModal={showModal} closeModal={() => hideModal()} />
    )
}
