import { ErrorMessage } from "formik";
import Select from "react-select";
import TextError from "./TextError";

function SelectComponent(props: any) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <Select options={options} onChange={() => {}} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default SelectComponent;
