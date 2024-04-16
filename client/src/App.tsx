import './App.css'
import Container from './components/base/Container'
import { MdDeleteForever } from "react-icons/md";
import { Switch } from '@headlessui/react'
import { Tab } from '@headlessui/react'
import { useState } from 'react';
import Pagination from './components/base/Pagination';
import Button from './components/base/Button';
import moment from 'moment';
import { IoStopwatchOutline } from "react-icons/io5";
import { MdOutlineEditNote } from "react-icons/md";
import MyModal from './components/base/Modal';
import Tasks from './components/task/Tasks';
import Router from './routes/Router';




function App() {

  return (
         <>
         <Router />
         </>
  )
}

export default App
