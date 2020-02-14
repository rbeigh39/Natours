/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// DOM elements
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const formUserData = document.querySelector('.form-user-data');
const changePasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// Deligation
if (loginForm) {
   loginForm.addEventListener('submit', event => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      login(email, password);
   });
}

if (logoutBtn) {
   logoutBtn.addEventListener('click', logout);
}

if (formUserData) {
   formUserData.addEventListener('submit', event => {
      event.preventDefault();

      form.append('name', document.getElementById('name').value);
      form.append('email', document.getElementById('email').value);
      form.append('photo', document.getElementById('photo').files[0]);
      console.log(form);

      updateSettings(form, 'data');
   });
}

if (changePasswordForm) {
   changePasswordForm.addEventListener('submit', async event => {
      event.preventDefault();

      document.querySelector('.btn--save-password').textContent = 'Updating...';

      const currentPassword = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;

      await updateSettings(
         {
            password,
            currentPassword,
            passwordConfirm
         },
         'password'
      );

      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';

      document.querySelector('.btn--save-password').textContent =
         'Save Password';
   });
}

if (bookBtn)
   bookBtn.addEventListener('click', e => {
      e.target.textContent = 'Processing...';

      // const tourId = e.target.dataset.tourId
      const { tourId } = e.target.dataset;
      bookTour(tourId);
   });
