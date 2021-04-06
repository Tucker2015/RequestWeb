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
      <div className="container">
        <img
          src={profilePicture || defaultProfilePicture(_id)}
          width="200"
          height="200"
          alt={name}
        />
        <div>
          <h2>{name}</h2>
          {isCurrentUser && (
            <Link href="/settings">
              <button type="button">Edit</button>
            </Link>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          Station Request URL
          <p>{bio}</p>
          Email
          <p>{email}</p>
        </div>
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
