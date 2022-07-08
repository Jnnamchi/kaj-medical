import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Textarea(props: any) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <Field
        as="textarea"
        className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded  bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id={name}
        name={name}
        {...rest}
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Textarea;
