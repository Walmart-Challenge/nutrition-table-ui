
import { gql } from "graphql-request";
import { createContext, useEffect, useState } from "react";
import { IdataTable, ThemeContextType } from "../utils/constants/interfaces";
import { useGQLQuery } from "../utils/graphql/useGQLQuery";

const DessertContext = createContext<ThemeContextType>({
  dataTable: [],
  setDataTable: () => { },
});

const GET_DESSERTS = gql`
  query {
    getDesserts {
      dessert
      nutritionInfo {
        fat
        protein
        carbs
        calories
      }
    }
  }
`;

const DessertProvider: React.FC<React.ReactNode> = ({ children }) => {
  let newSeedDataTable: IdataTable[] = [];
  const [dataTable, setDataTable] = useState<IdataTable[]>([]);
  const { data } = useGQLQuery("desserts", GET_DESSERTS);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      newSeedDataTable = data.getDesserts.map((item) => ({
        ...item,
        checked: false,
      }));
    }
    setDataTable(newSeedDataTable);
  }, [data]);

  return (
    <DessertContext.Provider value={{ dataTable, setDataTable }}>
      {children}
    </DessertContext.Provider>
  );
};

export { DessertProvider, DessertContext };
