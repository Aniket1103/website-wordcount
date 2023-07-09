import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const postInsightsEndpoint =
    (import.meta?.env?.VITE_PATH ||
      `http://localhost:${import.meta?.env?.VITE_PORT || "4000"}`) +
    `/insights`;

  function handleInput(e) {
    setError("");
    setUrl(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(import.meta.env, postInsightsEndpoint)
    if (url === "") return;

    try {
      let response = await fetch(postInsightsEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      let body = await response.json();
      console.log(response.status);
      if (response.status >= 200 && response.status < 400) {
        console.log("body-> ", body, response.status);
        navigateTo("/insights"); // Redirect to /insights
      } else if (
        response.status === 400 ||
        response.status === 403 ||
        response.status === 404
      ) {
        setError("Entered URL is Invalid");
        console.log(body);
      } else console.log(response.status, body);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Website Word Counter</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={url}
          placeholder="e.g. https://www.example.com"
          className="insights-input"
          onChange={handleInput}
          type="text"
        />
        <button>Get Insights</button>
        <div className="input-error">{error ? error : ""}</div>
      </form>
    </>
  );
}

export default Home;
