/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";
import uploadApi from "../apis/axios/uploadApi";

interface UploadComponentProps {
  setAvatar: (value: string) => void;
  avatar: string;
}
const UploadComponent: React.FC<UploadComponentProps> = ({
  setAvatar,
  avatar,
}: UploadComponentProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(avatar); // Khởi tạo với giá trị avatar từ props

  const customRequest = async (options: any) => {
    const { file, onError, onSuccess } = options;

    try {
      setLoading(true);

      if (file instanceof File) {
        const response = await uploadApi.upload(file);
        if (response && response?.result?.url) {
          const uploadedUrl = response.result.url;

          onSuccess?.(response);
          setImageUrl(uploadedUrl); // Cập nhật ảnh hiển thị trong component
          setAvatar(uploadedUrl); // Gửi URL ảnh về component cha
          message.success("Upload successful!");
        } else {
          throw new Error("Upload failed!");
        }
      } else {
        throw new Error("Invalid file type");
      }
    } catch (error) {
      onError?.(error as Error);
      message.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={customRequest}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default UploadComponent;
