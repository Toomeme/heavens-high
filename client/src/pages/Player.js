import {React,useState,useEffect} from 'react';
import InnerHTML from 'dangerously-set-html-content';
import io from "socket.io-client";
import { Redirect } from 'react-router-dom';

const socket = io.connect();
var fileID = '';

function Player() {

    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect( () => {
        console.log(isSubmitted);
    }, [isSubmitted]);

    socket.on("show-score", saved =>{
        fileID = saved;
        setIsSubmitted(true);
        console.log(saved);
    });

const html = `<iframe id="game" class="canvasdraw" src="./game/index.html" width="640" height="390"  frameborder="0">`

    return (
        <div>
        {isSubmitted ? (<Redirect push to={'/submit/'+ fileID}/>) : (
    <div className="container">
        <InnerHTML html={html} />
    </div>
  )}
  </div>
    );
};

export default Player;