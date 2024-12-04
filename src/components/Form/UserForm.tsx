import { SubmitHandler, useForm } from "react-hook-form";
import ButtonCustom from "../ButtonCustom";
import InputComponent from "../InputCustom";
import { formValidation } from "../../utils/constants/formValidation";
import { RegisterRequestType } from "../../types/requests/auth";
import SelectComponent from "../SelectCustom";

import authApi from "../../apis/axios/authApi";
import toast from "react-hot-toast";

interface UserFormProps {
  handleOk: () => void;
}
function UserForm({ handleOk }: UserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequestType>();
  const onSubmit: SubmitHandler<RegisterRequestType> = async (data) => {
    const newData = {
      ...data,
    };
    await authApi
      .register(newData)
      .then((res) => {
        if (res) {
          toast.success("Lưu thành công");
          handleOk();
        }
      })
      .catch(() => toast.error("Lưu thất bại"));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[12px]"
    >
      <h2 className="text-[20px] font-semibold text-center">Thêm người dùng</h2>

      <InputComponent
        isRequired
        name="fullName"
        control={control}
        label="Họ và tên"
        placeholder="Nhập Họ và tên"
        rules={formValidation.positionName}
        errors={errors.fullName}
      />
      <InputComponent
        isRequired
        name="email"
        control={control}
        label="Email"
        placeholder="Nhập email"
        rules={formValidation.positionName}
        errors={errors.fullName}
      />
      <InputComponent
        isRequired
        name="password"
        control={control}
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        rules={formValidation.positionName}
        errors={errors.fullName}
        isPassword
      />
      <SelectComponent
        containerClasName="w-[200px]"
        control={control}
        label="Vai trò"
        name="role"
        errors={errors.role}
        options={[
          {
            label: "Mentor",
            value: "Mentor",
          },
          {
            label: "Mentee",
            value: "Mentee",
          },
        ]}
        isRequired
      />
      <SelectComponent
        containerClasName="w-[200px]"
        control={control}
        label="Cấp quyền"
        name="authenRole"
        errors={errors.role}
        options={[
          {
            label: "User",
            value: "User",
          },
          {
            label: "Admin",
            value: "Admin",
          },
        ]}
        isRequired
      />
      <ButtonCustom htmlType="submit" className="sticky bottom-0 z-10">
        Lưu
      </ButtonCustom>
    </form>
  );
}

export default UserForm;
