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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EmissionsDashboard() {
  // State to store processed indicators
  const [indicators, setIndicators] = useState<SummaryIndicators | null>(null);

  // Function to handle file upload
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Get the first file from the input
    const file = event.target.files?.[0];

    // Check if file exists
    if (file) {
      try {
        // Process the Excel file
        const processedData = await processEmissionsData(file);

        // Update state with processed data
        setIndicators(processedData);
      } catch (error) {
        // Log any errors during processing
        console.error("Error processing file", error);
      }
    }
  };

  // Prepare chart data if indicators exist
  const chartData = indicators
    ? {
        // X-axis labels (company names)
        labels: indicators.topEmpresas.map((empresa) => empresa.empresa),

        // Dataset for the bar chart
        datasets: [
          {
            label: "CO2 Emissions (tons)",
            // Y-axis values (CO2 emissions)
            data: indicators.topEmpresas.map((empresa) => empresa.emissoesCO2),
            // Styling for bars
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      }
    : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carbon Footprint Dashboard</h1>

      {/* File upload input */}
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {/* Display indicators if processed */}
      {indicators && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total CO2 Emissions Card */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">Total CO2 Emissions</h2>
            <p>{indicators.totalEmissoesCO2.toFixed(2)} tons</p>
          </div>

          {/* Average Energy Consumption Card */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">Avg Energy Consumption</h2>
            <p>{indicators.mediaConsumoEnergia.toFixed(2)} MWh</p>
          </div>

          {/* Top Companies Card */}
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

      {/* Render chart if data exists */}
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
