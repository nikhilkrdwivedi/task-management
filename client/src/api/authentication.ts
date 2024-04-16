/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosHelper from "./axiosHelper";
import ENV from "../env/variables";

const AUTHENTICATION_ENDPOINT = "/api/v1/authentication";

export function validateToken() {
  return axiosHelper(
    `${ENV.API_BASE_URL + AUTHENTICATION_ENDPOINT}/validate-token`,
    "GET",
    null,
    null
  );
}
export function signIn(payload: any) {
  return axiosHelper(
    `${ENV.API_BASE_URL + AUTHENTICATION_ENDPOINT}/login`,
    "POST",
    null,
    payload
  );
}
export function register(payload: any) {
  return axiosHelper(
    `${ENV.API_BASE_URL + AUTHENTICATION_ENDPOINT}/register`,
    "POST",
    null,
    payload
  );
}
export function logout(body: any = {}) {
  return axiosHelper(
    `${ENV.API_BASE_URL + AUTHENTICATION_ENDPOINT}/logout`,
    "POST",
    null,
    body
  );
}
export default { validateToken, signIn, logout, register };