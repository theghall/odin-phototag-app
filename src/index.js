// eslint-disable-next-line import/no-extraneous-dependencies
require('normalize.css');

// normalize.css must be loaded first before app css, so disable eslint check
/* eslint-disable import/first */
import './assets/css/style.scss';
/* eslint-enable import/first */

const phototagAPIUtils = require('./phototagAPIUtils');

function handleResp(param) {console.log("handling response like a boss");}
function handleErr(param) {console.log(param);}

phototagAPIUtils.makeAPIGetRequest(phototagAPIUtils.apiPaths.photoPath, {} , handleResp, handleErr);

