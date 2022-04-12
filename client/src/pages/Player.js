import {React,useEffect,useState} from 'react';
import InnerHTML from 'dangerously-set-html-content';
import io from "socket.io-client";

//const SOCKET_URL = "http://localhost:3001";
const socket = io.connect();

function Player() {

    socket.on("show-score", saved =>{
        //useState({submitted:false,redirect:true});
      console.log(saved);
    });

const html = `<iframe id="game" class="canvasdraw" src="./game/index.html" width="640" height="390"  frameborder="0">`

    return (
        <div className="container">
            <InnerHTML html={html} />
        </div>
    );
};

export default Player;