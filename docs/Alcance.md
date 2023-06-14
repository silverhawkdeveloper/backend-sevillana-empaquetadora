## Introducción
La aplicación nos indicará la caja mas optima, de las que tengamos siempre registradas para empaquetar los productos de un pedido.
Habrá dos tipos de usuario:

    •Admin: podrá registrar las cajas, los productos y dar de alta un empleado.

    •Empleado: su acción será registrar un pedido. Para registrar una caja es necesario dar una descripción, el alto, el ancho y el profundo en cm. El proceso de registro de un producto dependerá de la figura geométrica que represente, son las siguientes:

        •Ortoedro: descripción, alto, ancho y profundo.
        •Cubo: descripción y arista.
        •Cilindro: descripción, arista y circunferencia.
        •Esfera: descripción y circunferencia.

## Alcance del proyectos
Con mi aplicación pretendo cubrir la necesidad que puede tener una empresa que cuenta con un departamento de logística, respecto a la mejor elección del empaquetado de sus productos.

El almacenamiento de los productos y su empaquetado suponen un coste para las empresas, si conseguimos reducir en la medida de lo posible al mínimo ambos, también reduciremos el coste.

## Requisitos funcionales del proyecto:
I. Permitir logearnos con email y contraseña, indicar si el usuario existe y si la contraseña es correcta.

II. Menú de navegación con amplios botones para facilitar el trabajo con guantes y desde un almacén.

III. Apartado empleados, mostrar todos los empleados.

    I. Modificar empleado, donde veremos sus datos y podremos hacer la modificación o eliminar el empleado.

    II. Nuevo empleado.

    III. Graficas empleados, una con el número total de pedidos por empleados, y otra con los pedidos mensuales por empleado.

IV. Apartado cajas, mostrar todas las cajas.
    I. Modificar caja, donde veremos sus datos y podremos hacer la modificación o eliminar la caja.

    II. Nueva caja, fácil descripción para las medidas de la misma.

    III. Graficas cajas, una con el número total de cajas utilizadas, y otra con la merma mensual por cada tipo de caja.

V. Apartado productos, mostrar todos los productos.

    I. Modificar producto, donde veremos sus datos y podremos hacer la modificación o eliminar el producto.

    II. Nuevo producto, primero escoger el tipo de figura geométrica que representa el producto que deseamos registrar, tras ello mostrar de forma intuitiva las medidas necesarias acorde a cada tipo de figura para registrar el producto.

    III. Graficas producto, una con el número total de cada producto que se han empaquetado mensualmente.

VI. Apartado pedidos, mostrar todos los pedidos y poder ordenar las
columnas.

    I. Modificar pedidos, donde veremos sus datos y podremos hacer la modificación o eliminar el pedido, para producto, caja y realizado solo aparecerán las opciones disponibles de nuestra BBDD.

    II. Nuevo pedido.
    
    III. Graficas pedidos, una con el número total de pedidos empaquetado por mes.