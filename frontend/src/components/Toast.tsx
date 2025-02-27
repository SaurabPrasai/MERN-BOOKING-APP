import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 p-4 rounded-mg bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 p-4 rounded-mg bg-red-600 text-white max-w-md";

  return (
    <div className={styles}>
      <div className="flex justify-center item-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};
