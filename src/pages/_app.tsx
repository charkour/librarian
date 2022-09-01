// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";
import Link from "next/link";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  return (
    <>
      <header className="flex items-center justify-between w-full p-4 border-b">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Librarian
        </h1>
        <nav>
          <ul className="flex items-center justify-center space-x-4">
            <li>
              <Link href="/">
                <a className="text-2xl text-gray-700">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/add">
                <a className="text-2xl text-gray-700">Add</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a className="text-2xl text-gray-700">
                  {session ? "Logout" : "Login"}
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {children}
      </main>
    </>
  );
};
