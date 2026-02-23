import { addToast } from "@heroui/react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRegCircleXmark } from "react-icons/fa6";

export function showSuccessToast(title, description = undefined) {
  addToast({
    title,
    description,
    color: "success",
    icon: <IoIosCheckmarkCircle />,
  });
}

export function showErrorToast(title, description = undefined) {
  addToast({
    title,
    description,
    color: "danger",
    icon: <FaRegCircleXmark />,
  });
}

export function showInfoToast(
  title,
  description = undefined,
  icon = undefined,
) {
  addToast({
    title,
    description,
    icon,
  });
}
