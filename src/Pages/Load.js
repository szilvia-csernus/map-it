import {  useQuery } from "react-query";
import Intro from "../Components/Intro";

// The firewall() function was needed to keep track of Mapbox's load count.
// I use my count-api app to to count load numbers.
// It sends updates via email - using the EmailJS API (https://www.emailjs.com/)
// and only allows to load the map if count does not exceed 49000.

import emailjs from '@emailjs/browser';
import { useEffect } from "react";
import Home from "./Home";
import MapError from "./MapError";

/** Sends email using the EmailJS API */
const sendMail = (from, message) => {
    emailjs.init('sZPW9YDqBsCM52fA-');
    emailjs.send('my-emailjs-service', 'universal-template', {
        project_name: 'Map game project',
        from_name: from,
        message: message,
    });
};

/** Retrieves the current load count using the Count API  */
const fetchCount = async () => {
	const requestOptions = {
		method: 'GET',
	};
	const res = await fetch(
		// 'http://127.0.0.1:8000/visit/', # for locally testing with my count-api
		'https://count-api-c7e04ddc5f87.herokuapp.com/visit/',
		requestOptions
	);
	return res.json();
};

/** Handles logic about loading the 'Home' screen. Renders Intro while loading,
 * and Error page if unsuccessful. */
export default function Load() {   
    const { status, data, isFetching } = useQuery('counts', fetchCount, {
			refetchOnWindowFocus: false,
		});

    useEffect(() => {
        if (data && 
            (data.count === 100 ||
			    data.count === 2000 ||
			    data.count === 20000 ||
			    data.count === 49000))
        {
            sendMail('Count API', `Map game load number reached ${data.count}`); 
        }
    }, [data])


    return (
			<>
				{isFetching && <Intro />}
				{status === 'error' && <MapError />}
				{(status === 'success' && data.count < 49000) && <Home />}
				{status === 'success' && data.count >= 49000 && <MapError />}
			</>
		);
}