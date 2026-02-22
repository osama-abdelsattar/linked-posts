// React
import { useState } from "react";

export default function PasswordInput({
  id,
  labelText,
  floatingLabel,
  required,
  register,
  inputProps,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className={`field ${floatingLabel ? "floating-label" : ""}`}>
      <input
        className="peer"
        type={isVisible ? "text" : "password"}
        placeholder=""
        id={id}
        required={required}
        {...register}
        {...inputProps}
      />
      <i
        onClick={toggleVisibility}
        className={`fas ${isVisible ? "fa-eye-slash" : "fa-eye"} absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer ${!isVisible ? "text-slate-600" : "text-slate-500"} hover:text-slate-400 transition-colors`}
      ></i>
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
}
