
import { IinputProps } from '../utils/constants/interfaces';


export const Inputs: React.FC<IinputProps> = (props) =>
(
  <>
    <label className="w-90 courier tl db fw7 b" htmlFor={props.name}>
      {props.label}
    </label>
    <input
      className="br2 input-reset b--solid bw1 pa2 b--black-30 db w-90 mv2 mv"
      onChange={props.changeHandler}
      type={props.type}
      id={props.name}
      name={props.name}
      value={props.value}
      placeholder={props.placeHolder}
    />
  </>
);

