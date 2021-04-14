
type inputTypes = string | number;
export interface Idesserts {
  [key: string]: inputTypes;
  dessertName: string;
  calories: string;
  fat: string;
  carbs: string;
  protein: string;
}

export interface IdataTable {
  checked: boolean;
  dessert: string;
  nutritionInfo: nutritionInfo;
}

export interface ThemeContextType {
  dataTable: IdataTable[] | [];
  setDataTable: (dataTable: IdataTable[] | []) => void;
}

export interface seedDataResponse {
  dessert: string;
  nutritionInfo: nutritionInfo;
}

type nutritionInfo = {
  [key: string]: number;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

export type selectedSortSelector = {
  [key: string]: boolean;
};

export interface IinputProps {
  className?: string;
  changeHandler?: any;
  label: string;
  type: string;
  name: string;
  value: inputTypes;
  placeHolder: string;
}

export interface IGetDessertsResponse {
  getDesserts: seedDataResponse[];
}
