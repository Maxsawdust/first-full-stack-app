import "./FormInput.css";

type FormInputType = {
  children: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  errorMessage: string | undefined;
  content?: string | number | undefined;
};

export default function FormInput({
  children,
  value,
  onChange,
  errorMessage,
  content,
}: FormInputType) {
  return (
    <div className="FormInput">
      <input
        value={content && content}
        type="text"
        placeholder=""
        onChange={onChange}
        name={value}
      />
      <span className="form-input-label">{children}</span>
      <p className="input-error">{errorMessage}</p>
    </div>
  );
}
