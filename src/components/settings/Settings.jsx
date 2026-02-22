// React
import { useContext } from "react";
// Context
import { authContext } from "../../context/Authentication";
// React Hook Form
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// API & Caching
import axios from "axios";
import { useForm } from "react-hook-form";
// HeroUI
import { addToast, Button, Chip, Select, SelectItem } from "@heroui/react";
// Icons
import { PiWrenchFill } from "react-icons/pi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { GoPasskeyFill } from "react-icons/go";
// Components
import PasswordInput from "../password-input/PasswordInput";
import ThemeSwitch from "../themeSwitch/ThemeSwitch";
// Functional Components
function AccountSettings() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <FaUserCircle className="size-10" />
        <div className="">
          <h2 className="text-xl font-medium">Account</h2>
          <p className="text-slate-500">Change name, username, etc.</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium mb-2 text-gray-400 dark:text-gray-600">
              Change username:
            </h3>
            <Chip
              className="bg-gray-200 text-gray-400 dark:bg-gray-700/60 dark:text-gray-500 transition-colors"
              size="md"
            >
              Coming soon...
            </Chip>
          </div>
          <div className="flex gap-2">
            <div className="field grow">
              <input type="text" placeholder="" className="grow" disabled />
            </div>
            <Button
              isDisabled
              className="bg-sky-500 dark:bg-sky-400/50 text-sky-50 h-[stretch]"
            >
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
function AppearanceSettings() {
  const themes = [
    { key: "default", label: "Default (blue)" },
    { key: "soon", label: "Coming soon...." },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <PiWrenchFill className="size-10" />
        <div className="">
          <h2 className="text-xl font-medium">Appearance</h2>
          <p className="text-slate-500">
            Customise the app's appearance as you wish.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span>Dark mode</span>
          <ThemeSwitch />
        </div>
        <div className="flex justify-between items-center">
          <span>Theme</span>
          <Select
            disabledKeys={["soon"]}
            className="max-w-48"
            classNames={{
              trigger:
                "bg-sky-900/5 dark:bg-slate-900/40 data-[hover=true]:bg-sky-900/10 dark:data-[hover=true]:bg-sky-300/5 transition-colors cursor-pointer",
              value: "text-slate-500 dark:text-sky-100",
            }}
            placeholder="Select a theme"
          >
            {themes.map((theme) => (
              <SelectItem key={theme.key}>{theme.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
function SecuritySettings() {
  const { token, setToken } = useContext(authContext);
  const schema = z
    .object({
      password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Weak Password",
        ),
      newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Weak Password",
        ),
      confirmPassword: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Weak Password",
        ),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
      error: "Passwords should be the same.",
      path: ["confirmPassword"],
    });
  const { formState, handleSubmit, register, reset } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });
  const { isPending, mutate: changePassword } = useMutation({
    mutationFn: (values) =>
      axios.patch(
        "https://route-posts.routemisr.com/users/change-password",
        {
          password: values.password,
          newPassword: values.newPassword,
        },
        { headers: { token: token } },
      ),
    onSuccess: ({ data }) => {
      addToast({
        title: data.message[0]
          .toUpperCase()
          .concat(data.message.slice(1, data.message.length), "."),
        color: "success",
        icon: <IoIosCheckmarkCircle />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
      reset();
      setToken(data.data.token);
      localStorage.setItem("token", data.data.token);
    },
    onError: ({ response }) => {
      console.log(response);
      addToast({
        title: "Old password is incorrect.",
        color: "danger",
        icon: <FaRegCircleXmark />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
    },
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <GoPasskeyFill className="size-10" />
        <div className="">
          <h2 className="text-xl font-medium">Security</h2>
          <p className="text-slate-500">Change password, etc.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(changePassword)}>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Change password:</h3>
          <div className="">
            <PasswordInput
              id="oldPass"
              register={{ ...register("password") }}
              labelText="Old password"
              floatingLabel
              inputProps={{ autoComplete: "current-password webauthn" }}
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
              id="newPass"
              register={{ ...register("newPassword") }}
              labelText="New password"
              floatingLabel
              inputProps={{ autoComplete: "new-password webauthn" }}
            />
            {formState.errors.newPassword && (
              <div
                className="text-sm mt-2 text-red-400 dark:text-red-500/70 transition-colors rounded-base"
                role="alert"
              >
                <span className="font-medium">
                  {formState.errors.newPassword.message}
                </span>
              </div>
            )}
          </div>
          <div className="">
            <PasswordInput
              id="confirmPass"
              labelText="Confirm password"
              register={{ ...register("confirmPassword") }}
              floatingLabel
              inputProps={{ autoComplete: "new-password webauthn" }}
            />
            {formState.errors.confirmPassword && (
              <div
                className="text-sm mt-2 text-red-400 dark:text-red-500/70 transition-colors rounded-base"
                role="alert"
              >
                <span className="font-medium">
                  {formState.errors.confirmPassword.message}
                </span>
              </div>
            )}
          </div>
          <Button
            type="submit"
            isLoading={isPending}
            className="bg-sky-500 dark:bg-sky-400/50 text-sky-50 py-6"
          >
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function Settings() {
  return (
    <div className="flex flex-col gap-8">
      <div className="">
        <h1 className="text-5xl font-semibold mb-2">Settings</h1>
        <p className="text-lg text-slate-500">
          Change password, toggle dark theme, and more.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-12">
        <AppearanceSettings />
        <AccountSettings />
        <SecuritySettings />
      </div>
    </div>
  );
}
