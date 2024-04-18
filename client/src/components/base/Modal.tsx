import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
type ModalPropTypes =
    {
        openModal: boolean;
        closeModal: () => void;
        headerTitle: string;
        body: ReactNode;
        footer: ReactNode;
    }


export default function MyModal({ openModal, closeModal, headerTitle, body, footer }: ModalPropTypes) {
    return (
        <>
            <Transition appear show={openModal} as={Fragment}>
                <Dialog as="div" className="relative z-10 " onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-200/75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-4/5 md:w-1/2 transform overflow-hidden rounded-md bg-gray-900 text-gray-200 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h4"
                                        className="text-lg font-bold leading-6 text-gray-200"
                                        data-testid="modal-title"
                                    >
                                        {headerTitle}
                                    </Dialog.Title>
                                    <div className="my-4 py-4 border-y">
                                        {body}
                                    </div>

                                    <div className="mt-4">
                                        {footer}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
