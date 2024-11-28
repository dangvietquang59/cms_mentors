import { Avatar, Image, Divider } from "antd";
import { UserType } from "../types/common/auth";
import { formatMoney } from "../utils/functions/formatMoney";
import { formatNumeric } from "../utils/functions/formatNumeric";
import images from "../assets/images";
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import TransactionView from "./TransactionView";
interface UserViewProps {
  user: UserType;
}

function UserView({ user }: UserViewProps) {
  const [viewTransactions, setViewTransactions] = useState(false);
  return (
    <div className="min-h-[300px]">
      {viewTransactions ? (
        <TransactionView
          setOpen={setViewTransactions}
          open={viewTransactions}
          userId={user?._id}
        />
      ) : (
        <div className="flex flex-col gap-[24px] p-6 max-w-3xl mx-auto bg-white rounded-lg">
          {/* Header with Avatar and User Info */}
          <div className="flex items-center gap-[16px] mb-6">
            <Avatar src={user?.imageUrl} alt="avatar" size={80} />
            <div>
              <p className="text-[24px] font-semibold text-[#333]">
                {user?.fullName}
              </p>
              <p className="text-[#888] text-[16px]">
                {user?.bio?.name || "Mentee"}{" "}
              </p>
            </div>
          </div>

          {/* Price and Coin Section */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[12px] mb-6">
              {user?.role === "Mentor" && (
                <p className="text-[16px] font-medium text-[#444]">
                  <span className="font-bold">Giá thuê:</span>{" "}
                  {formatMoney(user.pricePerHour)} / 1 giờ
                </p>
              )}
              <div className="flex items-center gap-[10px] text-[#444]">
                <Image src={images.qCoin} alt="coin icon" width={24} />
                <p className="font-medium">{formatNumeric(user.coin)}</p>
              </div>
            </div>
            <button
              className="flex items-center gap-[12px]"
              onClick={() => setViewTransactions(true)}
            >
              <p className="hover:underline">Xem thông tin giao dịch</p>
              <FaChevronRight />
            </button>
          </div>
          {/* Technologies Section */}
          {user?.role === "Mentor" && (
            <div>
              <Divider
                orientation="left"
                className="font-medium text-[18px] text-[#333]"
              >
                Kỹ năng và công nghệ
              </Divider>
              <div className="grid grid-cols-4 gap-4">
                {user?.technologies.map((techItem) => (
                  <div
                    key={techItem._id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-semibold text-[#444]">
                      {techItem.technology.name}
                    </p>
                    <p className="text-[#555]">
                      Kinh nghiệm: {techItem.experienceYears} năm
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserView;
