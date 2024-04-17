import MyModal from '../base/Modal'
import { titleize } from "underscore.string";
import Button from '../base/Button';

export default function TaskStatusToggleModal({ showModal, hideModal, data, updateToggleStatus }: {
    showModal: boolean, hideModal: () => void,
    data: any,
    updateToggleStatus: (args: string) => void
}) {
    const STATUS_TOGGLE_MAPPING: any = {
        'PENDING': 'COMPLETED',
        'COMPLETED': 'PENDING'
    }
    const getBody = () => {
        return (
            <div
                data-testid="toggle-status-task-confirmation-message"
                className='text-md font-normal'>Are you sure you want to toggle the task status from <span className='font-bold'>{titleize(data?.status)} </span>to <span className='font-bold'>{titleize(STATUS_TOGGLE_MAPPING[data?.status])}</span>?
            </div>
        )
    }
    const getFooter = () => {
        return (
            <div className='flex justify-end items-center w-full gap-4'>
                <Button
                    testId='toggle-task-status-cancel'
                    title="Cancel"
                    classNames='w-24 text-white text-sm font-bold px-2 py-1 gap-2 bg-gradient-to-t hover:bg-gradient-to-b from-red-400 to-red-600 shadow-md'
                    onClick={() => hideModal()} />
                <Button
                    testId='toggle-task-status-save'
                    title="Save"
                    classNames='w-24 text-white text-sm font-bold px-2 py-1 gap-2 bg-gradient-to-t hover:bg-gradient-to-b from-green-400 to-green-600 shadow-md'
                    onClick={() => updateToggleStatus(STATUS_TOGGLE_MAPPING[data?.status])} />
            </div>
        )
    }
    return (
        <MyModal headerTitle={"Manage Task Status"} body={getBody()} footer={getFooter()} openModal={showModal} closeModal={() => hideModal()} />
    )
}
