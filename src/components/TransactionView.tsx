import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useFetchTransactionsByUserId } from "../apis/swr/useFetchTransactions";
import { TransactionType } from "../types/common/transactions";
import { Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

interface TransactionViewProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  userId: string;
}

function TransactionView({ setOpen, userId }: TransactionViewProps) {
  const { data, isLoading, error } = useFetchTransactionsByUserId(userId);

  const [transactionTypeFilter, setTransactionTypeFilter] =
    useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Lọc giao dịch theo loại
  const filteredTransactions = data?.transactions.filter(
    (transaction: TransactionType) => {
      let matchesType = true;
      let matchesDate = true;

      if (transactionTypeFilter !== "all") {
        matchesType = transaction.type === transactionTypeFilter;
      }

      if (dateFilter) {
        const transactionDate = new Date(transaction.createdAt);
        const filterDate = new Date(dateFilter);
        matchesDate =
          transactionDate.toDateString() === filterDate.toDateString();
      }

      return matchesType && matchesDate;
    }
  );

  // Reset bộ lọc
  const resetFilters = () => {
    setTransactionTypeFilter("all");
    setDateFilter(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions.</div>;

  return (
    <div className="transaction-view">
      <button
        className="flex items-center gap-[12px] text-primary hover:underline mb-4"
        onClick={() => setOpen(false)}
      >
        <FaChevronLeft />
        <span>Quay lại</span>
      </button>

      <h2 className="text-2xl font-semibold mb-6">Lịch sử giao dịch</h2>

      {/* Bộ lọc */}
      <div className="filters mb-4 flex gap-4 items-end">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="transactionType" className="block">
            Loại giao dịch
          </label>
          <Select
            id="transactionType"
            className="w-[200px]"
            value={transactionTypeFilter}
            onChange={(value) => setTransactionTypeFilter(value)}
          >
            <Option value="all">Tất cả</Option>
            <Option value="deposit">Nạp tiền</Option>
            <Option value="transfer">Chuyển tiền</Option>
          </Select>
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="dateFilter" className="block">
            Ngày giao dịch
          </label>
          <DatePicker
            id="dateFilter"
            className="w-[200px]"
            value={dateFilter ? dayjs(dateFilter) : null}
            onChange={(_date, dateString) => {
              setDateFilter(
                Array.isArray(dateString) ? dateString[0] : dateString || null
              );
            }}
            format="YYYY-MM-DD"
          />
        </div>

        <div>
          <Button type="default" onClick={resetFilters}>
            Reset bộ lọc
          </Button>
        </div>
      </div>

      {filteredTransactions && filteredTransactions.length > 0 ? (
        <div className="transactions-list space-y-4 max-h-[400px] overflow-y-auto">
          {filteredTransactions.map((transaction: TransactionType) => {
            const { type, amount, status, createdAt } = transaction;
            const date = new Date(createdAt);
            const formattedDate = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
            const typeLabel = type === "deposit" ? "Nạp tiền" : "Chuyển tiền";

            return (
              <div
                key={transaction._id}
                className="transaction-card p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium">
                    <span className="text-gray-800">{typeLabel}</span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-lg font-semibold ${status === "success" ? "text-green-500" : "text-red-500"}`}
                    >
                      {status === "success" ? "Thành công" : "Thất bại"}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-gray-600">
                  <div>
                    <strong>Số tiền:</strong> {amount.toLocaleString()} VNĐ
                  </div>
                  <div>
                    <strong>Ngày giao dịch:</strong> {formattedDate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500">Chưa có giao dịch nào.</div>
      )}
    </div>
  );
}

export default TransactionView;
