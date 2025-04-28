document.addEventListener('DOMContentLoaded', () => {
    // 1. Mostrar/Ocultar campos internos según tipo de cliente
    const tipo = document.getElementById('seleccion-cliente');
    const camposInternos = document.getElementById('campos-internos');

    const verificarSeleccionTipo = () => {
        if (tipo.value === 'interno') {
            camposInternos.style.display = 'block';
        } else {
            camposInternos.style.display = 'none';
        }
    };
    

    verificarSeleccionTipo();
    tipo.addEventListener('change', verificarSeleccionTipo);

    // 2. Mostrar la tarjeta según la orientación seleccionada
    const orientacion = document.getElementById('seleccion-orientacion');
    const cardVertical = document.getElementById('card-vertical');
    const cardHorizontal = document.getElementById('card-horizontal');

    const verificarSeleccionOrientacion = () => {
        if (orientacion.value === 'vertical') {
            cardVertical.style.display = 'block';
            cardHorizontal.style.display = 'none';
        } else {
            cardVertical.style.display = 'none';
            cardHorizontal.style.display = 'block';
        }
    };

    verificarSeleccionOrientacion();
    orientacion.addEventListener('change', verificarSeleccionOrientacion);

    // 3. Generar imagen al enviar el formulario
    const form = document.getElementById('formulario');

// Declaracion de constantes para guardar los Input de los campos del formulario
const NombreCliente = document.getElementById('nombre-cliente');
const sector = document.getElementById('sector');
const servicios = document.getElementById('servicios');

const guardarDatosFormulario = () => {
    const datosFormulario = {
        nombre: NombreCliente.value,
        sector: sector.value,
        servicios: servicios.value,
    };

    // Insertar los datos en la tarjeta seleccionada
    const tarjetaSeleccionada = document.getElementById('seleccion-orientacion').value === 'vertical' 
        ? document.getElementById('card-vertical') 
        : document.getElementById('card-horizontal');

    tarjetaSeleccionada.querySelector('.nombre-cliente').textContent = datosFormulario.nombre;
    tarjetaSeleccionada.querySelector('.sector-cliente').textContent = datosFormulario.sector;
    tarjetaSeleccionada.querySelector('.servicios-cliente').textContent = datosFormulario.servicios;

    console.log('Datos del formulario guardados:', datosFormulario);
    return datosFormulario;
};
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita recargar la página

        guardarDatosFormulario(); // Guardar los datos del formulario

        const tarjetaSeleccionada = orientacion.value === 'vertical' ? cardVertical : cardHorizontal;

        html2canvas(tarjetaSeleccionada).then(canvas => {
            const link = document.createElement('a');
            link.download = `Bienvenida_${orientacion.value}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
});
