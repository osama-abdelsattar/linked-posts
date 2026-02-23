export default function cleanErrorMsg(errorMsg) {
  if (!errorMsg || typeof errorMsg !== "string") return "failed";
  return errorMsg.slice(errorMsg.lastIndexOf('"') + 1).trim();
}
