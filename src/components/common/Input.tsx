import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Input(props: any) {
  const { label, name, type, formik, ...rest } = props;
  if (type === "file") {
    return (
      <div>
        <Field
          className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id={name}
          name={name}
          type={type}
          // this is magic solution for file upload
          value={undefined}
          onChange={(event: any) => {
            formik.setFieldValue(name, event.currentTarget.files[0]);
          }}
          {...rest}
        />
        <ErrorMessage component={TextError} name={name} />
      </div>
    );
  }
  return (
    <div>
      <Field
        className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id={name}
        name={name}
        type={type}
        {...rest}
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
