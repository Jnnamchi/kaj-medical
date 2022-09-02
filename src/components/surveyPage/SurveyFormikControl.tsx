import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";

const ControlWrapper = ({ label, children }: any) => {
  return (
    <div className="flex items-start space-x-4 ">
      <div className="flex justify-end w-1/4">
        <span className="whitespace-nowrap">{label}</span>
      </div>
      <div className="w-2/3 ">{children}</div>
    </div>
  );
};

function SurveyFormikControl(props: any) {
  const { control, label, onClickException, loading, disableBtn, validated, qualityScore, ...rest } = props;
  switch (control) {
    case "input":
      return (
        <ControlWrapper label={label}>
          <Input
            {...rest}
            onClickException={onClickException}
            loading={loading}
            disableBtn={disableBtn}
            validated={validated}
            qualityScore={qualityScore}
          />
        </ControlWrapper>
      );

    case "textarea":
      return (
        <ControlWrapper label={label}>
          <Textarea {...rest} />
        </ControlWrapper>
      );

    case "select":
      return (
        <ControlWrapper label={label}>
          <Select {...rest} />
        </ControlWrapper>
      );

    default:
      return null;
  }
}

export default SurveyFormikControl;
