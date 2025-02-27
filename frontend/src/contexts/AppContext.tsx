import { createContext, useContext, useState } from "react";
import { Toast } from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client"
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void,
  isLoggedIn:boolean
};

type Props = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export default function AppContextProvider({ children }: Props) {
  const [toast, SetToast] = useState<ToastMessage | undefined>(undefined);
  const {isError}=useQuery("validateToken",apiClient.validateToken,{
    retry:false
  })

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
         SetToast(toastMessage)
        },
        isLoggedIn:!isError
      }}
    >
      {toast && <Toast message={toast.message} type={toast.type} onClose={()=>SetToast(undefined)} />}
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
