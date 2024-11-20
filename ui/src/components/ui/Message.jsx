export default function Message({ children, type }) {
  let classname = "";

  switch (type) {
    case "error":
      classname = "text-red-500";
      break;
    case "info":
      classname = "text-secondary";
      break;
    case "warning":
      classname = "text-yellow-500";
      break;
    default:
      classname = "text-secondary";
      break;
  }
  return (
    children && (
      <p className={`py-2 font-bold text-sm ${classname}`}>{children}</p>
    )
  );
}
