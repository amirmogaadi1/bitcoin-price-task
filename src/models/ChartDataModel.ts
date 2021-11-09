interface DataSet {
  label: string;
  data: number[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
}

export interface ChartData {
  labels: string[];
  datasets: DataSet[];
}
