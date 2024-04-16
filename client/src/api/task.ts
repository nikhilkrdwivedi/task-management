/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from "querystring";
import axiosHelper from "./axiosHelper";
import ENV from "../env/variables";
const TASK_ENDPOINT = "/api/v1/task";

export function fetchTasks(query: any = {}) {
  return axiosHelper(
    `${ENV.API_BASE_URL + TASK_ENDPOINT}?${qs.stringify(query)}`,
    "GET",
    null,
    null
  );
}
export function fetchTask(taskId: string) {
  return axiosHelper(
    `${ENV.API_BASE_URL + TASK_ENDPOINT}/${taskId}`,
    "GET",
    null,
    null
  );
}
export function createTask(payload: any) {
  return axiosHelper(
    `${ENV.API_BASE_URL + TASK_ENDPOINT}/`,
    "POST",
    null,
    payload
  );
}
export function updateTask(payload: any, taskId: string) {
  return axiosHelper(
    `${ENV.API_BASE_URL + TASK_ENDPOINT}/${taskId}`,
    "PUT",
    null,
    payload
  );
}

export function updateTaskStatus(status: string, taskId: string) {
  return axiosHelper(
    `${ENV.API_BASE_URL + TASK_ENDPOINT}/${taskId}/status/${status}`,
    "PATCH",
    null,
    null
  );
}

export function deleteTask(taskId: string) {
  return axiosHelper(
    `${ENV.API_BASE_URL + TASK_ENDPOINT}/${taskId}`,
    "DELETE",
    null,
    null
  );
}


export default { fetchTask, createTask, updateTask, fetchTasks, deleteTask };