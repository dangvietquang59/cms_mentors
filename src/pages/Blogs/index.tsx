/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, message, Modal, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/functions/formatDate";
import SearchCustom from "../../components/SearchCustom";
import InputComponent from "../../components/InputCustom";
import ButtonCustom from "../../components/ButtonCustom";
import { formValidation } from "../../utils/constants/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/ConfirmModal";
import jobTitleApi from "../../apis/axios/jobTitleApi";
import { useFetchBlogs } from "../../apis/swr/useFetchBlogs";
import { BlogType } from "../../types/common/blog";
import Editor from "../../components/Editor";
import blogApi from "../../apis/axios/blogApi";
import { CiSearch } from "react-icons/ci";
import { useFetchCategory } from "../../apis/swr/useFetchCategory";
import { CategoryType } from "../../types/response/category";
import { FaTrash } from "react-icons/fa6";
function Blogs() {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<BlogType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<BlogType | null>(null);
  const [query, setQuery] = useState<string>("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState<BlogType | null>(null);
  const [editorValue, setEditorValue] = useState<string>("");
  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [queryCategory, setQueryCategory] = useState<string>("");

  const CategoryParams = {
    page: 1,
    pageSize,
    search: queryCategory,
  };
  const [selectedCategory, setSelectedCategory] = useState<CategoryType[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { data: categoryData, isLoading: categoryLoading } =
    useFetchCategory(CategoryParams);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryCategory(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleCategorySelect = (category: CategoryType) => {
    const isSelected = selectedCategory?.some(
      (item) => item?._id === category?._id
    );
    if (isSelected) {
      return;
    } else {
      setSelectedCategory((prev) => [...prev, category]);
      setQueryCategory(category.name);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".category-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData?.tags);
    }
  }, [categoryData]);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BlogType>();
  useEffect(() => {
    setValue("title", currentRecord?.title || "");
    setEditorValue(currentRecord?.content || "");
    setSelectedCategory(currentRecord?.tags || "");
  }, [currentRecord]);

  const onSubmit: SubmitHandler<BlogType> = async (data) => {
    const arrTag = selectedCategory?.map((item) => item?._id) || [];
    if (currentRecord) {
      await blogApi
        .update(
          { title: data?.title, tags: arrTag, content: editorValue },
          currentRecord?._id
        )
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            reset();
            setIsModalVisible(false);
            blogMutate();
          }
        })
        .catch(() => toast.error("Lưu thất bại"));
    } else {
      await blogApi
        .create({ title: data?.title, tags: arrTag, content: editorValue })
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            reset();
            setIsModalVisible(false);
            blogMutate();
          }
        })
        .catch(() => toast.error("Lưu thất bại"));
    }
  };

  const params = { page, pageSize, search: query };

  const {
    data: blogData,
    isLoading: blogLoading,
    mutate: blogMutate,
  } = useFetchBlogs(params);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleEdit = (record: BlogType) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleAddNew = () => {
    setCurrentRecord(null);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteRecord) {
      await jobTitleApi.delete(deleteRecord._id).then((res) => {
        if (res) {
          blogMutate();
        }
      });
      message.success("Xóa thành công");
      setSelectedRows([]);
    }
    setIsConfirmModalVisible(false);
  };
  const handleMultiDelete = async (arrRecord: BlogType[]) => {
    try {
      const deletePromises = arrRecord.map((item) =>
        jobTitleApi.delete(item._id)
      );

      await Promise.all(deletePromises);

      message.success("Xóa thành công tất cả chức danh đã chọn.");

      blogMutate();

      setSelectedRows([]);
    } catch (error) {
      message.error("Đã xảy ra lỗi trong quá trình xóa.");
      console.log(error);
    }
  };

  const handleDeleteSingle = (record: BlogType) => {
    setDeleteRecord(record);
    setIsConfirmModalVisible(true);
  };
  const handleRemoveTag = (category: CategoryType) => {
    const newArr = selectedCategory.filter(
      (item) => item?._id !== category?._id
    );
    setSelectedCategory(newArr);
  };
  const rowSelection = {
    selectedRowKeys: selectedRows.map((user) => user._id),
    onChange: (_selectedRowKeys: React.Key[], selectedRows: BlogType[]) => {
      setSelectedRows(selectedRows);
    },
  };

  const columns = [
    {
      title: "Tiêu đề bài viết",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Danh mục bài viết",
      key: "tags",
      render: (record: BlogType) => (
        <div className="flex flex-col gap-[8px]">
          {record?.tags?.map((tag, index) => (
            <Tag color="blue" key={index} className="w-fit">
              {tag?.name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Nội dung bài viết",
      dataIndex: "content",
      key: "content",
      render: (text: string) => (
        <div
          className="line-clamp-4"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ),
      width: "30%",
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
      render: (_: any, record: BlogType) => (
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
            title: "Quản lý bài viết",
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
        dataSource={blogData?.posts}
        columns={columns}
        rowKey="_id"
        loading={blogLoading}
        pagination={{
          current: page,
          pageSize,
          total: blogData?.totalPosts || 0,
          onChange: handlePageChange,
        }}
      />

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        closable={false}
        width={800}
      >
        <div className="flex flex-col gap-[24px] max-h-[500px] overflow-y-auto relative">
          <h3 className="text-[20px] font-semibold text-center">
            {currentRecord ? "Sửa bài viết" : "Thêm mới bài viết"}
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[24px]"
          >
            <InputComponent
              isRequired
              name="title"
              control={control}
              label="Tiêu đề bài viết"
              placeholder="Nhập tiêu đề bài viết"
              rules={formValidation.positionName}
              errors={errors.title}
            />
            <div className="h-[200px]">
              <div className="p-[10px] rounded-[8px] border shadow-sm flex items-center gap-[10px] w-full">
                <input
                  className="flex-1 focus-within:outline-none"
                  placeholder="Danh mục bài viết"
                  value={queryCategory}
                  onChange={handleInputChange}
                  onClick={() => setIsDropdownOpen(true)}
                />
                <CiSearch className="size-[20px]" />
              </div>
              <div className="mt-[10px] flex flex-wrap items-center gap-[10px]">
                {selectedCategory?.length > 0 &&
                  selectedCategory?.map((item, index) => (
                    <div
                      key={index}
                      className="p-[10px] bg-[#f0f0f0] w-fit rounded-[10px] flex items-center gap-[4px] min-w-[100px] justify-between"
                    >
                      <p>{item?.name}</p>
                      <button
                        className="text-red-500"
                        type="button"
                        onClick={() => handleRemoveTag(item)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            {/* Dropdown danh sách kết quả tìm kiếm */}
            {isDropdownOpen && (
              <div className="bg-white shadow-md border rounded-[8px] absolute bottom-[150px] w-full min-h-[150px] max-h-[300px] overflow-auto category-dropdown">
                {categoryLoading ? (
                  <div>Đang tải...</div>
                ) : (
                  categories.map((category) => (
                    <div
                      key={category._id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.name}
                    </div>
                  ))
                )}
              </div>
            )}
            <Editor
              value={editorValue}
              onChange={handleEditorChange}
              className="text-[16px] text-black"
            />
            <ButtonCustom htmlType="submit" className="sticky bottom-0 z-10">
              Lưu
            </ButtonCustom>
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

export default Blogs;
