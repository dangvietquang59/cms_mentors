/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, message, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useFetchTechnologies } from "../../apis/swr/useFetchTechnologies";
import { TechnologiesType } from "../../types/common/technologies";
import { formatDate } from "../../utils/functions/formatDate";
import SearchCustom from "../../components/SearchCustom";
import InputComponent from "../../components/InputCustom";
import ButtonCustom from "../../components/ButtonCustom";
import { formValidation } from "../../utils/constants/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import technologiesApi from "../../apis/axios/technologiesApi";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/ConfirmModal";

function Technologies() {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<TechnologiesType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<TechnologiesType | null>(
    null
  );
  const [query, setQuery] = useState<string>("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false); // State for confirm modal
  const [deleteRecord, setDeleteRecord] = useState<TechnologiesType | null>(
    null
  ); // Store record to delete

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TechnologiesType>();
  useEffect(() => {
    setValue("name", currentRecord?.name || "");
  }, [currentRecord]);

  const onSubmit: SubmitHandler<TechnologiesType> = async (data) => {
    if (currentRecord) {
      await technologiesApi
        .update({ name: data?.name }, currentRecord?._id)
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
      await technologiesApi
        .create({ name: data?.name })
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

  const { data, isLoading, mutate } = useFetchTechnologies(params);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleEdit = (record: TechnologiesType) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleAddNew = () => {
    setCurrentRecord(null);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteRecord) {
      await technologiesApi.delete(deleteRecord._id).then((res) => {
        if (res) {
          mutate();
        }
      });
      message.success("Xóa thành công");
      setSelectedRows([]);
    }
    setIsConfirmModalVisible(false);
  };
  const handleMultiDelete = async (arrRecord: TechnologiesType[]) => {
    try {
      const deletePromises = arrRecord.map((item) =>
        technologiesApi.delete(item._id)
      );

      await Promise.all(deletePromises);

      message.success("Xóa thành công tất cả công nghệ đã chọn.");

      mutate();

      setSelectedRows([]);
    } catch (error) {
      message.error("Đã xảy ra lỗi trong quá trình xóa.");
    }
  };

  const handleDeleteSingle = (record: TechnologiesType) => {
    setDeleteRecord(record);
    setIsConfirmModalVisible(true);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map((user) => user._id),
    onChange: (
      _selectedRowKeys: React.Key[],
      selectedRows: TechnologiesType[]
    ) => {
      setSelectedRows(selectedRows);
    },
  };

  const columns = [
    {
      title: "Tên công nghệ",
      dataIndex: "name",
      key: "name",
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
      render: (_: any, record: TechnologiesType) => (
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
            title: "Quản lý công nghệ",
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
        dataSource={data?.technologies}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize,
          total: data?.totalItems || 0,
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
            {currentRecord ? "Sửa công nghệ" : "Thêm mới công nghệ"}
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[24px]"
          >
            <InputComponent
              isRequired
              name="name"
              control={control}
              label="Tên công nghệ"
              placeholder="Nhập tên công nghệ"
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

export default Technologies;
