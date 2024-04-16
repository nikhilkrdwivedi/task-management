/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TbClipboardCopy } from "react-icons/tb";
import ErrorText from "./ErrorText";
// import ErrorText from "./ErrorText";

function Textarea({
  min,
  max,
  label,
  type,
  onChange,
  value,
  placeholder,
  disabled,
  classNames,
  isHide,
  readOnly,
  error,
  errorClass,
}: TextareaType) {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <div
      className={`relative flex items-center justify-between w-full flex-wrap ${
        isHide ? "hidden" : ""
      }`}
    >
      <label
        htmlFor="inputField"
        className="form-label text-gray-500 w-full text-sm"
      >
        <div className="flex justify-start items-center gap-2">
          {label}
          <ErrorText error={error} classNames={errorClass} />
        </div>

        <textarea
         rows={4}
          readOnly={readOnly}
      
          onChange={onChange}
          value={value}
          disabled={disabled}
          placeholder={placeholder || label}
          className={`
          relative
          px-3 py-2.5 my-3
          placeholder-slate-300  
          bg-gray-900
          text-sm shadow outline-none 
          focus:outline-none  w-full  
          text-gray-200 
            bg-clip-padding
            border border-solid border-gray-300 
            transition
            ease-in-out
            rounded
            m-0
        focus:text-gray-300 focus:bg-gray-700 focus:border-gray-200 ${classNames} ${
            type === "password" || type === "clipboard" ? " pr-10 " : ""
          }`}
        />
       
 
      </label>
      {/* <ErrorText error={error} classNames="py-1" /> */}
    </div>
  );
}
type TextareaType = {
  min?: string | number;
  max?: string | number;
  label?: string;
  type: string;
  value: string | number | readonly string[] | undefined;
  onChange?: (arg?: any) => void;
  placeholder?: string;
  disabled?: boolean;
  classNames?: string;
  isHide?: boolean;
  readOnly?: boolean;
  error?: string;
  errorClass?: string;
};

export default Textarea;