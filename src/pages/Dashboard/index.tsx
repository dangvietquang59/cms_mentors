/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Row, Col, Card, Statistic, Avatar, DatePicker } from "antd";
import {
  useFetchStatisticBookings,
  useFetchStatisticRevenueAndTransactions,
  useFetchStatisticTransactions,
  useFetchStatisticUser,
} from "../../apis/swr/useFetchAdmin";
import { formatNumeric } from "../../utils/functions/formatNumeric";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import AreaChartComponent from "../../components/AreaChartComponent";
import dayjs, { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;
interface PercentProps {
  total: number;
  adminCoin: number;
}

const Dashboard: React.FC = () => {
  const { data: userData } = useFetchStatisticUser();
  const { data: transactionsData } = useFetchStatisticTransactions();
  const { data: bookingsData } = useFetchStatisticBookings();

  const [selectedDate, setSelectedDate] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });
  const { data: revenueData } = useFetchStatisticRevenueAndTransactions({
    startDate: selectedDate.startDate,
    endDate: selectedDate.endDate,
  });

  const getPercent = ({ total, adminCoin }: PercentProps) => {
    const different = total - adminCoin;
    return ((different / total) * 100).toFixed(2);
  };

  const transactionMapping: Record<string, string> = {
    deposit: "Nạp tiền",
    withdrawal: "Rút tiền",
    transfer: "Chuyển tiền",
    hire: "Thuê",
    refund: "Hoàn tiền",
  };

  const statusMapping: Record<string, string> = {
    success: "Thành công",
    pending: "Chờ phản hồi",
    failed: "Thất bại",
  };
  const handleDateChange = (
    dates: [Dayjs, Dayjs] | null,
    _dateStrings: [string, string]
  ) => {
    if (dates) {
      setSelectedDate({
        startDate: dates[0].format("YYYY-MM-DD"),
        endDate: dates[1].format("YYYY-MM-DD"),
      });
    }
  };
  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Summary Statistics Section */}
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card
            bordered
            hoverable
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Statistic
              title="Tổng người dùng"
              value={userData?.userCount}
              valueStyle={{ fontSize: "24px", color: "#1890ff" }}
              loading={false}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4}>
          <Card
            bordered
            hoverable
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Statistic
              title="Tổng học viên"
              value={userData?.menteeCount}
              valueStyle={{ fontSize: "24px", color: "#52c41a" }}
              loading={false}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4}>
          <Card
            bordered
            hoverable
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Statistic
              title="Tổng cố vấn"
              value={userData?.mentorCount}
              valueStyle={{ fontSize: "24px", color: "#ff4d4f" }}
              loading={false}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4}>
          <Card
            bordered
            hoverable
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Statistic
              title="Tổng lịch đặt"
              value={userData?.totalBookings}
              valueStyle={{ fontSize: "24px", color: "#fa8c16" }}
              loading={false}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4}>
          <Card
            bordered
            hoverable
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Statistic
              title="Tổng giao dịch"
              value={userData?.totalTransactions}
              valueStyle={{ fontSize: "24px", color: "#13c2c2" }}
              loading={false}
            />
          </Card>
        </Col>
      </Row>
      <div>
        <RangePicker
          format="YYYY-MM-DD"
          value={[dayjs(selectedDate.startDate), dayjs(selectedDate.endDate)]}
          onChange={handleDateChange}
          allowClear={false}
        />
        {revenueData && <AreaChartComponent chartData={revenueData} />}
      </div>
      {/* Transactions Section */}
      <h3 className="text-xl font-semibold mb-4">Giao dịch</h3>
      <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto">
        {transactionsData?.map((transaction, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            {/* Left side (Transaction details) */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {transactionMapping[transaction?.type] || "Không xác định"}
              </h3>

              <p className="text-sm text-gray-600">
                Số tiền giao dịch:{" "}
                <span className="font-medium">
                  {formatNumeric(transaction?.bookingId?.amount)} VND
                </span>
              </p>

              <p className="text-sm text-gray-600">
                Số tiền cố vấn nhận:{" "}
                <span className="font-medium">
                  {formatNumeric(transaction?.amount)} VND
                </span>
              </p>

              {transaction?.bookingId && (
                <p className="text-sm text-gray-600">
                  Phí giao dịch:{" "}
                  <span className="font-medium">
                    {formatNumeric(
                      transaction?.bookingId?.amount - transaction?.amount
                    )}{" "}
                    VND{" "}
                    <span className="text-green-500">
                      (
                      {getPercent({
                        total: transaction?.bookingId?.amount,
                        adminCoin: transaction?.amount,
                      })}{" "}
                      %)
                    </span>
                  </span>
                </p>
              )}

              <p className="text-sm text-gray-600">
                Ngày giao dịch:{" "}
                <span className="font-medium">
                  {new Date(transaction?.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>

            {/* Right side (User details and status) */}
            <div className="flex flex-col gap-4 items-center justify-center">
              <h3 className="text-lg font-medium text-blue-600">
                {statusMapping[transaction?.status] || "Không xác định"}
              </h3>

              {/* Transaction users */}
              <div className="flex items-center gap-4">
                <Avatar src={transaction?.userId?.imageUrl} size={40} />
                <p className="text-sm font-medium text-gray-700">
                  {transaction?.userId?.fullName}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <FaMoneyBillTransfer size={24} className="text-gray-700" />
              </div>

              {transaction?.relatedUserId && (
                <div className="flex items-center gap-4">
                  <Avatar
                    src={transaction?.relatedUserId?.imageUrl}
                    size={40}
                  />
                  <p className="text-sm font-medium text-gray-700">
                    {transaction?.relatedUserId?.fullName}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Section */}
      <h3 className="text-xl font-semibold mb-4">Lịch đặt</h3>
      <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto">
        {bookingsData?.map((item, index) => (
          <div
            key={index}
            className="p-6 mb-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            {/* Booking Details */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-4 w-2/3">
                <p className="text-lg font-semibold text-gray-800">
                  {item?.freetimeDetailId?.name}
                </p>
                <p className="text-sm text-gray-500">Người tham gia</p>

                {/* Participants List */}
                {item?.participants.map((user, index1) => (
                  <div key={index1} className="flex items-center gap-4">
                    <Avatar
                      src={user?.imageUrl}
                      size={40}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.fullName}
                    </span>
                  </div>
                ))}

                <p className="text-xs text-gray-400">
                  {new Date(item?.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Payment & Time */}
              <div className="flex flex-col items-end">
                <span className="text-xl font-semibold text-green-600">
                  {formatNumeric(item?.amount)} VND
                </span>
                <p className="text-sm text-gray-500">{`${item?.from} - ${item?.to}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
