import { Form, Input, Button, Layout, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginRequestType } from "../../types/requests/auth";
import authApi from "../../apis/axios/authApi";
import toast from "react-hot-toast";
import variables from "../../utils/constants/variables";
import { useNavigate } from "react-router-dom";
import paths from "../../utils/constants/paths";

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values: LoginRequestType) => {
    await authApi
      .login(values)
      .then((res) => {
        if (res) {
          toast.success("Đăng nhập thành công!");
          localStorage.setItem(variables.ACCESSTOKEN, res?.accessToken);
          localStorage.setItem(variables?.PROFILE, JSON.stringify(res?.data));
          navigate(paths.DASHBOARD);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <Content className="flex justify-center items-center py-12">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col gap-[24px]">
          <Title
            level={3}
            className="text-center text-gray-800 mb-6 font-semibold"
          >
            Đăng Nhập
          </Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            {/* Tên đăng nhập */}
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
                className="border border-gray-300 rounded-md py-3 px-4 w-full focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </Form.Item>

            {/* Mật khẩu */}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                size="large"
                className="border border-gray-300 rounded-md py-3 px-4 w-full focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </Form.Item>

            {/* Nút đăng nhập */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md py-3 text-lg hover:from-green-500 hover:to-blue-600 transition-all"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
