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

/* info dino, no hay base de datos */

const formEditarDinosaurio = $('#formEditarDinosaurio');
if (formEditarDinosaurio) {
	const dinosaurios = {
		trex: {
			nombre: 'Tyrannosaurus Rex',
			familia: 'Tyrannosauridae',
			grupo: 'Terópodos',
			periodo: 'Cretácico tardío',
			antiguedad: 'Hace aproximadamente entre 68 y 66 millones de años',
			alimentacion: 'Carnívoro',
			longitud: 'Aproximadamente 12 metros',
			peso: 'Aproximadamente 7 toneladas',
			ubicacion: 'América del Norte',
			sobre: 'El Tyrannosaurus Rex fue un enorme dinosaurio carnívoro que vivió durante los últimos millones de años del período Cretácico.\n\nCaminaba sobre dos patas y tenía una cabeza muy grande, fuertes mandíbulas y dientes capaces de cortar carne y triturar huesos.',
			dato: 'El T. rex tenía brazos muy pequeños en comparación con el resto de su cuerpo. Cada brazo tenía solamente dos dedos.'
		},
		triceratops: {
			nombre: 'Triceratops',
			familia: 'Ceratopsidae',
			grupo: 'Ceratópsidos',
			periodo: 'Cretácico tardío',
			antiguedad: 'Hace aproximadamente entre 68 y 66 millones de años',
			alimentacion: 'Herbívoro',
			longitud: 'Aproximadamente 9 metros',
			peso: 'Aproximadamente 6 toneladas',
			ubicacion: 'América del Norte',
			sobre: 'El Triceratops era un dinosaurio herbívoro que caminaba sobre cuatro patas. Su característica más conocida era su enorme cabeza, que tenía tres cuernos y una gran gola ósea.Tenía un pico fuerte que utilizaba para cortar plantas y dientes preparados para triturar vegetación.',
			dato: 'Algunos fósiles de Triceratops presentan marcas de mordidas compatibles con las de Tyrannosaurus rex.'
		},
		velociraptor: {
			nombre: 'Velociraptor',
			familia: 'Dromaeosauridae',
			grupo: 'Terópodos',
			periodo: 'Cretácico tardío',
			antiguedad: 'Hace aproximadamente 75 millones de años',
			alimentacion: 'Carnívoro',
			longitud: 'Aproximadamente 2 metros',
			peso: 'Aproximadamente 15 kilogramos',
			ubicacion: 'Asia',
			sobre: 'El Velociraptor era un dinosaurio carnívoro relativamente pequeño que caminaba sobre dos patas.Tenía dientes afilados y una gran garra curva en cada una de sus patas traseras. Actualmente se considera que su cuerpo estaba cubierto en gran parte por plumas.',
			dato: 'El Velociraptor real era mucho más pequeño que el que suele aparecer representado en algunas películas.'
		},
		ankylosaurus: {
			nombre: 'Ankylosaurus',
			familia: 'Ankylosauridae',
			grupo: 'Anquilosaurios',
			periodo: 'Cretácico tardío',
			antiguedad: 'Hace aproximadamente entre 68 y 66 millones de años',
			alimentacion: 'Herbívoro',
			longitud: 'Aproximadamente 8 metros',
			peso: 'Aproximadamente 8 toneladas',
			ubicacion: 'América del Norte',
			sobre: 'El Ankylosaurus era un dinosaurio herbívoro que caminaba sobre cuatro patas y tenía gran parte de su cuerpo protegido por placas óseas.También tenía una pesada maza en el extremo de la cola, que probablemente utilizaba para defenderse de grandes depredadores.',
			dato: 'Hasta el momento no se ha encontrado un esqueleto completamente entero de Ankylosaurus, aunque existen suficientes fósiles para conocer gran parte de su anatomía.'
		},
		brachiosaurus: {
			nombre: 'Brachiosaurus',
			familia: 'Brachiosauridae',
			grupo: 'Saurópodos',
			periodo: 'Jurásico tardío',
			antiguedad: 'Hace aproximadamente entre 154 y 150 millones de años',
			alimentacion: 'Herbívoro',
			longitud: 'Aproximadamente 25 metros',
			peso: 'Aproximadamente 50 toneladas',
			ubicacion: 'América del Norte',
			sobre: 'El Brachiosaurus era un enorme dinosaurio que caminaba sobre cuatro patas. Su largo cuello le permitía alcanzar vegetación situada a gran altura.A diferencia de muchos otros saurópodos, sus patas delanteras eran más largas que las traseras, lo que hacía que su cuerpo tuviera una posición inclinada.',
			dato: 'Sus fosas nasales estaban ubicadas en una posición elevada sobre su cráneo.'
		},
		stegosaurus: {
			nombre: 'Stegosaurus',
			familia: 'Stegosauridae',
			grupo: 'Estegosaurios',
			periodo: 'Jurásico tardío',
			antiguedad: 'Hace aproximadamente entre 155 y 150 millones de años',
			alimentacion: 'Herbívoro',
			longitud: 'Aproximadamente 9 metros',
			peso: 'Aproximadamente 5 toneladas',
			ubicacion: 'América del Norte',
			sobre: 'El Stegosaurus caminaba sobre cuatro patas y se alimentaba principalmente de vegetación baja.Tenía dos filas de grandes placas a lo largo de la espalda y varias púas en el extremo de la cola que podían servir como defensa.',
			dato: 'A pesar de su gran tamaño, tenía un cerebro relativamente pequeño en comparación con el resto de su cuerpo.'
		},
		therizinosaurus: {
			nombre: 'Therizinosaurus',
			familia: 'Therizinosauridae',
			grupo: 'Terópodos',
			periodo: 'Cretácico tardío',
			antiguedad: 'Hace aproximadamente entre 70 y 66 millones de años',
			alimentacion: 'Herbívoro',
			longitud: 'Aproximadamente 9 metros',
			peso: 'Aproximadamente 5 toneladas',
			ubicacion: 'Asia',
			sobre: 'El Therizinosaurus era un terópodo muy diferente de grandes depredadores como el Tyrannosaurus rex.Tenía un cuello largo, un cuerpo voluminoso y enormes garras en las patas delanteras que podían alcanzar cerca de un metro de longitud.',
			dato: 'Sus garras están entre las más largas conocidas de cualquier animal terrestre.'
		},
		apatosaurus: {
			nombre: 'Apatosaurus',
			familia: 'Diplodocidae',
			grupo: 'Saurópodos',
			periodo: 'Jurásico tardío',
			antiguedad: 'Hace aproximadamente entre 152 y 151 millones de años',
			alimentacion: 'Herbívoro',
			longitud: 'Aproximadamente 21 metros',
			peso: 'Aproximadamente 20 toneladas',
			ubicacion: 'América del Norte',
			sobre: 'El Apatosaurus era un enorme saurópodo que caminaba sobre cuatro patas y se alimentaba de plantas.Tenía un cuello muy largo, un cuerpo robusto y una extensa cola que utilizaba para mantener el equilibrio.',
			dato: 'Durante muchos años fue confundido con otro dinosaurio llamado Brontosaurus.'
		},
		spinosaurus: {
			nombre: 'Spinosaurus',
			familia: 'Spinosauridae',
			grupo: 'Terópodos',
			periodo: 'Cretácico medio',
			antiguedad: 'Hace aproximadamente entre 100 y 94 millones de años',
			alimentacion: 'Carnívoro',
			longitud: 'Aproximadamente 15 metros',
			peso: 'Aproximadamente 7 toneladas',
			ubicacion: 'África del Norte',
			sobre: 'El Spinosaurus fue uno de los dinosaurios carnívoros más grandes conocidos. Tenía un hocico largo y estrecho parecido al de algunos cocodrilos.Sus características indican que estaba especialmente adaptado para capturar peces y pasar parte de su tiempo cerca del agua.',
			dato: 'Las espinas de sus vértebras podían alcanzar más de un metro de altura y formaban su característica vela dorsal.'
		},
		parasaurolophus: {
			nombre: 'Parasaurolophus',
			familia: 'Hadrosauridae',
			grupo: 'Ornitópodos',
			periodo: 'Cretácico tardío',
			antiguedad: 'Hace aproximadamente entre 76 y 73 millones de años',
			alimentacion: 'Herbívoro',
			longitud: 'Aproximadamente 10 metros',
			peso: 'Aproximadamente 2,5 toneladas',
			ubicacion: 'América del Norte',
			sobre: 'El Parasaurolophus pertenecía al grupo de dinosaurios conocidos como dinosaurios de pico de pato.Podía desplazarse sobre dos o cuatro patas y utilizaba sus numerosos dientes para triturar plantas.',
			dato: 'Los científicos creen que su cresta podía ayudarle a producir sonidos para comunicarse con otros miembros de su especie.'
		},
		carnotaurus: {
			nombre: 'Carnotaurus',
			familia: 'Abelisauridae',
			grupo: 'Terópodos',
			periodo: 'Cretácico tardío',
			antiguedad: 'Hace aproximadamente entre 72 y 69 millones de años',
			alimentacion: 'Carnívoro',
			longitud: 'Aproximadamente 8 metros',
			peso: 'Aproximadamente 1,5 toneladas',
			ubicacion: 'América del Sur',
			sobre: 'El Carnotaurus era un depredador que caminaba sobre dos patas. Tenía un cráneo corto y profundo con dos característicos cuernos sobre los ojos.Sus brazos eran extremadamente pequeños, incluso en comparación con los del Tyrannosaurus rex.',
			dato: 'Se han conservado impresiones de su piel, lo que permitió conocer que estaba cubierta por pequeñas escamas.'
		},
		iguanodon: {
			nombre: 'Iguanodon',
			familia: 'Iguanodontidae',
			grupo: 'Ornitópodos',
			periodo: 'Cretácico temprano',
			antiguedad: 'Hace aproximadamente entre 126 y 122 millones de años',
			alimentacion: 'Herbívoro',
			longitud: 'Aproximadamente 10 metros',
			peso: 'Aproximadamente 3,5 toneladas',
			ubicacion: 'Europa',
			sobre: 'El Iguanodon era un dinosaurio herbívoro que podía desplazarse tanto sobre dos patas como sobre cuatro.Tenía fuertes patas traseras, una cola larga y manos especiales adaptadas para diferentes funciones.',
			dato: 'Cuando se descubrieron sus primeros fósiles, la púa de su pulgar fue confundida con un cuerno que se creía que estaba situado sobre su nariz.'
		}
	};
	const parametros = new URLSearchParams(window.location.search); /*leer los parámetros que vienen en la URL, todo loq ue viene despues del ?*/
	const tipoDinosaurio = parametros.get('dinosaurio');
	const dinosaurio = dinosaurios[tipoDinosaurio];
	if (dinosaurio) {
		$('#tituloDinosaurio').textContent = 'Editar ' + dinosaurio.nombre;
		$('#nombre').value = dinosaurio.nombre;
		$('#familia').value = dinosaurio.familia;
		$('#grupo').value = dinosaurio.grupo;
		$('#periodo').value = dinosaurio.periodo;
		$('#antiguedad').value = dinosaurio.antiguedad;
		$('#alimentacion').value = dinosaurio.alimentacion;
		$('#longitud').value = dinosaurio.longitud;
		$('#peso').value = dinosaurio.peso;
		$('#ubicacion').value = dinosaurio.ubicacion;
		$('#sobre').value = dinosaurio.sobre;
		$('#dato').value = dinosaurio.dato;
	}
	formEditarDinosaurio.addEventListener('submit', (e) => {
		e.preventDefault();
		const mensajeGuardado = $('#mensajeGuardado');
		mensajeGuardado.textContent = '¡Cambios guardados correctamente!';
	});

	const btnDesactivar = $('#btnDesactivar');
	const mensajeDesactivada = $('#mensajeDesactivada');

	btnDesactivar.addEventListener('click', () => {
	mensajeDesactivada.textContent = '¡Especie desactivada correctamente!';
	});
}

/*info mockup contacto, no hay base de datos*/

const nombreContacto = $('#nombreContacto');

if (nombreContacto) {
  const parametrosContacto = new URLSearchParams(window.location.search);
  const numeroContacto = parametrosContacto.get('contacto');
  const contactos = {
    1: {
      nombre: 'Daniela Beltrán',
      correo: 'dani.b@email.com',
      fecha: '20/09/2026',
      mensaje: 'Holaa, quisiera saber cuáles son los horarios disponibles para visitar el museo y si es necesario reservar con anticipación'
    },
    2: {
      nombre: 'Daniela Cuevas',
      correo: 'dani.c@email.com',
      fecha: '21/09/2026',
      mensaje: 'Hola, quisiera consultar si tienen visitas guiadas para grupos y cuál es el valor de la entrada :D'
    },
    3: {
      nombre: 'Diego Reyes',
      correo: 'diego@email.com',
      fecha: '22/09/2026',
      mensaje: 'Buenas, quisiera saber si el museo estará abierto este fin de semana y cuáles son los horarios de atención, es que soy del sur :('
    },
    4: {
      nombre: 'Amira Rice',
      correo: 'amira@email.com',
      fecha: '23/09/2026',
      mensaje: 'Holi, quisiera consultar por las exposiciones disponibles actualmente y si tienen actividades para estudiantes'
    }
  };

  const contacto = contactos[numeroContacto];
  if (contacto) {
    $('#tituloContacto').textContent =
      'Contacto de ' + contacto.nombre;
    $('#nombreContacto').value =
      contacto.nombre;
    $('#correoContacto').value =
      contacto.correo;
    $('#fechaContacto').value =
      contacto.fecha;
    $('#mensajeContacto').value =
      contacto.mensaje;
  }
}
