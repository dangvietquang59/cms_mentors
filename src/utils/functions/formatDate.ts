export function formatDate(date: string): string {
  // Chuyển chuỗi string thành đối tượng Date
  const parsedDate = new Date(date);

  // Kiểm tra nếu parsedDate không hợp lệ
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date string");
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}
