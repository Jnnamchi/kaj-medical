import { ErrorMessage } from "formik";
import Select from "react-select";
import TextError from "./TextError";

function SelectComponent(props: any) {
  const { label, name, options, formik, ...rest } = props;
  return (
    <div>
      <Select
        options={options}
        onChange={(option: { label: string; value: string }) =>
          formik.setFieldValue(name, option.value)
        }
        {...rest}
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default SelectComponent;
