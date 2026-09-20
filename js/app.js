export const $ = (sel) => document.querySelector(sel);

const formContacto = $('#formContacto');
const outContacto = $('#outContacto');

const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mostrarError(campo, texto) {
  campo.classList.add('con-error');
  campo.querySelector('.mensaje-error').textContent = texto;
}

function limpiarError(campo) {
  campo.classList.remove('con-error');
  campo.querySelector('.mensaje-error').textContent = '';
}

function validarObligatorio(input) {
  const campo = input.closest('.campo');
  if (input.value.trim() === '') {
    mostrarError(campo, 'Dato obligatorio');
    return false;
  }
  limpiarError(campo);
  return true;
}

if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    const okNombres = validarObligatorio($('#nombres'));
    const okApellidos = validarObligatorio($('#apellidos'));
    const okMensaje = validarObligatorio($('#mensaje'));

    let okCorreo = validarObligatorio($('#correo'));
    if (okCorreo && !regexCorreo.test($('#correo').value.trim())) {
      mostrarError($('#correo').closest('.campo'), 'Correo no válido');
      okCorreo = false;
    }

    if (okNombres && okApellidos && okCorreo && okMensaje) {
      outContacto.textContent = '¡Formulario enviado correctamente! Nos contactaremos a la brevedad.';
      formContacto.reset();
    } else {
      outContacto.textContent = '';
    }
  });
}