// React
import { useState } from "react";
// Icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

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
      <div
        onClick={toggleVisibility}
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer hover:text-slate-400 transition-colors"
      >
        {isVisible ? (
          <FaRegEye className="text-slate-500" />
        ) : (
          <FaRegEyeSlash className="text-slate-600" />
        )}
      </div>
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
}
