# Prompts utilizados para la creación de la página

### Modelo de IA: Claude

## Primer Prompt

Tengo un proyecto de react con npm vite creado en mi visual studio. Necesito construir una interfaz funcional que presente un teclado numérico en pantalla, 
permitiendo al usuario realizar operaciones aritméticas básicas entre dos números.

La aplicación debe ser capaz de procesar las siguientes operaciones:

* Suma (+)
* Resta (-)
* Multiplicación (*)
* División (/)
  
  Además, necesito que cumpla con los siguientes requisitos técnicos:
  
* Componentización: El teclado y la pantalla de visualización deben estar organizados de forma lógica mediante componentes de React.
* Manejo de Estado: Utilizar hooks (`useState`) para gestionar la entrada de números y el resultado de las operaciones.
* Interactividad: No se permite el uso del teclado físico para ingresar números; toda la interacción debe ocurrir a través de los clics en el teclado numérico de la interfaz.
* Validaciones: El sistema debe manejar casos especiales, como la división por cero.

Para usar de forma efectiva el framework de react en este caso, divide la pantalla (lugar donde se muestran los numeros y el resultado) 
y el teclado (lugar donde el usuario digita los números mediante clicks a los botones, ademas de las operaciones)
en sus respectivos componentes, osea 2, componente pantalla y componente teclado.  

A partir de este prompt me generó los archivos Display.jsx, Keyboard.jsx y App.jsx, además del archivo de estilos para la página.


## Segundo prompt

Del anterior código generado, ¿se usan de forma efectiva los 'hooks' 
(useState) para manejar los estados (entrada de números y  resultado de las operaciones)?, si no es el caso, 
reescribe el código para usarlos de forma efectiva.

A partir de este prompt, corrigió los archivos App.jsx y Display.jsx para aplicar un único useState con un objeto de estado, pues antes se usaban 5 useState 
separados, lo que podía causar renderizaciones innecesarias para la página.

