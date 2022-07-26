import { ErrorMessage } from "formik";
import Select from "react-select";
import TextError from "./TextError";

function SelectComponent(props: any) {
  const { label, name, options, formik, ...rest } = props;

  return (
    <div>
      <Select
        options={options}
        value={options.find((option: any) => option.value === formik.values[name])}
        onChange={(option: { label: string; value: string }) => formik.setFieldValue(name, option.value)}
        {...rest}
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default SelectComponent;
