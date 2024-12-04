/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Breadcrumb,
  Image,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Popconfirm,
  message,
} from "antd";
import { useState } from "react";
import { useFetchUsers } from "../../apis/swr/useFetchUsers";
import { UserType } from "../../types/common/auth";
import { formatMoney } from "../../utils/functions/formatMoney";
import { formatNumeric } from "../../utils/functions/formatNumeric";
import images from "../../assets/images";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import UserView from "../../components/UserView";
import SearchCustom from "../../components/SearchCustom";
import UserForm from "../../components/Form/UserForm";

function Users() {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<UserType[]>([]); // To store selected rows
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [query, setQuery] = useState<string>("");
  const [openForm, setOpenForm] = useState(false);

  const handleOk = () => {
    setOpenForm(false);
    mutate();
  };

  const handleCancel = () => {
    setOpenForm(false);
  };

  const params = { page, pageSize, search: query };
  const { data, isLoading, mutate } = useFetchUsers(params);

  const handleDelete = (_id: string) => {
    message.success("User deleted successfully!");
  };

  const handleEdit = (user: UserType) => {
    setCurrentUser(user);
    setIsModalVisible(true);
    // Open your modal for editing
  };

  const handleView = (user: UserType) => {
    setCurrentUser(user);
    setIsModalVisible(true); // Can use modal to view details
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map((user) => user._id),
    onChange: (_selectedRowKeys: React.Key[], selectedRows: UserType[]) => {
      setSelectedRows(selectedRows);
    },
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "fullName",
      key: "fullName",
      render: (_text: string, user: UserType) => (
        <div className="flex items-center gap-[8px]">
          <Avatar src={user?.imageUrl} alt="avatar" size={50} />
          <span>{user?.fullName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "Mentee" ? "orange" : "geekblue"}>{role}</Tag>
      ),
    },
    {
      title: "Bio",
      dataIndex: ["bio", "name"],
      key: "bio",
      render: (_text: string, user: UserType) => (
        <span>{user?.bio?.name ? user?.bio?.name : "-"}</span>
      ),
    },
    {
      title: "Giá thuê mỗi giờ",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
      render: (price: number) => (
        <p>{price > 0 ? `${formatMoney(price)}/1 giờ` : "-"}</p>
      ),
    },
    {
      title: "Tổng coin",
      dataIndex: "coin",
      key: "coin",
      render: (coin: number) => (
        <div className="flex items-center gap-[8px]">
          <Image src={images.qCoin} alt="icon" width={20} />
          <p>{coin > 0 ? formatNumeric(coin) : "-"}</p>
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, user: UserType) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(user)}
            size="small"
            type="link"
          >
            Xem
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(user)}
            size="small"
            type="link"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có muốn xóa người dùng này không ?"
            onConfirm={() => handleDelete(user._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} size="small" type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <Breadcrumb
        items={[
          {
            title: "Dashboard",
          },
          {
            title: "Quản lý người dùng",
          },
        ]}
      />

      <div className="flex items-center justify-between">
        <SearchCustom
          value={query}
          setValue={setQuery}
          className="max-w-[350px]"
        />
        <Button type="primary" onClick={() => setOpenForm(true)}>
          Thêm mới
        </Button>
      </div>
      {/* Table with Row Selection */}
      <Table
        rowSelection={rowSelection} // Row Selection for selecting multiple rows
        dataSource={data?.users}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize,
          total: data?.totalUsers || 0,
          onChange: handlePageChange,
        }}
      />

      {/* Modal for View or Edit User */}
      {isModalVisible && currentUser && (
        <Modal
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          centered
          closable={false}
          width={800}
        >
          <UserView user={currentUser} />
        </Modal>
      )}
      <Modal
        open={openForm}
        footer={null}
        centered
        onCancel={handleCancel}
        onOk={handleOk}
        closable={false}
      >
        <UserForm handleOk={() => handleOk()} />
      </Modal>
    </div>
  );
}

export default Users;
