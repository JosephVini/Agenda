// import validator from "validator";

// export default class Login {
//     constructor(formClass) {
//         this.form = document.querySelector(formClass);
//     }

//     init() {
//         this.events();
//     }

//     events() {
//         if (!this.form) return;
//         this.form.addEventListener('submit', e => {
//             e.preventDefault();
//             this.validate(e);
//         });
//     }

//     validate(e) {
//         const el = e.target;
//         const emailInput = el.querySelector('input[name="email"]');
//         const passwordInput = el.querySelector('input[name="password"]');
//         let error = false;

//         const existingErrorDivs = el.querySelectorAll('.text-danger');
//         existingErrorDivs.forEach(errorDiv => errorDiv.remove());

//         if (!validator.isEmail(emailInput.value)) {
//             const div = document.createElement('div');
//             div.innerHTML = 'E-mail inválido';
//             div.classList.add('text-danger');
//             emailInput.insertAdjacentElement('afterend', div);
//             error = true;
//         }
//         if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
//             const div = document.createElement('div');
//             div.innerHTML = 'Senha precisa ter entre 3 e 50 caracteres';
//             div.classList.add('text-danger');
//             passwordInput.insertAdjacentElement('afterend', div);
//             error = true;
//         }

//         if (!error) el.submit();

//     }
// }