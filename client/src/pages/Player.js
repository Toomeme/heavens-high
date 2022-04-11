import {React} from 'react';
import InnerHTML from 'dangerously-set-html-content';
//import Iframe from 'react-iframe'
// eslint-disable-next-line import/no-webpack-loader-syntax
//htmlContent = require('../game/index.html');

function Player() {

  /*  const [data] = useState(0);

    useEffect(() => {
            // fetch the HTML fragment with a local API request
    fetch(`/play/game/index.html`)
    .then(resp => {
      // fetch returns a readable stream, so translate it into stringified HTML
      return resp.text();
    })
    .then(content => {
      // dangerouslySetInnerHTML requires using an object with an `__html` key
      
       data = content;
     
    })
    .catch(err => {
      // handle the error
    });
    });*/

    const html = `<iframe id="serviceFrameSend" src="./game/index.html" width="640" height="390"  frameborder="0">

    `

  return (
      <div className="container">
<InnerHTML html={html} />
      </div>
  );
};

export default Player;