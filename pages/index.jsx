import React from "react";
import { useCurrentUser } from "@/hooks/index";
import PostEditor from "@/components/post/editor";
import Posts from "@/components/post/posts";

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #000;
            font-size: 24px;
          }
          h3 {
            color: #000;
          }
        `}
      </style>
      <div style={{ marginBottom: "2rem" }}>
        <h3>Hello, {user ? user.name : "Please Register an Account"}!</h3>
        <p>Have a wonderful day.</p>
      </div>
      <div>
        <h3>
          All posts from the Web{" "}
          <span role="img" aria-label="Earth">
            🌎
          </span>
        </h3>
        <PostEditor />
        <Posts />
      </div>
    </>
  );
};

export default IndexPage;
