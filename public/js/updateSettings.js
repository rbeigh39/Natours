/* eslint-disable */
/*
Create updateData function. call that function from index.js
*/

import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
   const url =
      type === 'password'
         ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
         : 'http://127.0.0.1:3000/api/v1/users/updateMe';

   try {
      const res = await axios({
         method: 'PATCH',
         url,
         data
      });

      if (res.data.status === 'success')
         showAlert('success', `${type.toUpperCase()} updated successfully!`);
   } catch (err) {
      showAlert('error', err.response.data.message);
   }
};

// export const updateNameEmail = async data => {
//    try {
//       const res = await axios({
//          method: 'PATCH',
//          url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
//          data
//       });

//       if (res.data.status === 'success')
//          showAlert('success', 'Data updated successfully!');
//    } catch (err) {
//       showAlert('error', err.response.data.message);
//    }
// };
