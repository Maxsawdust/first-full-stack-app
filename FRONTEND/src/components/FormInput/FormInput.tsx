import "./FormInput.css";

type FormInputType = {
  children: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  errorMessage: string | undefined;
};

export default function FormInput({
  children,
  value,
  onChange,
  errorMessage,
}: FormInputType) {
  return (
    <div className="FormInput">
      <input type="text" placeholder="" onChange={onChange} name={value} />
      <span className="form-input-label">{children}</span>
      <p className="input-error">{errorMessage}</p>
    </div>
  );
}
