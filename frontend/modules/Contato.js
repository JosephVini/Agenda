// import validator from "validator";

// export default class Contato {
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
//         const telefoneInput = el.querySelector('input[name="telefone"]');
//         let error = false;

//         const existingErrorDivs = el.querySelectorAll('.text-danger');
//         existingErrorDivs.forEach(errorDiv => errorDiv.remove());

//         if (!validator.isEmail(emailInput.value)) {
//             const div = document.createElement('div');
//             div.innerHTML = 'E-mail inválido';
//             div.classList.add('text-danger');
//             emailInput.insertAdjacentElement('afterend', div);
//             error = true;
//         } else if (!validator.isMobilePhone(telefoneInput.value, 'any', { strictMode: false })) {
//             const div = document.createElement('div');
//             div.innerHTML = 'Telefone inválido';
//             div.classList.add('text-danger');
//             telefoneInput.insertAdjacentElement('afterend', div);
//             error = true;
//         }

//         if (!error) el.submit();
//     }
// }