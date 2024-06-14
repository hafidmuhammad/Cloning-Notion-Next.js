import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "@/components/layout/mainlayout";
import useStore from "@/components/hooks/useStore";
import LoginPage from "./loginpage";

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  const user = useStore((state) => state.user);

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        console.log("User belum login, arahkan ke halaman login...");
      }
    };

    checkUser();
  }, [user]);

  return (
    <ChakraProvider>
      {user ? getLayout(<Component {...pageProps} />) : <LoginPage />}
    </ChakraProvider>
  );
}
