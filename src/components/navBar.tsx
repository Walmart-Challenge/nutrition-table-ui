import { gql } from "graphql-request";
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { RiRestartLine } from 'react-icons/ri';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';
import { DessertContext } from '../context/contextProvider';
import { ThemeContextType } from '../utils/constants/interfaces';
import { useGQLMutation } from "../utils/graphql/useGQLMutation";

const DELETE_DESSERTS = gql`
   mutation ($dessertNames: [String] ){
    deleteDessert(
      DessertNames: $dessertNames
  ) {
    dessert
    nutritionInfo {
      calories
      fat
      protein
      carbs
    }
  }
}
`;

const RESET_DATA = gql`
  mutation {
    resetData {
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

export const NavBar: React.FC = (): JSX.Element => {
  const { dataTable } = useContext<ThemeContextType>(DessertContext);
  const history = useHistory();
  const location = useLocation();
  const { mutate: deleteMutation } = useGQLMutation('deleteDessert', DELETE_DESSERTS);
  const { mutate: resetMutation } = useGQLMutation("resetData", RESET_DATA);


  const selectedRows = dataTable.filter(desserts => desserts.checked);

  const goToDashboard = () => {
    history.replace('/nutrition')
  }

  const goToAddDessert = () => {
    history.push('/addDessert')
  }

  const resetHandler = () => {
    resetMutation({});
  }

  const deleteHandler = () => {
    const dessertNames = selectedRows.map(dessertObject => dessertObject.dessert);
    deleteMutation({ dessertNames });
  }

  const isDeleteDisabled = selectedRows.length === 0;
  const hideButtons = location.pathname !== '/nutrition';
  const addButtonStyle = `f6 link dim dim br1 ph3 pv2 mb2 dib white bn  h-auto br2 ba mr3 w-100 bg-dark-green pointer'}`;
  const deleteButtonStyle = `f6 link br1 ph3 pv2 mb2 dib white bn h-auto br2 ba w-100 ${isDeleteDisabled ? '' : 'bg-dark-red pointer'}`;

  return (
    <div>
      <div className="flex b--w justify-between mh3 bg-white">
        <span className="pv4 pointer courier fw6 f3  " onClick={goToDashboard}>Nutrition List</span>
        <button onClick={resetHandler} className="f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-green bn pointer h-auto br2 ba self-center "><RiRestartLine /> Reset Data</button>
      </div>
      <div className="flex justify-between  bg-lightest-blue navy pa3 items-center     ">
        <span className="ml3 pa3   pink ">{selectedRows.length} Selected</span>
        {hideButtons ? <></> :
          <div className="flex  w-20-l w-60-m  self-end-ns">
            <button onClick={goToAddDessert} className={addButtonStyle}><GoPlus /> Add</button>
            <button disabled={isDeleteDisabled} onClick={deleteHandler} className={deleteButtonStyle}><RiDeleteBin5Fill /> Delete</button>
          </div>}
      </div>
    </div>
  );

}