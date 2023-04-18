import {  useQuery } from "react-query";
import Intro from "../Components/Intro";

// The firewall() function was needed to keep track of Mapbox's load count.
// Count API (https://countapi.xyz/) is used to count load numbers.
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
	const res = await fetch(
		'https://api.countapi.xyz/hit/szilvia-csernus/map-game'
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
            (data.value === 100 ||
			    data.value === 2000 ||
			    data.value === 20000 ||
			    data.value === 49000))
        {
            sendMail('Count API', `Map game load number reached ${data.value}`); 
        }
    }, [data])


    return (
			<>
				{isFetching && <Intro />}
				{status === 'error' && <MapError />}
				{(status === 'success' && data.value < 49000) && <Home />}
				{status === 'success' && data.value >= 49000 && <MapError />}
			</>
		);
}