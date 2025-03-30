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
