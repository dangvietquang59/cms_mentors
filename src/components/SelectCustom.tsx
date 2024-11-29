import { Select, SelectProps } from "antd";
import clsx from "clsx";
import { Controller, FieldError, RegisterOptions } from "react-hook-form";

interface ISelectComponentProps extends SelectProps {
  name: string;
  rules?: RegisterOptions;
  errors?: FieldError;
  helptext?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
  containerClasName?: string;
  className?: string;
  labelClassName?: string;
  label?: string;
  isRequired?: boolean;
}
const SelectComponent = (props: ISelectComponentProps) => {
  const {
    name,
    rules,
    errors,
    helptext,
    options,
    control,
    containerClasName,
    className,
    labelClassName,
    label,
    isRequired,
    ...rest
  } = props;

  if (!control)
    return (
      <div
        className={clsx("w-auto flex flex-col gap-[6px]", containerClasName)}
      >
        {!!label && (
          <label
            className={clsx(
              "font-[500] text-[14px] leading-[20px] text-[#484848]",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <Select
          className={clsx(
            "w-full font-[500] h-[40px] text-[14px] text-black leading-[20px] border-[#000] hover:!border-[#000] focus:border-[#000] focus:shadow-none",
            className
          )}
          {...rest}
        >
          {options?.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  return (
    <div className={clsx("w-auto flex flex-col gap-[6px]", containerClasName)}>
      {!!label && (
        <div className="flex items-center gap-[8px]">
          <label
            className={clsx(
              "font-[500] text-[14px] leading-[20px] text-[#484848]",
              labelClassName
            )}
          >
            {label}
          </label>
          <div
            className={clsx(
              "flex items-center justify-center",
              isRequired ? "visible" : "invisible"
            )}
          >
            <span className="text-[red] font-bold text-[16px]">*</span>
          </div>
        </div>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            className={clsx(
              "w-full font-[500] text-[14px] h-[40px] leading-[20px] border-[#000] hover:!border-[#000] focus:border-[#000] focus:shadow-none",
              className
            )}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            {...rest}
          >
            {options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )}
      />

      {helptext && (
        <p className="text-[14px] text-[#667085] leading-[20px] font-[500]">
          {helptext}
        </p>
      )}
      {errors && (
        <p className="text-[14px] text-red-500 leading-[20px] font-[500] text-right">
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default SelectComponent;
