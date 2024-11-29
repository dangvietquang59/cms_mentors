export const formValidation = {
  firstName: { required: "Tên không được để trống" },
  lastName: { required: "Họ không được để trống" },
  fullName: { required: "Họ và tên không được để trống" },
  phone: {
    required: "SĐT không được để trống",
    pattern: {
      value: /(84|0)+([0-9]{9})\b/g,
      message: "Số điện thoại không hợp lệ",
    },
  },
  username: { required: "Tên đăng nhập không được để trống" },
  email: {
    required: "Email không được để trống",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Email không hợp lệ",
    },
  },
  birthday: {
    required: "Ngày sinh không được để trống",
    pattern: {
      value: /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
      message: "Ngày sinh không hợp lệ",
    },
  },
  password: {
    required: "Mật khẩu không được để trống",
    minLength: {
      value: 6,
      message: "Độ dài mật khẩu tối thiểu là 6 ký tự",
    },
    maxLength: {
      value: 20,
      message: "Độ dài mật khẩu tối đa là 20 ky tự",
    },
  },
  passwordConfirm: (password: string) => ({
    required: "Xác nhận mật khẩu không được để trống",
    validate: (value: string) => value === password || "Mật khẩu không khớp",
    maxLength: {
      value: 20,
      message: "Độ dài mật khẩu tối đa là 20 ky tự",
    },
    minLength: {
      value: 6,
      message: "Độ dài mật khẩu tối thiểu là 6 ký tự",
    },
  }),
  positionName: { required: "Tên chức vụ không được để trống" },
  departmentName: { required: "Tên phòng ban không được để trống" },
  taskName: { required: "Tên công việc không được để trống" },
  assignedTo: { required: "Người đảm nhiệm không được để trống" },
  groupName: { required: "Tên nhóm không được để trống" },
  salary: { required: "Lương cơ bản không được để trống" },
  otHours: { required: "Giờ làm thêm không được để trống" },
};
