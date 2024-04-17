/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Button({
    title,
    Icon,
    classNames,
    onClick,
    IconSize = 18,
    iconClass,
    testId,
  }: ButtonTypes) {
    return (
      <button
        data-testid={testId}
        onClick={onClick}
        className={`rounded-md  text-center flex items-center justify-evenly ${classNames}`}
      >
        {Icon && <Icon size={IconSize} className={iconClass} />}
        {title}
      </button>
    );
  }
  
  type ButtonTypes = {
    testId?: string;
    title?: string;
    Icon?: any;
    classNames?: string;
    IconSize?: number;
    iconClass?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };