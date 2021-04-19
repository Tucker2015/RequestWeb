import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/index";

export default function Layout({ children }) {
  const router = useRouter();
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
    router.push("/");
  };

  function Linker(props) {
    return (
      <li>
        <div className="tooltip">
          <Link href={props.link}>
            <a>
              <i className={props.icon}></i>
            </a>
          </Link>
          <span className="tooltiptext">{props.tip}</span>
        </div>
      </li>
    );
  }

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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
        />
      </Head>

      <section>
        <div className="container">
          <header>
            <Link href="/">
              <a className="logo">Station Request Site</a>
            </Link>
            <ul>
              <Linker link="/" icon="fas fa-home" tip="Home" />
              {!user ? (
                <>
                  <Linker link="/login" icon="fas fa-sign-in-alt" tip="Login" />
                </>
              ) : (
                <>
                  <Linker
                    link={`/user/${user._id}`}
                    icon="fas fa-tasks"
                    tip="Requests"
                  />
                  <Linker
                    link="/settings"
                    icon="fas fa-sliders-h"
                    tip="Settings"
                  />
                  <li>
                    <div className="tooltip">
                      <a tabIndex={0} role="button" onClick={handleLogout}>
                        <i className="fas fa-sign-in-alt"></i>
                      </a>
                      <span className="tooltiptext">Log Out</span>
                    </div>
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
