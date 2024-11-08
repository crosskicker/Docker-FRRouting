// data.js
import routerLogo from '../assets/router_logo.png';

/* 
le role de id et id_n est switcher dans le code de
Board a cause du fonctionnement de react 
flow ( exige un str en id) */

const netDeviceL = [
  {
    name: "FRR Router",
    id: 1,
    position : {x: 0, y: 0},
    image: routerLogo,
    id_c:0,
    number:0
  },
  {
    name: "FRR Router",
    id: 2,
    position : {x: 0, y: 0},
    image: routerLogo,
    id_c:0,
    number:0
  },
];

export default netDeviceL;
