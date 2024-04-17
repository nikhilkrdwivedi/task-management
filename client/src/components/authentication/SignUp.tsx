/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "../base/Button";
import Input from "../base/Input";

export default function SignUp({
  changeFormType,
  data,
  dataErrors,
  onChange,
  submitForm,
}: SignUpType) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-8 px-4">
      <div className="text-gray-200  text-2xl font-bold">
        Register Here
      </div>
      <div className="text-gray-200 text-base text-center px-4 w-full md:w-2/3 lg:w-1/3">
        Registration: Where usernames become superheroes and passwords become
        secret agents.
      </div>
      <div
        className="flex flex-col gap-1 
        py-4 px-4 md:p-4 w-full md:w-2/3 lg:w-1/3  
        rounded-md shadow-lg  shadow-gray-400 bg-gray-900"
      >
        <Input
          testId="signup-name-input-field"
          type="text"
          placeholder="Enter Full Name"
          label="Full Name*"
          value={data?.name || ""}
          error={dataErrors?.name || ""}
          onChange={(e) => onChange(e.target.value, "name")}
        />
        <Input
          testId="signup-email-input-field"
          type="text"
          placeholder="Enter Email"
          label="Email*"
          value={data?.email || ""}
          error={dataErrors?.email || ""}
          onChange={(e) => onChange(e.target.value, "email")}
        />
        <Input
          testId="signup-password-input-field"
          placeholder="Enter Password"
          label="Password*"
          type="password"
          value={data?.password || ""}
          error={dataErrors?.password || ""}
          onChange={(e) => onChange(e?.target?.value, "password")}
        />
        <Button
          testId="signup-button"
          title={"Register"}
          classNames="!w-full bg-green-500 p-2 !my-2 text-white font-semibold text-md"
          onClick={submitForm}
        />
      </div>
      <div
        className="text-gray-200  text-md font-semibold underline m-2 cursor-pointer"
        onClick={changeFormType}
        data-testid="signin-user-form"
      >
        Already have an account?
      </div>
      {/* </div> */}
    </div>
  );
}

type SignUpType = {
  changeFormType?: () => void;
  data?: any;
  dataErrors?: any;
  onChange: (args: string, arg1: string) => void;
  submitForm?: () => void;
};