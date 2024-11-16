"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos del DOM
  const tipoInput = document.getElementById('tipoInput');
  const elementIdInput = document.getElementById('elementId');
  const agregarElemento = document.getElementById('agregarElemento');
  const formularioDinamico = document.getElementById('formularioDinamico');
  const mensajeError = document.getElementById('mensajeError');
  const mensajeExito = document.getElementById('mensajeExito');
  const idsEnUso = new Set();

  
  agregarElemento.addEventListener('click', () => {
      const tipoSeleccionado = tipoInput.value;
      // Trim() me elemina los espacios al principio y final
      const id = elementIdInput.value.trim();

      limpiarMensajes();
      
      if (!validarId(id)) return;

      // Switch para crear el elemento según el tipo seleccionado
      
      let nuevoElemento;
      let labelElemento;

      switch (tipoSeleccionado) {
          case 'text':
          case 'password':
              nuevoElemento = document.createElement('input');
              nuevoElemento.type = tipoSeleccionado;
              nuevoElemento.id = id;
              break;

          case 'textarea':
              nuevoElemento = document.createElement('textarea');
              nuevoElemento.id = id;
              nuevoElemento.rows = 5;
              nuevoElemento.cols = 40;
              break;

          case 'image':
              const src = prompt('Introduce la ruta de la imagen (src):');
              nuevoElemento = document.createElement('img');
              nuevoElemento.id = id;
              nuevoElemento.src = src;
              break;

          case 'checkbox':
          case 'radio':
              const name = prompt('Introduce el nombre del elemento (name):');
              const value = prompt('Introduce el valor del elemento (value):');
              nuevoElemento = document.createElement('input');
              nuevoElemento.type = tipoSeleccionado;
              nuevoElemento.name = name;
              nuevoElemento.value = value;
              nuevoElemento.id = id;
              break;

          case 'button':
              const buttonText = prompt('Introduce el texto del botón (value):');
              nuevoElemento = document.createElement('button');
              nuevoElemento.id = id;
              nuevoElemento.type = 'submit';
              nuevoElemento.textContent = buttonText;
              break;

          default:
              mostrarError('Tipo de elemento no válido.');
              return;
      }

      // Crear y asociar un label para el nuevo elemento
      if (nuevoElemento) {
          labelElemento = document.createElement('label');
          labelElemento.htmlFor = id;
          labelElemento.textContent = `${id}:`;

          // Agregar al formulario
          formularioDinamico.appendChild(labelElemento);
          formularioDinamico.appendChild(nuevoElemento);
          // Registrar el ID como usado
          idsEnUso.add(id); 
          mostrarExito(`Elemento de tipo "${tipoSeleccionado}" con ID "${id}" añadido correctamente.`);
      }
  });

  // Funciones para validar y mostrar mensajes
  function validarId(id) {
      if (!id) {
          mostrarError('El ID no puede estar vacío.');
          return false;
      }
      if (idsEnUso.has(id)) {
          mostrarError('El ID ya está en uso. Por favor elige otro.');
          return false;
      }
      return true;
  }

  function mostrarError(mensaje) {
      mensajeError.textContent = mensaje;
  }

  function mostrarExito(mensaje) {
      mensajeExito.textContent = mensaje;
  }

  function limpiarMensajes() {
      mensajeError.textContent = '';
      mensajeExito.textContent = '';
  }
});
