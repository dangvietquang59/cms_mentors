/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, message, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/functions/formatDate";
import SearchCustom from "../../components/SearchCustom";
import InputComponent from "../../components/InputCustom";
import ButtonCustom from "../../components/ButtonCustom";
import { formValidation } from "../../utils/constants/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/ConfirmModal";
import { useFetchCategory } from "../../apis/swr/useFetchCategory";
import { CategoryType } from "../../types/common/category";
import categoryApi from "../../apis/axios/categoryApi";

function CategoryBlog() {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<CategoryType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<CategoryType | null>(null);
  const [query, setQuery] = useState<string>("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState<CategoryType | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryType>();
  useEffect(() => {
    setValue("name", currentRecord?.name || "");
    setValue("description", currentRecord?.description || "");
  }, [currentRecord]);

  const onSubmit: SubmitHandler<CategoryType> = async (data) => {
    if (currentRecord) {
      await categoryApi
        .update(
          { name: data?.name, description: data?.description },
          currentRecord?._id
        )
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            reset();
            setIsModalVisible(false);
            mutate();
          }
        })
        .catch(() => toast.error("Lưu thất bại"));
    } else {
      await categoryApi
        .create({ name: data?.name, description: data?.description })
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            reset();
            setIsModalVisible(false);
            mutate();
          }
        })
        .catch(() => toast.error("Lưu thất bại"));
    }
  };

  const params = { page, pageSize, search: query };

  const { data, isLoading, mutate } = useFetchCategory(params);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleEdit = (record: CategoryType) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleAddNew = () => {
    setCurrentRecord(null);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteRecord) {
      await categoryApi.delete(deleteRecord._id).then((res) => {
        if (res) {
          mutate();
        }
      });
      message.success("Xóa thành công");
      setSelectedRows([]);
    }
    setIsConfirmModalVisible(false);
  };
  const handleMultiDelete = async (arrRecord: CategoryType[]) => {
    try {
      const deletePromises = arrRecord.map((item) =>
        categoryApi.delete(item._id)
      );

      await Promise.all(deletePromises);

      message.success("Xóa thành công tất cả chức danh đã chọn.");

      mutate();

      setSelectedRows([]);
    } catch (error) {
      message.error("Đã xảy ra lỗi trong quá trình xóa.");
    }
  };

  const handleDeleteSingle = (record: CategoryType) => {
    setDeleteRecord(record);
    setIsConfirmModalVisible(true);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map((user) => user._id),
    onChange: (_selectedRowKeys: React.Key[], selectedRows: CategoryType[]) => {
      setSelectedRows(selectedRows);
    },
  };

  const columns = [
    {
      title: "Tên chức danh",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đường dẫn",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => <p>{formatDate(date)}</p>,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => <p>{formatDate(date)}</p>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: CategoryType) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
            type="link"
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            type="link"
            danger
            onClick={() => handleDeleteSingle(record)}
          >
            Xóa
          </Button>
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
            title: "Quản lý danh mục bài viết",
          },
        ]}
      />
      <div className="flex items-center justify-between">
        <SearchCustom
          value={query}
          setValue={setQuery}
          className="max-w-[350px]"
        />
        <Button type="primary" className="max-w-[200px]" onClick={handleAddNew}>
          Thêm mới
        </Button>
      </div>
      {selectedRows?.length > 0 && (
        <Button
          className="max-w-[100px]"
          onClick={() => handleMultiDelete(selectedRows)}
        >
          Xóa {selectedRows?.length} dòng
        </Button>
      )}
      <Table
        rowSelection={rowSelection}
        dataSource={data?.tags}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize,
          total: data?.totalPages || 0,
          onChange: handlePageChange,
        }}
      />

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        closable={false}
        width={500}
      >
        <div className="flex flex-col gap-[24px]">
          <h3 className="text-[20px] font-semibold text-center">
            {currentRecord
              ? "Sửa danh mục bài viết"
              : "Thêm mới danh mục bài viết"}
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[24px]"
          >
            <InputComponent
              isRequired
              name="name"
              control={control}
              label="Tên danh mục"
              placeholder="Nhập tên danh mục"
              rules={formValidation.positionName}
              errors={errors.name}
            />
            <InputComponent
              isRequired
              name="description"
              control={control}
              label="Mô tả"
              placeholder="Nhập mô tả"
              rules={formValidation.positionName}
              errors={errors.name}
            />
            <ButtonCustom htmlType="submit">Lưu</ButtonCustom>
          </form>
        </div>
      </Modal>

      <ConfirmModal
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        content="Bạn có chắc chắn muốn xóa công nghệ này?"
      />
    </div>
  );
}

export default CategoryBlog;
