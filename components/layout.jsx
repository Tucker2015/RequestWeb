import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/index";

export default function Layout({ children }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };
  return (
    <>
      <Head>
        <title>Request Test Page</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Testing a Server Side Render" />
        <meta property="og:title" content="Test Page" />
        <meta
          property="og:description"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
      </Head>

      <section>
        <div className="container">
          <header>
            <Link href="/">
              <a className="logo">Station Request Site</a>
            </Link>
            <ul>
              <li>
                <Link href="/">
                  <a className="active">Home</a>
                </Link>
              </li>
              {!user ? (
                <>
                  <li>
                    <Link href="/login">
                      <a>Sign In</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup">
                      <a>Register</a>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href={`/user/${user._id}`}>
                      <a>Profile</a>
                    </Link>
                  </li>

                  <li>
                    <a tabIndex={0} role="button" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </header>
          <main className="content">{children}</main>
        </div>
      </section>
    </>
  );
}
