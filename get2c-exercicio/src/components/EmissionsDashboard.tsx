"use client"; // Important for Next.js client-side components

import { useState } from "react";
import { processEmissionsData } from "@/lib/excelProcessor";
import { SummaryIndicators } from "@/lib/types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EmissionsDashboard() {
  const [indicators, setIndicators] = useState<SummaryIndicators | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      try {
        const processedData = await processEmissionsData(selectedFile);

        setIndicators(processedData);
      } catch (error) {
        console.error("Error processing file", error);
      }
    }
  };

  const chartData = indicators
    ? {
        labels: indicators.topEmpresas.map((empresa) => empresa.empresa),

        datasets: [
          {
            label: "CO2 Emissions (tons)",

            data: indicators.topEmpresas.map((empresa) => empresa.emissoesCO2),

            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      }
    : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carbon Footprint Dashboard</h1>

      <div className="mb-6">
        <label className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer transition duration-300 inline-flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <span>Upload DGEG Excel File</span>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        {file && (
          <span className="ml-3 text-gray-600">Selected: {file.name}</span>
        )}
      </div>

      {}
      {indicators && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">Total CO2 Emissions</h2>
            <p>{indicators.totalEmissoesCO2.toFixed(2)} tons</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">Avg Energy Consumption</h2>
            <p>{indicators.mediaConsumoEnergia.toFixed(2)} MWh</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">Top 5 Companies by Emissions</h2>
            <ul>
              {indicators.topEmpresas.map((empresa) => (
                <li key={empresa.empresa}>
                  {empresa.empresa}: {empresa.emissoesCO2.toFixed(2)} tons
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {chartData && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Top 5 Companies CO2 Emissions
          </h2>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Top 5 Companies CO2 Emissions" },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
