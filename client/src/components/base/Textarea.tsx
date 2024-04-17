/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorText from "./ErrorText";

function Textarea({
  label,
  onChange,
  value,
  placeholder,
  disabled,
  classNames,
  isHide,
  readOnly,
  error,
  errorClass,
  testId,
}: TextareaType) {
  return (
    <div
      className={`relative flex items-center justify-between w-full flex-wrap ${isHide ? "hidden" : ""
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
          data-testid={testId}
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
        focus:text-gray-300 focus:bg-gray-700 focus:border-gray-200 ${classNames}`}
        />


      </label>
    </div>
  );
}
type TextareaType = {
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
  testId?: string;
};

export default Textarea;