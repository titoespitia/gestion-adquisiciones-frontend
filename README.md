#  Sistema de Gestión de Adquisiciones - Frontend

Este proyecto es el **frontend** de nuestra aplicación, desarrollada con **Angular 19 y NgRx** para una gestión eficiente del estado global.

**¿Qué te ofrece este frontend?**

*   **Gestión de adquisiciones:** Crea, edita y desactiva adquisiciones de forma sencilla.
*   **Historial de modificaciones:** Controla y visualiza el historial de cada cambio realizado.
*   **Integración con API REST:**  Persistencia de datos garantizada gracias a la conexión con nuestra API.
*   **Interfaz de usuario moderna:**  Disfruta de una experiencia intuitiva con Angular Material.
*   **Manejo de estado con NgRx:**  Una gestión del estado global robusta y eficiente.

**Instalación y configuración**

Antes de empezar, asegúrate de tener instalado:

*   **Node.js** (versión LTS recomendada)
*   **Angular CLI** (Ejecuta: `npm install -g @angular/cli`)

Luego, sigue estos pasos:

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/titoespitia/gestion-adquisiciones-frontend.git
    cd gestion-adquisiciones-frontend
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Ejecuta el proyecto:**

    ```bash
    ng serve
    ```

    La aplicación estará disponible en `http://localhost:4200/`.

**Estructura del proyecto**

*   `src/`
    *   `app/`
        *   `core/`: Servicios y lógica central.
        *   `features/`: Módulos de cada funcionalidad.
        *   `pages/`: Componentes de páginas principales.
        *   `shared/`: Componentes reutilizables.
        *   `app.component.ts`: Componente raíz.
        *   `app.routes.ts`: Configuración de rutas.
        *   `app.module.ts`: Módulo principal.
    *   `assets/`: Imágenes y recursos estáticos.
    *   `environments/`: Configuración de entornos.
    *   `styles.scss`: Estilos globales.
    *   `index.html`: Entrada principal del frontend.
*   `angular.json`: Configuración del proyecto Angular.
*   `package.json`: Dependencias y scripts.
*   `README.txt`: Documentación del proyecto.

**Funcionalidades implementadas**

*   **Adquisiciones:** Crear, editar y desactivar adquisiciones, listado con filtros y paginación.
*   **Historial de cambios:** Registro detallado de cada modificación en las adquisiciones.
*   **Formulario de adquisiciones:** Validaciones en campos y cálculo automático del valor total.
*   **Gestión del estado con NgRx:** Acciones, efectos, reducers y selectores para un manejo eficiente del estado.

**Estilos y diseño**

*   **Angular Material:**  Estilos y componentes UI de alta calidad.
*   **Diseño responsivo:** Adaptable a cualquier dispositivo gracias a Flexbox y CSS Grid.
*   **Paleta de colores:**
    *   Activo: `#004aad`
    *   Desactivado: `#b0c4de` (gris)
*   **Botones deshabilitados:** Claramente identificables con menor opacidad.

**Flujo de desarrollo**

1.  **Crear adquisición:**  Formulario intuitivo con validaciones y envío de datos al backend.
2.  **Editar adquisición:** Carga de datos existentes y actualización con validaciones.
3.  **Desactivar adquisición:**  Actualización del estado sin eliminar el registro.
4.  **Historial de cambios:**  Visualización de modificaciones con fecha y usuario.

**Comandos útiles**

*   **Desarrollo:** `npm start`
