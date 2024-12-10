import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { RevenueAdmin } from "../types/response/statistic";

interface CustomAreaChartProps {
  chartData: RevenueAdmin[];
}
const CustomAreaChart = ({ chartData }: CustomAreaChartProps) => {
  const dates = chartData.map((item) => item.date);
  const transactions = chartData.map((item) => item.transactionTotal);
  const revenues = chartData.map((item) => item.adminRevenueTotal);
  const options: ApexOptions = {
    chart: {
      id: "area-chart",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#3B82F6", "#10B981"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      categories: dates,
    },
    yaxis: {
      title: {
        text: "Value",
      },
    },
    legend: {
      position: "top" as const,
    },
    theme: {
      mode: "light",
    },
  };

  const series = [
    {
      name: "Giao dịch",
      data: transactions,
    },
    {
      name: "Phí giao dịch",
      data: revenues,
    },
  ];

  return (
    <div className="custom-area-chart">
      <h2>Thống kê doanh thu</h2>
      <div style={{ height: "400px" }}>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default CustomAreaChart;
