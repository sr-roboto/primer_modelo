# Analizador de Toxicidad

Una aplicación web que permite analizar textos para detectar contenido
potencialmente tóxico utilizando modelos de aprendizaje automático de
TensorFlow.

## 📋 Características

- Interfaz de usuario moderna y responsive
- Análisis en tiempo real de texto
- Detección de varios tipos de toxicidad (insultos, amenazas, lenguaje obsceno,
  etc.)
- Visualización clara de resultados con porcentajes de probabilidad
- Indicador visual de la gravedad del contenido tóxico

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Modelo ML**: TensorFlow.js, @tensorflow-models/toxicity
- **Herramientas**: Nodemon para desarrollo

## ⚙️ Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/sr-roboto/primer_modelo.git
   cd primer_modelo
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre tu navegador y visita `http://localhost:3000`

## 🚀 Uso

1. Ingresa un texto en el campo de entrada
2. Haz clic en el botón "Analizar" o presiona Enter
3. Espera mientras el modelo procesa el texto
4. Revisa los resultados del análisis:
   - Verde: No se detectó contenido tóxico
   - Amarillo: Contenido potencialmente tóxico (nivel medio)
   - Rojo: Contenido altamente tóxico

## 📁 Estructura del Proyecto

```
primer_modelo/
├── src/                  # Código fuente
│   ├── index.js          # Servidor Express
│   ├── public/           # Archivos estáticos
│   │   ├── index.html    # Página principal
│   │   ├── scripts/      # JavaScript del cliente
│   │   │   └── toxicity.js
│   │   └── styles/       # Hojas de estilo CSS
│   │       └── home.css
├── package.json          # Dependencias y scripts
└── README.md             # Documentación
```

## 📡 API

### Endpoints

- `GET /`: Página principal
- `POST /submit`: Analiza el texto para detectar toxicidad
  - Body: `{ "text": "texto a analizar" }`
  - Respuesta: Lista de tipos de toxicidad detectados o mensaje de no toxicidad

### Ejemplo de respuesta

```json
[
  {
    "label": "identity_attack",
    "results": [{ "match": true, "probabilities": [0.1, 0.9] }]
  },
  {
    "label": "insult",
    "results": [{ "match": true, "probabilities": [0.2, 0.8] }]
  }
]
```

## ✍️ Autor

**Marcos Lopez** - [sr-roboto](https://github.com/sr-roboto)

```

```
