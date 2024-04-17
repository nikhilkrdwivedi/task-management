import MyModal from '../base/Modal'
import Button from '../base/Button'
import Input from '../base/Input'
import Textarea from '../base/Textarea'

export default function TaskFormModal({ handleFormChange, selectedTaskItem, selectedTaskItemErrors, saveClick, hideModal, showModal }: any) {
  const getBody = () => {
    return (

      <div className='flex justify-center items-center flex-col w-full py-2'>
        <Input
          testId="task-title-input-field"
          type="text"
          label="Title*"
          placeholder="Please add title here"
          value={selectedTaskItem?.title || ""}
          error={selectedTaskItemErrors?.title}
          onChange={(e) => { handleFormChange(e.target.value, 'title') }}
        />
        <Textarea
          testId="task-description-textarea-field"
          type="Description*"
          label="Description*"
          placeholder='Please add description here'
          value={selectedTaskItem?.description || ""}
          error={selectedTaskItemErrors?.description}
          onChange={(e) => { handleFormChange(e.target.value, 'description') }}
        />
      </div>
    )
  }
  const getFooter = () => {
    return (
      <div className='flex justify-end items-center w-full gap-4'>
        <Button
          testId="add-task-cancel-button"
          title="Cancel"
          classNames='w-24 text-white text-sm font-bold px-2 py-1 gap-2 bg-gradient-to-t hover:bg-gradient-to-b from-red-400 to-red-600 shadow-md'
          onClick={() => hideModal()}
        />
        <Button
          testId="add-task-save-button"
          title="Save"
          classNames='w-24 text-white text-sm font-bold px-2 py-1 gap-2 bg-gradient-to-t hover:bg-gradient-to-b from-green-400 to-green-600 shadow-md'
          onClick={() => saveClick()}
        />
      </div>
    )
  }
  return (
    <MyModal headerTitle={"Manage Task"} body={getBody()} footer={getFooter()} openModal={showModal} closeModal={() => hideModal()} />
  )
}
