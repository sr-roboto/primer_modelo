console.log('Toxicity.js loaded');

const fetchData = async (text) => {
  const response = await fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Algo salió mal durante el análisis');
  }
  return response.json();
};

const submitButton = document.getElementById('submit-button');
const textInput = document.getElementById('text-input');
const resultDiv = document.getElementById('result');

const handleSubmit = async () => {
  const text = textInput.value;
  if (!text) {
    resultDiv.innerHTML =
      '<div class="toxicity-result toxicity-warning">Por favor, ingresa un texto para analizar.</div>';
    return;
  }

  try {
    // Mostrar indicador de carga
    resultDiv.innerHTML =
      '<div style="text-align: center; padding: 20px;"><div class="loading"></div><p>Analizando texto...</p></div>';

    const data = await fetchData(text);
    console.log(data);

    // Formatear los resultados
    if (
      data.message &&
      data.message === 'No se ha detectado contenido tóxico'
    ) {
      resultDiv.innerHTML =
        '<div class="toxicity-result toxicity-safe"><strong>Resultado:</strong> No se ha detectado contenido tóxico</div>';
    } else {
      let resultsHTML = '<h3>Resultados del análisis:</h3>';

      data.forEach((item) => {
        const percentage = Math.round(item.results[0].probabilities[1] * 100);
        const severity =
          percentage > 80 ? 'toxicity-danger' : 'toxicity-warning';

        resultsHTML += `
          <div class="toxicity-result ${severity}">
            <span><strong>${item.label}:</strong></span>
            <span>${percentage}% de probabilidad</span>
          </div>
        `;
      });

      resultDiv.innerHTML = resultsHTML;
    }
  } catch (error) {
    resultDiv.innerHTML = `<div class="toxicity-result toxicity-danger">Error: ${error.message}</div>`;
  }
};

submitButton.addEventListener('click', handleSubmit);

textInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSubmit();
  }
});
