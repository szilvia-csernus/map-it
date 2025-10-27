import { useQuery } from "react-query";
import Intro from "../Components/Intro";

// The firewall() function was needed to keep track of Mapbox's load count.
// I use my count-api app to to count load numbers.
// It sends updates via email - using the EmailJS API (https://www.emailjs.com/)
// and only allows to load the map if count does not exceed 49000.

import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import Home from "./Home";
import MapError from "./MapError";

/** Sends email using the EmailJS API */
const sendMail = (from, message) => {
  emailjs.init("sZPW9YDqBsCM52fA-");
  emailjs.send("my-emailjs-service", "universal-template", {
    project_name: "Map game project",
    from_name: from,
    message: message,
  });
};

/** Retrieves the current load count using the Count API  */
const fetchCount = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(
    // 'http://127.0.0.1:8000/visit/', # for locally testing with my count-api
    "https://3uqd6x2obk.execute-api.eu-west-2.amazonaws.com/prod/count-visit",
    requestOptions
  );
  return res.json();
};

/** Handles logic about loading the 'Home' screen. Renders Intro while loading,
 * and Error page if unsuccessful. */
export default function Load() {
  const { status, data, isFetching } = useQuery("counts", fetchCount, {
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (
      data &&
      (data.visitCount === 100 ||
        data.visitCount === 2000 ||
        data.visitCount === 20000 ||
        data.visitCount === 49000)
    ) {
      sendMail("Count API", `Map game load number reached ${data.visitCount}`);
    }
  }, [data]);

  return (
    <>
      {isFetching && <Intro />}
      {status === "error" && <MapError />}
      {status === "success" && data.visitCount < 49000 && <Home />}
      {status === "success" && data.visitCount >= 49000 && <MapError />}
    </>
  );
}
