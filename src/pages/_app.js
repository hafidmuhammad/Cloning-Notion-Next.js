import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "../components/layout/mainlayout";
import useStore from "../components/hooks/useStore";
import LoginPage from "./loginpage";

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (e) {
          console.error("Error parsing stored user data:", e);
          localStorage.removeItem('user');
        }
      }
    };

    checkUser();
  }, [setUser]);

  return (
    <ChakraProvider>
      {user ? getLayout(<Component {...pageProps} />) : <LoginPage />}
    </ChakraProvider>
  );
}
