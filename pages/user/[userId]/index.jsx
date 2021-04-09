import React from "react";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import { all } from "@/middlewares/index";
import { useCurrentUser } from "@/hooks/index";
// import Posts from "@/components/post/posts";
import { extractUser } from "@/lib/api-helpers";
import { findUserById } from "@/db/index";
import { defaultProfilePicture } from "@/lib/default";
import RequestPage from "../../requests";

export default function UserPage({ user }) {
  if (!user) return <Error statusCode={404} />;
  const { name, email, bio, profilePicture, _id, streamKey } = user || {};
  const [currentUser] = useCurrentUser();
  const isCurrentUser = currentUser?._id === user._id;
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div>
        <h1 className="" style={{ textAlign: "center" }}>
          Hello {name}, Here is your Station Requests
        </h1>
      </div>
      <div>
        <RequestPage url={user.bio} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  const user = extractUser(
    await findUserById(context.req.db, context.params.userId)
  );
  if (!user) context.res.statusCode = 404;
  return { props: { user } };
}
