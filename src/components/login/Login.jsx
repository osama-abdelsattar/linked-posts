// React
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
// Context
import { authContext } from "./../../context/Authentication";
import { profileContext } from "../../context/UserData";
// React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// API & Caching
import api from "../../api";
import { useMutation } from "@tanstack/react-query";
// HeroUI
import { Button } from "@heroui/react";
// Icons
import { FcGoogle } from "react-icons/fc";
import { FaAngleRight, FaFacebook } from "react-icons/fa6";
// Components
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import PasswordInput from "../password-input/PasswordInput";
import HorizontalDivider from "./../hr/HorizontalDivider";
import LoginHero from "../login-hero/LoginHero";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Weak Password",
    ),
});

export default function Login() {
  const { setToken } = useContext(authContext);
  const { setUserDataFetchEnabled } = useContext(profileContext);
  const navigate = useNavigate();
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const { isPending, mutate: logIn } = useMutation({
    mutationFn: (values) => api.post("/users/signin", values),
    onSuccess: ({ data }) => {
      setToken(data.data.token);
      localStorage.setItem("token", data.data.token);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      showSuccessToast(
        data.message[0]
          .toUpperCase()
          .concat(data.message.slice(1, data.message.length)),
      );
      setUserDataFetchEnabled(true);
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
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <LoginHero />
        <div className="p-8 flex flex-col gap-y-8 justify-center min-h-screen">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl w-full transition-colors">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-sky-900 dark:text-slate-200 transition-colors">
                Log in
              </h1>
              <div className="group">
                <Link
                  to="/signup"
                  className="block w-full h-full text-lg font-semibold text-sky-600/50 dark:text-sky-500/40 hover:text-sky-600 dark:hover:text-sky-600 transition-colors"
                >
                  Sign up
                  <FaAngleRight className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row lg:flex-col items-center gap-4">
              <button className="w-full flex gap-2 items-center justify-center px-4 py-2 cursor-pointer text-slate-600 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-900/25 border border-slate-300 rounded-2xl">
                <FcGoogle className="text-xl" />
                <span className="font-medium">Log in with Google account</span>
              </button>
              <button className="w-full flex gap-2 items-center justify-center px-4 py-2 cursor-pointer text-sky-600 dark:text-sky-600/80 bg-slate-100 hover:bg-slate-200 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-900/25 border border-slate-300 rounded-2xl">
                <FaFacebook className="text-lg" />
                <span className="font-medium">
                  Log in with Facebook account
                </span>
              </button>
            </div>
            <HorizontalDivider />
            <form
              onSubmit={handleSubmit(logIn)}
              className="mt-8 flex flex-col md:flex-row md:flex-wrap lg:flex-col lg:flex-nowrap gap-6"
            >
              <div className="grow">
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
                    autoComplete="email webauthn"
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
              <div className="grow">
                <PasswordInput
                  id="password"
                  labelText="Password"
                  register={{ ...register("password") }}
                  inputProps={{ autoComplete: "current-password webauthn" }}
                  floatingLabel
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
              <Button
                isLoading={isPending}
                className="bg-sky-500 dark:bg-sky-400/50 text-sky-50 h-fit md:col-span-2 lg:col-span-1 xl:col-span-2 py-4"
                type="submit"
              >
                Log in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
