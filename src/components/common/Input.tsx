import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Input(props: any) {
  const { label, name, type, formik, onClickException, loading, disableBtn, validated, qualityScore, ...rest } = props;
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
  } else if (type === "email") {
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

        {!disableBtn && (
          <>
            <button
              className="px-6 py-2 mt-4 text-sm text-white bg-gray-500 rounded-sm"
              onClick={(e) => {
                e.preventDefault();

                if (formik.values.email && !formik.errors.email) {
                  onClickException(formik.values);
                }
              }}>
              Validate Email
            </button>
            <p className="text-sm text-gray-600 ">
              Validation check is required, you can move to the next section even if validation fails.
            </p>
          </>
        )}

        {loading && <p className="text-sm text-yellow-400 ">Validating Email...</p>}

        {!disableBtn ||
          (validated ? (
            <p className="text-sm text-green-500">
              Email validation successful with score of <span className="font-bold ">{qualityScore}</span>
            </p>
          ) : (
            <p className="text-sm text-red-500">
              Email validation failed - with reason for failure undeliverable or is not smtp valid
            </p>
          ))}
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
