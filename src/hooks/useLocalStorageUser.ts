// import { useState } from 'react';
// import {v4 as uuidv4} from 'uuid';


// export default function useLocalStorageUser() {
//     //Pas besoin d'utiliser setUserId vu que la logique dedans s'occupe de déterminer s'il y'a un userId ou pas
//     // eslint-disable-next-line
//   const [userId, setUserId] = useState(() => {
//     const localStorageId = localStorage.getItem("userId");
//     if(localStorageId) {
//         return localStorageId
//     } else {
//         const newUserId = uuidv4();
//         localStorage.setItem('userId', newUserId);
//         return newUserId;
//     }
//   });
//   return userId;
// }