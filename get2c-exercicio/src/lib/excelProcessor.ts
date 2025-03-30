import * as XLSX from "xlsx";
import { EmissionsRecord, SummaryIndicators } from "@/lib/types";

type RawExcelRow = {
  Empresa: string;
  Ano: number;
  Setor: string;
  "Consumo de Energia (MWh)": number;
  "Emissões de CO2 (toneladas)": number;
};

export function processEmissionsData(file: File): Promise<SummaryIndicators> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];

        const worksheet = XLSX.utils.sheet_to_json<RawExcelRow>(
          workbook.Sheets[sheetName]
        );

        const records: EmissionsRecord[] = worksheet.map((row) => ({
          empresa: row["Empresa"],
          ano: row["Ano"],
          setor: row["Setor"],
          consumoEnergia: row["Consumo de Energia (MWh)"],
          emissoesCO2: row["Emissões de CO2 (toneladas)"],
        }));

        const totalEmissoesCO2 = records.reduce(
          (sum, record) => sum + record.emissoesCO2,
          0
        );
        const mediaConsumoEnergia =
          records.reduce((sum, record) => sum + record.consumoEnergia, 0) /
          records.length;
        const topEmpresas = records
          .sort((a, b) => b.emissoesCO2 - a.emissoesCO2)
          .slice(0, 5);

        resolve({
          totalEmissoesCO2,
          mediaConsumoEnergia,
          topEmpresas,
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}
