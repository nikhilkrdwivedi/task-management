import { useState } from 'react';
import { Tab } from '@headlessui/react'


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export default function TaskTabs({ handleTabChange }: any) {
  let [taskStatus] = useState(['ALL', 'PENDING', 'COMPLETED']);
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const TAB_TO_TASK_COLOR_MAPPING: any = {
    0: 'bg-white',
    1: 'bg-orange-400 text-white',
    2: 'bg-green-400  text-white'
  }

  const TAB_TO_TASK_MAPPING: any = {
    0: '',
    1: 'PENDING',
    2: 'COMPLETED'
  }

  return (
    <Tab.Group
      onChange={(index: number) => {
        handleTabChange(TAB_TO_TASK_MAPPING[index])
        setSelectedIndex(index)
      }}>
      <Tab.List className="flex space-x-1 border border-gray-700 text-white rounded-md bg-gray-900 p-1">
        {taskStatus.map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                'w-full rounded-md py-2.5 text-sm font-medium leading-5',
                'focus:outline-none',
                selected
                  ? `${TAB_TO_TASK_COLOR_MAPPING[selectedIndex]} shadow text-gray-600  font-semibold`
                  : 'text-white  hover:bg-white/[0.12] hover:text-gray-200'
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}
