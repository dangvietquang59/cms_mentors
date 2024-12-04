// Hàm lưu access_token vào localStorage
export const saveAccessToken = (token: string): void => {
  localStorage.setItem("access_token", token);
};

// Hàm lấy access_token từ localStorage
export const getAccessToken = (): string | null => {
  const token = localStorage.getItem("access_token");
  return token ? token : null;
};

// Hàm xóa access_token khỏi localStorage (nếu cần)
export const removeAccessToken = (): void => {
  localStorage.removeItem("access_token");
};
