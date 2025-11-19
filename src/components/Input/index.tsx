import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

const Input = ({ value, setValue, placeholder }: Props) => {
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <input
      type="text"
      value={value}
      onChange={handleValue}
      placeholder={placeholder}
      className="w-full h-12 px-4 py-2.5 rounded outline-1 outline-line-neutral inline-flex justify-start items-center gap-2.5"
      id="text"
    />
  );
};

export default Input;
