
import { gql } from "graphql-request";
import { useState } from "react";
import { ImWarning } from "react-icons/im"
import { HiOutlineCheck } from "react-icons/hi"
import Swal from 'sweetalert2';
import { seedDataResponse } from '../utils/constants/interfaces';
import { Idesserts, IinputProps } from "../utils/constants/interfaces";
import { Inputs } from "./index";
import * as Regex from "../utils/constants/constantsVariables";
import { useGQLMutation } from "../utils/graphql/useGQLMutation";
import { useHistory } from "react-router";


const arrayInputs: Array<IinputProps> = [
  {
    label: "Dessert Name*",
    type: "text",
    name: "dessertName",
    value: "dessertName",
    placeHolder: "Dessert Name..."
  },
  {
    label: "Calories*",
    type: "number",
    name: "calories",
    value: "calories",
    placeHolder: "Number of calories of the dessert..."
  },
  {
    label: "Fat*",
    type: "number",
    name: "fat",
    value: "fat",
    placeHolder: "Number of fat of the dessert in grams..."
  },
  {
    label: "Carbs*",
    type: "number",
    name: "carbs",
    value: "carbs",
    placeHolder: "Number of carbs of the dessert in grams..."
  },
  {
    label: "Protein*",
    type: "number",
    name: "protein",
    value: "protein",
    placeHolder: "Number of protein of the dessert in grams..."
  },

];

const ADD_NEW_DESSERT = gql`
   mutation ($dessertInfo: DessertInput ){
  createDessert(
    DessertInfo: $dessertInfo
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

export const AddDesert: React.FC = (): JSX.Element => {
  const history = useHistory();
  const { mutate: addDessertMutation } = useGQLMutation('addDessert', ADD_NEW_DESSERT);
  const [formData, setFormData] = useState<Idesserts>({
    dessertName: "",
    calories: "",
    fat: "",
    carbs: "",
    protein: "",

  });

  const isDisabled: boolean = Object.values(formData).some(data => !data);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    setFormData({ ...formData, [inputName]: e.target.value })
  }
  const renderInputs = () => {
    return (
      arrayInputs.map((item, i) =>
        <Inputs
          key={i}
          label={item.label}
          changeHandler={changeHandler}
          type={item.type}
          name={item.name}
          value={formData[item.value]}
          placeHolder={item.placeHolder}
        />
      )
    )
  }

  const submitButtonStyle = `input-reset ba b--black-20 courier pa2 db mv2 w-100 b ${isDisabled ? '' : 'white bg-dark-green'}`;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Regex.textNumber.test(formData.dessertName.trim())) {
      Swal.fire('Oops...!', 'Just letters and numbers are accepted as dessert name!', 'error')
      return;
    }
    if (!Regex.number.test(formData.calories)) {
      Swal.fire('Oops...!', 'Just positive integrs are accepted at calories input.', 'error')
      return;
    }
    if (!Regex.number.test(formData.fat)) {
      Swal.fire('Oops...!', 'Just positive integrs are accepted at fat input.', 'error')
      return;
    }
    if (!Regex.number.test(formData.carbs)) {
      Swal.fire('Oops...!', 'Just positive integrs are accepted at carbs input.', 'error')
      return;
    }
    if (!Regex.number.test(formData.protein)) {
      Swal.fire('Oops...!', 'Just positive integrs are accepted at protein input.', 'error')
      return;
    }

    const dessertInfo: seedDataResponse = {
      dessert: formData.dessertName.trim(),
      nutritionInfo: {
        calories: parseInt(formData.calories),
        fat: parseInt(formData.fat),
        carbs: parseInt(formData.carbs),
        protein: parseInt(formData.protein),
      }
    };

    addDessertMutation({ dessertInfo });

    history.replace("/nutrition");
  }

  return (
    <div className="flex flex-column vh-100 dn w-100 items-center justify-center bg-light-gray ">
      <form className="br1 bg-white flex flex-column items-center justify-around w-50 shadow-4 overflow-scroll" style={{ height: "90vh" }} onSubmit={submitHandler}>
        <label className="br1 w-75 bg-gold white h2 mb3 content-stretch courier tc db fw7 pa1 mv2 h3-m " style={{ lineHeight: "2" }}>
          <ImWarning /> Please fill all details before you submit
        </label>
        {renderInputs()}
        <div className="w-90 ">
          <button className={submitButtonStyle} disabled={isDisabled} type="submit">
            <HiOutlineCheck /> SAVE DESSERT
          </button>
        </div>
      </form>
    </div>
  );
}
