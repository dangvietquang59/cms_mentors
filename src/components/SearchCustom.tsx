import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import debounce from "lodash/debounce";

interface SearchCustomProps {
  value: string;
  setValue: (value: string) => void;
  className?: string;
}

function SearchCustom({ value, setValue, className }: SearchCustomProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedValue(e.target.value);
  };

  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    const debouncedFn = debounce(() => setValue(debouncedValue), 300);
    debouncedFn();

    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedValue, setValue]);

  return (
    <div
      className={`bg-[#f9f9f9] rounded-[4px] border p-[10px] flex items-center gap-[8px] ${className} relative`}
    >
      <button className="size-[20px]">
        <CiSearch />
      </button>
      <input
        placeholder="Tìm kiếm..."
        value={debouncedValue}
        onChange={handleChange}
        className="flex-1 bg-transparent focus-within:outline-none h-full placeholder:text-[#ccc] text-[14px]"
      />
      {value && (
        <button
          className="size-[20px] absolute right-0 top-[10px]"
          onClick={() => {
            setValue("");
            setDebouncedValue("");
          }}
        >
          <MdOutlineClear />
        </button>
      )}
    </div>
  );
}

export default SearchCustom;
