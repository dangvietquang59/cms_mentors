import { Input, InputProps } from "antd";
import clsx from "clsx";
import { Controller, FieldError, RegisterOptions } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface IInputComponentProps extends InputProps {
  isPassword?: boolean;
  label?: string;
  labelClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
  name: string;
  rules?: RegisterOptions;
  errors?: FieldError;
  helptext?: string;
  isRequired?: boolean;
  isPrice?: boolean;
}

const InputComponent = (props: IInputComponentProps) => {
  const {
    isPassword,
    label,
    labelClassName,
    className,
    control,
    name,
    rules,
    errors,
    helptext,
    isRequired = false,
    isPrice = false,
    ...rest
  } = props;

  return (
    <div className="flex flex-col gap-[6px]">
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

      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value, ref } }) =>
            isPassword ? (
              <Input.Password
                className={clsx(
                  "h-[40px] font-[500] text-[14px] leading-[20px]",
                  className
                )}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                {...rest}
              />
            ) : isPrice ? (
              <NumericFormat
                className="input-numericFormat rounded-[6px] bg-white h-[40px] p-[0.4rem_1.1rem]
                font-[500] text-[14px] leading-[20px] text-black placeholder:text-[rgb(191,191,191,0.85)] outline-none outline-offset-0
                border-[#d9d9d9] border-solid border focus-visible:border-[#1677ff] focus-visible:border-solid focus-visible:border
                focus-within:border-[#1677ff] focus-within:border-solid focus-within:border
                focus-visible:shadow-input-blue-shadow focus-within:shadow-input-blue-shadow"
                value={value}
                allowLeadingZeros
                thousandSeparator=","
                onChange={onChange}
                onBlur={onBlur}
                placeholder={props.placeholder}
                disabled={props.disabled}
              />
            ) : (
              <Input
                className={clsx(
                  "h-[40px] font-[500] text-[14px] leading-[20px] text-black",
                  className
                )}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                {...rest}
              />
            )
          }
        />
      ) : (
        <Input
          className={clsx(
            "h-[40px] font-[500] text-[14px] leading-[20px]",
            className
          )}
          {...rest}
        />
      )}

      {helptext && (
        <p className="text-[14px] text-[#667085] leading-[20px] font-[500]">
          {helptext}
        </p>
      )}
      {errors && (
        <p className="text-[14px] text-red-500 leading-[20px] font-[500]">
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default InputComponent;
