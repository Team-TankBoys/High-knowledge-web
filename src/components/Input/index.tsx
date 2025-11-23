import { type Dispatch, type SetStateAction } from "react";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  customHandleFn?: () => void;
};

const Input = ({ value, setValue, placeholder, customHandleFn = () => void(0) }: Props) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        customHandleFn();
      }}
      placeholder={placeholder}
      className="w-full h-12 px-4 py-2.5 rounded outline-1 outline-line-neutral inline-flex justify-start items-center gap-2.5"
      id="text"
    />
  );
};

export default Input;
