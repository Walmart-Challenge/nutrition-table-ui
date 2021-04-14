import { useContext, useState } from "react";
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { TiArrowUnsorted } from 'react-icons/ti';
import { IdataTable, selectedSortSelector } from "../utils/constants/interfaces";
import { DessertContext } from '../context/contextProvider';


export const NutritionTable: React.FC = () => {
  const { dataTable, setDataTable } = useContext(DessertContext);
  const [sortState, setSortState] = useState<selectedSortSelector>({});
  console.log('dataTable nutritiontable :>> ', dataTable);

  const getSortIcon = (headerColumn: string): JSX.Element => {
    switch (sortState[headerColumn]) {
      case true:
        return (<FaSortUp />);
      case false:
        return (<FaSortDown />)

      default:
        return (<TiArrowUnsorted />);
    }
  }

  const sortHandler = (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
    const tableHeaderName = e.currentTarget.id;
    setSortState({ [tableHeaderName]: !sortState[tableHeaderName] });

    let sortedData: IdataTable[];
    if (tableHeaderName === "dessert") {
      if (sortState[tableHeaderName]) {
        sortedData = [...dataTable].sort((a, b) => {
          if (a.dessert.toLocaleLowerCase() > b.dessert.toLocaleLowerCase()) {
            return -1;
          }
          if (a.dessert.toLocaleLowerCase() < b.dessert.toLocaleLowerCase()) {
            return 1;
          }
          return 0;
        })
      } else {
        sortedData = [...dataTable].sort((a, b) => {
          if (a.dessert.toLocaleLowerCase() > b.dessert.toLocaleLowerCase()) {
            return 1;
          }
          if (a.dessert.toLocaleLowerCase() < b.dessert.toLocaleLowerCase()) {
            return -1;
          }
          return 0;
        });
      }
    } else {
      if (sortState[tableHeaderName]) {
        sortedData = [...dataTable].sort((a, b) => b.nutritionInfo[tableHeaderName] - a.nutritionInfo[tableHeaderName]);
      } else {
        sortedData = [...dataTable].sort((a, b) => a.nutritionInfo[tableHeaderName] - b.nutritionInfo[tableHeaderName]);
      }
    }
    setDataTable(sortedData);
  };

  const masterCheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDataTable = dataTable.map((desserts: IdataTable) => ({ ...desserts, checked: event.target.checked }));
    setDataTable(updatedDataTable);
  };

  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDataTable = dataTable.map((dessertItem: IdataTable) => {
      if (dessertItem.dessert === event.target.name) {
        dessertItem.checked = event.target.checked;
      }
      return dessertItem;
    });
    setDataTable(updatedDataTable);

  };

  if (dataTable.length === 0) {
    return (
      <div className=" flex w-100 vh-75 items-center justify-center">
        <span className="courier tl db fw7 b f1 "> Click on +Add button to start adding desserts</span>
      </div>
    );
  }

  return (
    <div className="overflow-auto mt5   ">
      <table className="f6 w-100 mw8 center " cellSpacing={0}>
        <thead >
          <tr className="shadow-4   h3 tc pt4 "  >
            <th className="fw6  tl pb3 pr3 pl4 z-1" ><input type="checkbox" name="masterCheckbox" onChange={masterCheckboxHandler}></input></th>
            <th className="fw6  tl pb3 pr3 z-1" id="dessert" onClick={(e) => sortHandler(e)}>Dessert(100g serving){getSortIcon("dessert")} </th>
            <th className="fw6  tl pb3 pr3 z-1" id="calories" onClick={(e) => sortHandler(e)}>Calories{getSortIcon("calories")} </th>
            <th className="fw6  tl pb3 pr3 z-1" id="fat" onClick={(e) => sortHandler(e)}>Fat (g){getSortIcon("fat")} </th>
            <th className="fw6  tl pb3 pr3 z-1" id="carbs" onClick={(e) => sortHandler(e)}>Carbs (g){getSortIcon("carbs")} </th>
            <th className="fw6  tl pb3 pr3 z-1" id="protein" onClick={(e) => sortHandler(e)}>Protein (g){getSortIcon("protein")} </th>
          </tr>
        </thead>
        <tbody className="shadow-4  lh-copy lh  ">
          {dataTable.map(({ dessert, nutritionInfo, checked }: IdataTable) => (
            <tr key={dessert} className="stripe-dark" >
              <td className="fw6 tl pb3 pr3 pl4 bb b--black-20"><input type="checkbox" onChange={checkboxHandler} name={dessert} checked={checked}></input></td>
              <td className="pv3 pr3 bb b--black-20">{dessert}</td>
              <td className="pv3 pr3 bb b--black-20">{nutritionInfo.calories}</td>
              <td className="pv3 pr3 bb b--black-20">{nutritionInfo.fat}</td>
              <td className="pv3 pr3 bb b--black-20">{nutritionInfo.carbs}</td>
              <td className="pv3 pr3 bb b--black-20">{nutritionInfo.protein}</td>
            </tr>)
          )}
        </tbody>
      </table>
    </div>
  )
};