import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgb(164, 206, 149)",
          "rgb(81, 130, 155)",
          "rgb(246, 153, 92)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="w-full bg-white rounded-2xl h-full p-6 flex justify-between flex-col items-center">
      <h2 className="text-xl text-gray-800 font-bold leading-tight">
        Summary of common destinations
      </h2>
      <div className="h-64 w-full flex flex-col justify-center items-center">
        <Pie data={data} />
      </div>
      <div className="join mt-5 ">
        <button className="join-item btn btn-xs">1</button>
        <button className="join-item btn btn-xs btn-active">2</button>
        <button className="join-item btn btn-xs">3</button>
        <button className="join-item btn btn-xs">4</button>
      </div>
    </div>
  );
}

export default PieChart;
