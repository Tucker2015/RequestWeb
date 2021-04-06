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
            color: #888;
          }
          h2 {
            color: #1d0404;
          }
        `}
      </style>
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h2>
          Please{" "}
          <a href="mailto:someone@example.com?subject=Apply to Register Station Request Account">
            Contact Us
          </a>{" "}
          to Register an Account
        </h2>
      </div>
    </>
  );
};

export default IndexPage;
