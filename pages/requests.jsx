import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useCurrentUser } from "@/hooks/index";

const RequestPage = (props) => {
  const [user] = useCurrentUser();

  function removeData(id) {
    fetch("https://requests.kevtucker.com/requests/" + id, {
      method: "DELETE",
    })
      .then(() => {
        alert("Request Deleted");
        console.log("removed");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const userPosts = await axios.get(props.url);
      setPosts(userPosts.data); // set State
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPosts();
    const interval = setInterval(() => {
      getPosts();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const Card = () => {
    return (
      <main className="container">
        <div
          className="borderBx"
          style={{
            border: "1px solid #000",
            width: "100%",
            flexDirection: "column-reverse",
          }}
        >
          {posts.map((result) => {
            const {
              id,
              track,
              artist,
              contact,
              comment,
              location,
              station,
            } = result;
            return (
              <div className="borderBx" key={id}>
                <div
                  className="card-title"
                  style={{
                    background: "#442444",
                    color: "#fff",
                    fontSize: 26,
                    padding: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>{contact}</h5>
                  <h5>{station}</h5>
                </div>
                <div className="card-body" style={{ fontSize: 20 }}>
                  <h5>Comment : {comment}</h5>
                  <h5>Artist : {artist}</h5>
                  <h5>Track : {track}</h5>
                  <h5>Location : {location}</h5>
                  <button
                    className=""
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: "600",
                      background: "#444",
                      border: "none",
                      padding: 10,
                      borderRadius: 10,
                      margin: 10,
                    }}
                    onClick={() => removeData(id)}
                  >
                    Delete Request
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    );
  };

  if (!user) {
    return (
      <>
        <p>Please sign in</p>
      </>
    );
  }
  return (
    <div className="text-light">
      <Head>
        <title>Requests Page</title>
        <h3></h3>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1
        className="text-center"
        style={{ textAlign: "center", color: "#fff", fontSize: 30 }}
      >
        Digital Retroland
      </h1>

      <div>
        <Card />
      </div>
    </div>
  );
};

export default RequestPage;
