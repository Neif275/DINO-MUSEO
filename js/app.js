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

function validarCorreo(input){
  const campo = input.closest('.campo');
  if (input.value.trim() === '') {
    mostrarError(campo, 'Dato obligatorio');
    return false
  }
  if (!regexCorreo.test(input.value.trim())) {
    mostrarError(campo, 'Correo no válido');
    return false
  }
  limpiarError(campo);
  return true
}

if (formContacto) {

  const inputNombres = $('#nombres');
  const inputApellidos = $('#apellidos');
  const inputCorreo = $('#correo');
  const inputMensaje = $('#mensaje');

  inputNombres.addEventListener('blur', () => validarObligatorio(inputNombres));
  inputApellidos.addEventListener('blur', () => validarObligatorio(inputApellidos));
  inputMensaje.addEventListener('blur', () => validarObligatorio(inputMensaje));
  inputCorreo.addEventListener('blur', () => validarCorreo(inputCorreo));

  inputNombres.addEventListener('input', () => {
    if (inputNombres.closest('.campo').classList.contains('con-error')) validarObligatorio(inputNombres);
  });
  inputApellidos.addEventListener('input', () => {
    if (inputApellidos.closest('.campo').classList.contains('con-error')) validarObligatorio(inputApellidos);
  });
  inputMensaje.addEventListener('input', () => {
    if (inputMensaje.closest('.campo').classList.contains('con-error')) validarObligatorio(inputMensaje);
  });
  inputCorreo.addEventListener('input', () => {
    if (inputCorreo.closest('.campo').classList.contains('con-error')) validarCorreo(inputCorreo);
  });


  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    const okNombres = validarObligatorio($('#nombres'));
    const okApellidos = validarObligatorio($('#apellidos'));
    const okMensaje = validarObligatorio($('#mensaje'));

    const okCorreo = validarCorreo($('#correo'));

    if (okNombres && okApellidos && okCorreo && okMensaje) {
      outContacto.textContent = '¡Formulario enviado correctamente! Nos contactaremos a la brevedad.';
      formContacto.reset();
    } else {
      outContacto.textContent = '';
    }
  });
}