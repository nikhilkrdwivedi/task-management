import { Switch } from '@headlessui/react'
import { useState } from 'react'
import { MdOutlineEditNote, MdDeleteForever } from 'react-icons/md'
import { titleize } from 'underscore.string';

type TaskPropTypes = {
    title: string;
    description: string;
    status: string;
    updatedAt: string | Date;

}
type TaskCardProps = {
    data: TaskPropTypes[];
    manageToggleStatusModal: (arg0: any, arg1: boolean) => void;
    manageTaskFormModal: (arg0: any, arg1: boolean) => void;
    manageTaskDeleteModal: (arg0: any, arg1: boolean) => void;

}
export default function TaskCard({ data, manageToggleStatusModal, manageTaskFormModal, manageTaskDeleteModal }: TaskCardProps) {
    return (
        <div className='h-3/4 overflow-auto'>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2">
                {data?.map((item: any, index: number) => (
                    <div key={index} data-testid={`task-card-${index}`} className='h-auto w-full flex justify-between items-start bg-gradient-to-r from-gray-800 to-gray-900 rounded-md flex-col p-2 shadow-xl drop-shadow-xl border border-gray-700'>
                        <div>
                            <div data-testid={`task-card-title-${index}`} className='text-md md:text-lg font-semibold text-gray-200'>{item.title}</div>
                            <div data-testid={`task-card-description-${index}`} className='text-sm md:text-md font-normal text-gray-100 py-1'>{item.description}</div>
                        </div>
                        <div className='flex justify-between items-center border-t border-gray-700 w-full pt-2'>
                            <div className={`${item.status === 'PENDING' ? 'bg-orange-400' : 'bg-green-400'} px-2 py-1 rounded-full text-sm text-gray-700 font-medium`}>{titleize(item.status)}</div>
                            <div className='flex items-center justify-center gap-2 '>
                                <div className='flex justify-center items-center w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-md text-white'>
                                    <Switch
                                        data-testid={`task-card-switch-${index}`}
                                        checked={item.status === 'PENDING'}
                                        onClick={() => manageToggleStatusModal(item, true)}
                                        className={`${item?.status === 'PENDING' ? 'bg-orange-600' : 'bg-green-600'} relative inline-flex h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            aria-hidden="true"
                                            className={`${item?.status == 'PENDING' ? 'translate-x-3.5' : 'translate-x-0'} pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                </div>
                                <div
                                    data-testid={`task-card-edit-${index}`}
                                    className='flex justify-center items-center w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-md'
                                    onClick={() => manageTaskFormModal(item, true)}>
                                    <MdOutlineEditNote className='w-6 h-6 cursor-pointer text-gray-200' />
                                </div>
                                <div
                                    data-testid={`task-card-delete-${index}`}
                                    className='flex justify-center items-center w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-md'
                                    onClick={() => manageTaskDeleteModal(item, true)}>
                                    <MdDeleteForever className='w-6 h-6 cursor-pointer text-gray-200' />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

