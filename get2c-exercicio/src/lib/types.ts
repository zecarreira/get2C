export interface EmissionsRecord {
  empresa: string;
  ano: number;
  setor: string;
  consumoEnergia: number;
  emissoesCO2: number;
}

export interface SummaryIndicators {
  totalEmissoesCO2: number;
  mediaConsumoEnergia: number;
  topEmpresas: EmissionsRecord[];
}

export interface RawExcelRow {
  Empresa: string;
  Ano: number;
  Setor: string;
  "Consumo de Energia (MWh)": number;
  "Emissões de CO2 (toneladas)": number;
}
