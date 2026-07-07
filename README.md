# POKENOVADEX

Aplicación móvil desarrollada con **React Native + Expo** que permite explorar información de Pokémon y registrar los datos de un entrenador mediante formularios validados.

---

## Descripción del Proyecto

**pokeNovaDex** es una aplicación tipo Pokédex que permite consultar información de Pokémon y gestionar el perfil de un entrenador Pokémon desde una interfaz sencilla y amigable.

La aplicación está organizada en **dos pestañas principales**:

## 🔍 Pokédex

En esta sección el usuario puede:

- Visualizar el listado de Pokémon obtenidos desde la PokéAPI.
- Navegar por los diferentes Pokémon disponibles.
- Consultar información detallada de cada Pokémon.
- Visualizar estadísticas, habilidades y tipos de Pokémon.

---

## 👨‍🏫 Entrenador

En esta sección el usuario puede registrar sus datos personales y preferencias mediante un formulario.

Los datos solicitados son:

- Nombre completo
- Edad
- Correo electrónico
- Distrito
- Tipo de Pokémon favorito

### ✅ Validaciones del formulario

El formulario cuenta con validaciones para garantizar la calidad de la información registrada:

- El nombre es obligatorio.
- La edad debe ser mayor a **10 años**.
- El correo electrónico debe tener un formato válido.
- Todos los campos requeridos deben ser completados.

Cuando alguna validación no se cumple, la aplicación muestra mensajes de error para orientar al usuario y permitir la corrección de los datos ingresados.

Una vez validada correctamente la información, los datos del entrenador son almacenados utilizando el estado global de la aplicación.

---

# 🎥 Video Demo

Puedes visualizar una demostración de la aplicación:

![Demo de la aplicación](docs/images/demogif.gif)

---

# 🛠️ Tecnologías Utilizadas

## Base del Proyecto

- React Native
- Expo
- TypeScript

## Navegación

- React Navigation
  - Native Stack Navigator
  - Bottom Tab Navigator

## Gestión de Estado

- Zustand

## Manejo de Formularios y Validaciones

- React Hook Form
- Yup

## Consumo de API

- Axios

## Gestión de Datos Remotos

- React Query (@tanstack/react-query)

## Estilos

- React Native StyleSheet

## Testing

- Jest
- React Native Testing Library

---

# 🏗️ Estructura del Proyecto

```text
src/
│
├── api/
├── components/
├── constants/
├── hooks/
├── navigation/
├── screens/
├── store/
├── theme/
├── types/
└── utils/
```

---

# ⚙️ Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js 24.x
- pnpm 11.x
- Expo CLI

Verificar versiones instaladas:

```bash
node -v
pnpm -v
```

---

# 🚀 Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd pokeNovaDex
```

Instalar dependencias:

```bash
pnpm install
```

---

# ▶️ Ejecución del Proyecto

Iniciar el servidor de desarrollo:

```bash
npx expo start
```

Ejecutar en Android:

```bash
npx expo start --android
```

---

# ✅ Tests Unitarios

Ejecutar todos los tests:

```bash
pnpm test
```

Ejecutar tests con cobertura:

```bash
pnpm test --coverage
```

Ejecutar un archivo específico:

```bash
pnpm test src/components/TextFieldInput.test.tsx
```

---

# 📊 Cobertura de Pruebas

A continuación se presentan los resultados de cobertura obtenidos mediante Jest.

## Resumen de Cobertura

./docs/images/coberturaPu.png

./docs/images/totalTest.png

### Métricas evaluadas

- Statements
- Branches
- Functions
- Lines

Estas métricas permiten medir la calidad y cobertura de las pruebas implementadas en el proyecto.

---

# ✨ Funcionalidades Implementadas

- Consulta de Pokémon desde PokéAPI.
- Navegación mediante Stack Navigation y Bottom Tabs.
- Visualización del detalle de cada Pokémon.
- Registro de entrenador Pokémon.
- Validaciones de formularios.
- Persistencia de estado utilizando Zustand.
- Gestión de cache y peticiones mediante React Query.
- Arquitectura modular y escalable.
- Tipado estricto con TypeScript.
- Cobertura de pruebas unitarias con Jest.

---

# 👩‍💻 Autor

**Stefani Martinez**
