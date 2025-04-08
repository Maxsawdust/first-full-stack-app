import { useEffect } from "react";
import "./FormInput.css";

type FormInputType = {
  children: string;
  value: string;
};

export default function FormInput({ children, value }: FormInputType) {
  useEffect(() => console.log(value), []);
  return (
    <div className="FormInput">
      <input type="text" placeholder="" />
      <span className="form-input-label">{children}</span>
    </div>
  );
}
