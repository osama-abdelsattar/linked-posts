// React
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// API & Caching
import api from "../../api";
import { useMutation } from "@tanstack/react-query";
// Components
import LoginHero from "../login-hero/LoginHero";
// HeroUI
import { Button } from "@heroui/react";
// Style
import { FaAngleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
// Components
import PasswordInput from "../password-input/PasswordInput";
// Motion
import { motion } from "framer-motion";
// Functional Components
function DatePicker({ id, name, labelText, register, setValue, className }) {
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [decade, setDecade] = useState(year - (year - 2020));
  const date = new Date(`${month}-${day}-${year}`);
  const daysInMonth = new Date(year, month, 0).getDate();
  const [view, setView] = useState("days");
  return (
    <div className="field relative">
      <input
        className={`peer ${className} placeholder:text-slate-500/80`}
        type="text"
        id={id}
        name={name}
        autoComplete="off"
        placeholder="mm-dd-yyyy"
        {...register}
      />
      <label
        className="not-peer-placeholder-shown:text-sky-800/70 dark:not-peer-placeholder-shown:text-sky-600/70"
        htmlFor={id}
      >
        {labelText}
      </label>
      <div onMouseDown={(e) => e.preventDefault()} className="date-picker">
        <div className="flex justify-between text-slate-600 dark:text-slate-400 font-semibold mb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              switch (view) {
                case "days":
                  if (month === 1) {
                    setYear(year - 1);
                    setMonth(12);
                  } else setMonth(month - 1);
                  setDay(1);
                  break;
                case "months":
                  setYear(year - 1);
                  break;
                case "years":
                  setDecade(decade - 10);
                  break;
              }
            }}
            className="cursor-pointer hover:bg-slate-300/35 dark:hover:bg-slate-700/50 transition-colors p-2 rounded-lg"
          >
            <FaArrowLeft />
          </button>
          {view === "days" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setView("months");
              }}
              className="cursor-pointer hover:bg-slate-300/35 dark:hover:bg-slate-700/50 transition-colors px-4 py-2 rounded-lg"
            >
              {date.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </button>
          ) : view === "months" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setView("years");
              }}
              className="cursor-pointer hover:bg-slate-300/35 dark:hover:bg-slate-700/50 transition-colors px-4 py-2 rounded-lg"
            >
              {year}
            </button>
          ) : (
            <div className="hover:bg-slate-300/35 transition-colors dark:hover:bg-slate-700/50 px-4 py-2 rounded-lg">
              {decade} - {decade + 9}
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              switch (view) {
                case "days":
                  if (month === 12) {
                    setYear(year + 1);
                    setMonth(1);
                  } else setMonth(month + 1);
                  setDay(1);
                  break;
                case "months":
                  setYear(year + 1);
                  break;
                case "years":
                  setDecade(decade + 10);
                  break;
              }
            }}
            className="cursor-pointer hover:bg-slate-300/35 dark:hover:bg-slate-700/50 transition-colors p-2 rounded-lg"
          >
            <FaArrowRight />
          </button>
        </div>
        {view === "days" ? (
          <>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {Array.from({ length: daysInMonth }).map((_, i) => (
                <div
                  key={`day-${i + 1}`}
                  className={`day-btn ${
                    i + 1 === date.getDate() ? "active" : ""
                  }`}
                  onClick={() => {
                    setDay(i + 1);
                  }}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </div>
              ))}
            </div>
            <button
              className="btn-secondary w-full"
              onClick={(e) => {
                e.preventDefault();
                setValue(
                  "dateOfBirth",
                  `${month.toString().padStart(2, "0")}-${day
                    .toString()
                    .padStart(2, "0")}-${year}`,
                );
              }}
            >
              Save
            </button>
          </>
        ) : view === "months" ? (
          <div className="grid grid-cols-4 grow gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`month-${i + 1}`}
                className="day-btn"
                onClick={() => {
                  setView("days");
                  setMonth(i + 1);
                  setDay(1);
                }}
              >
                {new Date(`${i + 1}-${day}-${year}`).toLocaleDateString(
                  "en-GB",
                  { month: "short" },
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 grow gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`year-${i + decade}`}
                className="day-btn"
                onClick={() => {
                  setView("months");
                  setYear(i + decade);
                }}
              >
                {i + decade}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 letters.")
      .max(32, "Name must be at most 32 letters."),
    username: z
      .string()
      .regex(
        /^(|[a-z0-9_-]{3,24})$/,
        "Username must be at least 3 characters, at most 24 characters, and contain only letters, digits, underscore, or dash (hyphen).",
      ),
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Weak Password",
      ),
    rePassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Weak Password.",
      ),
    dateOfBirth: z
      .string()
      .regex(
        /^(0[1-9]||1[0-2])-(0[1-9]||1[0-9]||2[0-9]||3[01])-(19|20)([\d]{2})$/,
        "Please enter a date with this format: mm-dd-yyyy.",
      )
      .refine((value) => {
        return new Date().getFullYear() - new Date(value).getFullYear() >= 13;
      }, "Your age should be 13+ to use the platform."),
    gender: z.enum(["male", "female"], "You must select a gender."),
  })
  .refine((values) => values.password === values.rePassword, {
    error: "Passwords should be the same.",
    path: ["rePassword"],
  });

export default function Signup() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState, setValue } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(signupSchema),
  });
  const { isPending, mutate: signUp } = useMutation({
    mutationFn: (values) => api.post("/users/signup", values),
    onSuccess: ({ data }) => {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      showSuccessToast(
        `${data.message[0]
          .toUpperCase()
          .concat(
            data.message.slice(1, data.message.length),
          )}, redirecting you to login page`,
      );
    },
    onError: ({ response }) => {
      showErrorToast(
        response.data.message[0]
          .toUpperCase()
          .concat(response.data.message.slice(1, response.data.message.length)),
      );
    },
  });
  return (
    <main className="bg-sky-50 dark:bg-slate-900 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <LoginHero />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:p-8 flex flex-col gap-y-8 justify-center lg:min-h-screen"
          children={[
            <div
              key="signupPage"
              className="bg-white dark:bg-slate-800 p-8 lg:rounded-2xl w-full transition-colors"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-sky-900 dark:text-slate-200 transition-colors">
                  Sign Up
                </h1>
                <div className="group">
                  <Link
                    to="/login"
                    className="flex items-center gap-1 w-full h-full text-lg font-semibold text-sky-600/50 dark:text-sky-500/40 hover:text-sky-600 dark:hover:text-sky-600 transition-colors"
                  >
                    Log in
                    <FaAngleRight className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(signUp)}
                className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6"
              >
                <div className="">
                  <div className="field floating-label">
                    <input
                      {...register("name")}
                      className={`peer ${
                        formState.errors.name
                          ? "border-red-400/80 dark:border-red-500/50 focus:ring-red-600/25"
                          : ""
                      }`}
                      type="text"
                      name="name"
                      id="name"
                      placeholder=""
                      autoComplete="name"
                    />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  {formState.errors.name && (
                    <div
                      className="text-sm mt-2 text-red-400 dark:text-red-500/70 transition-colors rounded-base"
                      role="alert"
                    >
                      <span className="font-medium">
                        {formState.errors.name.message}
                      </span>
                    </div>
                  )}
                </div>
                <div className="">
                  <div className="field floating-label">
                    <input
                      {...register("username")}
                      className={`peer ${
                        formState.errors.username
                          ? "border-red-400/80 dark:border-red-500/50 focus:ring-red-600/25"
                          : ""
                      }`}
                      type="text"
                      name="username"
                      id="username"
                      placeholder=""
                      autoComplete="username"
                    />
                    <label htmlFor="username">Username (optional)</label>
                  </div>
                  {formState.errors.username && (
                    <div
                      className="text-sm mt-2 text-red-400 dark:text-red-500/70 transition-colors rounded-base"
                      role="alert"
                    >
                      <span className="font-medium">
                        {formState.errors.username.message}
                      </span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
                  <div className="field floating-label">
                    <input
                      {...register("email")}
                      className={`peer ${
                        formState.errors.email
                          ? "border-red-400/80 dark:border-red-500/50 focus:ring-red-600/25"
                          : ""
                      }`}
                      type="email"
                      name="email"
                      id="email"
                      placeholder=""
                      autoComplete="email"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  {formState.errors.email && (
                    <div
                      className="text-sm mt-2 text-red-400 dark:text-red-500/70 transition-colors rounded-base"
                      role="alert"
                    >
                      <span className="font-medium">
                        {formState.errors.email.message}
                      </span>
                    </div>
                  )}
                </div>
                <div className="">
                  <PasswordInput
                    register={{ ...register("password") }}
                    id="password"
                    labelText="Password"
                    floatingLabel
                    inputProps={{ autoComplete: "new-password webauthn" }}
                  />
                  {formState.errors.password && (
                    <div
                      className="text-sm mt-2 text-red-400 dark:text-red-500/70 transition-colors rounded-base"
                      role="alert"
                    >
                      <span className="font-medium">
                        {formState.errors.password.message}
                      </span>
                    </div>
                  )}
                </div>
                <div className="">
                  <PasswordInput
                    register={{ ...register("rePassword") }}
                    id="rePassword"
                    labelText="Confirm Password"
                    floatingLabel
                    inputProps={{ autoComplete: "new-password webauthn" }}
                  />
                  {formState.errors.rePassword && (
                    <div
                      className="text-sm mt-2 text-red-400 dark:text-red-500/70 transition-colors rounded-base"
                      role="alert"
                    >
                      <span className="font-medium">
                        {formState.errors.rePassword.message}
                      </span>
                    </div>
                  )}
                </div>
                <div className="">
                  <DatePicker
                    id="birthDay"
                    name="birthDay"
                    labelText="Date of birth"
                    register={{ ...register("dateOfBirth") }}
                    setValue={setValue}
                    className={
                      formState.errors.dateOfBirth
                        ? "border-red-400/80 dark:border-red-500/50 focus:ring-red-600/25"
                        : ""
                    }
                  />
                  {formState.errors.dateOfBirth && (
                    <div
                      className="text-sm mt-2 text-red-400 dark:text-red-500/70 transition-colors rounded-base"
                      role="alert"
                    >
                      <span className="font-medium">
                        {formState.errors.dateOfBirth.message}
                      </span>
                    </div>
                  )}
                </div>
                <div className="">
                  <div className="field h-full">
                    <fieldset className="flex gap-x-12 items-center h-full">
                      <div className="flex items-center gap-x-2">
                        <input
                          {...register("gender")}
                          className="peer"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                        />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <input
                          {...register("gender")}
                          className="peer"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                    </fieldset>
                    <span className="label">Gender</span>
                    {formState.errors.gender && (
                      <div
                        className="text-sm mt-2 text-red-400 dark:text-red-500/70 transition-colors rounded-base"
                        role="alert"
                      >
                        <span className="font-medium">
                          {formState.errors.gender.message}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  isLoading={isPending}
                  className="bg-sky-500 dark:bg-sky-400/50 text-sky-50 h-fit md:col-span-2 lg:col-span-1 xl:col-span-2 py-4"
                  type="submit"
                >
                  Create your account
                </Button>
              </form>
            </div>,
          ]}
        />
      </div>
    </main>
  );
}
