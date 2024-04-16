import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import TaskCard from './TaskCard'

import Pagination from '../base/Pagination'
import MyModal from '../base/Modal';
import TaskTabs from './TaskTabs';
import TaskHeader from './TaskHeader';
import Input from '../base/Input';
import Textarea from '../base/Textarea';
import Button from '../base/Button';
import { createTask, deleteTask, fetchTasks, updateTask, updateTaskStatus } from '../../api/task';
import Container from '../base/Container';
import NoDataFound from '../helper/NoDataFound';
import TaskStatusToggleModal from './TaskStatusToggleModal';
import TaskDeleteModal from './TaskDeleteModal';

export default function Tasks() {
    const [showTaskFormModal, setShowTaskFormModal] = useState<boolean>(false);
    const [showTaskToggleModal, setShowTaskToggleModal] = useState<boolean>(false);
    const [showTaskDeleteModal, setShowTaskDeleteModal] = useState<boolean>(false);

    const [selectedTaskItem, setSelectedTaskItem] = useState<any>({});
    const [selectedTaskItemErrors, setSelectedTaskItemErrors] = useState<any>({});
    const [tasks, setTasks] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const BASE_QUERY = {
        // status:'',
        currentPage: 0,
        limit: 10
    }
    const [query, setQuery] = useState(BASE_QUERY);

    useEffect(() => { getTasks() }, [query]);

    const handleQueryChange = (value: string | number, key: string) => {
        let restQuery = {};
        if (key === 'TAB') {
            restQuery = {
                ...BASE_QUERY,
                status: value,
            }
        }
        if (key === 'PAGE') {
            restQuery = {
                ...query,
                currentPage: value
            }
        }
        setQuery((prev) => ({
            ...prev,
            ...restQuery
        }));
    }
    const getTasks = async () => {
        try {
            const { data } = await fetchTasks(query);
            setTasks({ data: data.data, pagination: data.pagination })
        } catch (error) {

        } finally { }
    }
    const handleTaskFormSubmit = async () => {
        try {
            const { _id, title, description } = selectedTaskItem;
            const callingFunction = _id ? updateTask : createTask;
            const taskId = _id ? _id : ''
            const { data } = await callingFunction({ title, description }, taskId)
            toast.success(data.message, { duration: 4000 })
            setShowTaskFormModal(false)
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || "Try again 🤠";
            toast(errorMsg);
        } finally {
            setQuery({ ...query, ...BASE_QUERY })
        }
    }
    const handleToggleStatusUpdate = async (status: string) => {
        try {
            const { _id } = selectedTaskItem;
            const { data } = await updateTaskStatus(status, _id);
            toast.success(data.message, { duration: 4000 })
            setShowTaskToggleModal(false)
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || "Try again 🤠";
            toast(errorMsg);
        } finally {
            setQuery({ ...query, ...BASE_QUERY })
        }
    }
    const handleDeleteStatusUpdate = async () => {
        try {
            const { _id } = selectedTaskItem;
            const { data } = await deleteTask(_id);
            toast.success(data.message, { duration: 4000 })
            setShowTaskDeleteModal(false)
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || "Try again 🤠";
            toast(errorMsg);
        } finally {
            setQuery({ ...query, ...BASE_QUERY })
        }
    }
    const handleTaskFormModalAction = (selectedItem: any, status: boolean) => {
        try {
            setShowTaskFormModal(status);
            setSelectedTaskItem(selectedItem);
        } catch (error) {

        }
    }
    const handleToggleStatusModal = (selectedItem: object, status: boolean) => {
        setSelectedTaskItem(selectedItem);
        setShowTaskToggleModal(status);
    }
    const handleTaskDeleteModal = (selectedItem: object, status: boolean) => {
        setSelectedTaskItem(selectedItem);
        setShowTaskDeleteModal(status);
    }
    const validatedRequest = () => {
        const errors: any = {};
        if (!selectedTaskItem?.title) {
            errors["title"] = "Title is required!";
        }
        if (!selectedTaskItem?.description) {
            errors["description"] = "Description is required!";
        }
        setSelectedTaskItemErrors(errors);
        if (!Object.keys(errors).length) {
            handleTaskFormSubmit();
        }
    };
    const handleFormChange = (value: string, key: string) => {
        setSelectedTaskItem((prev: any) => ({
            ...prev,
            [key]: value
        }))
    }
    const getManageTaskBody = () => {
        return (

            <div className='flex justify-center items-center flex-col w-full py-2'>
                <Input
                    type="text"
                    label="Title*"
                    placeholder="Please add title here"
                    value={selectedTaskItem?.title || ""}
                    error={selectedTaskItemErrors?.title}
                    onChange={(e) => { handleFormChange(e.target.value, 'title') }}
                />
                <Textarea
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
    const getManageTaskFooter = () => {
        return (
            <div className='flex justify-end items-center w-full gap-4'>
                <Button title="Cancel" classNames='w-24 text-white text-sm font-bold px-2 py-1 gap-2 bg-gradient-to-t hover:bg-gradient-to-b from-red-400 to-red-600 shadow-md ' onClick={() => handleTaskFormModalAction({}, false)} />
                <Button title="Save" classNames='w-24 text-white text-sm font-bold px-2 py-1 gap-2 bg-gradient-to-t hover:bg-gradient-to-b from-green-400 to-green-600 shadow-md ' onClick={() => validatedRequest()} />
            </div>
        )
    }
    return (
        <>
            <Container className='h-full px-4 md:px-12 lg:px-42 bg-gray-900 overflow-auto'>
                <TaskStatusToggleModal data={selectedTaskItem} title='Manage Task Status' showModal={showTaskToggleModal} hideModal={() => handleToggleStatusModal({}, false)} updateToggleStatus={handleToggleStatusUpdate} />
                <TaskDeleteModal title='Delete Task' showModal={showTaskDeleteModal} hideModal={() => handleTaskDeleteModal({}, false)} deleteTask={handleDeleteStatusUpdate} />
                <MyModal headerTitle='Manage Task' body={getManageTaskBody()} footer={getManageTaskFooter()} openModal={showTaskFormModal || false} closeModal={() => handleTaskFormModalAction({}, false)} />
                <TaskHeader manageTaskFormModal={handleTaskFormModalAction} />
                <TaskTabs handleTabChange={(status: string) => handleQueryChange(status, 'TAB')} />
                <NoDataFound loading={loading} data={tasks.data} />
                {!!tasks?.data?.length && (
                    <>
                        <TaskCard data={tasks.data}
                            manageTaskFormModal={handleTaskFormModalAction}
                            manageToggleStatusModal={handleToggleStatusModal}
                            manageTaskDeleteModal={handleTaskDeleteModal} />
                        <Pagination
                            className="mt-2"
                            perPage={tasks?.pagination?.limit}
                            page={tasks?.pagination?.currentPage + 1}
                            total={tasks?.pagination?.totalRecords}
                            showCount
                            onPageClick={(page: number) => { handleQueryChange(page - 1, 'PAGE') }} />
                    </>
                )}

            </Container>
        </>

    )
}
