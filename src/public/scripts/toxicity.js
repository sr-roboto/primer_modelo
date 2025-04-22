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
    throw new Error('algo salió mal');
  }
  return response.json();
};

const submitButton = document.getElementById('submit-button');
const textInput = document.getElementById('text-input');
const resultDiv = document.getElementById('result');

const handleSubmit = async () => {
  const text = textInput.value;
  if (!text) {
    resultDiv.innerHTML = 'Por favor, ingresa un texto.';
    return;
  }

  try {
    const data = await fetchData(text);
    console.log(data);
    resultDiv.innerHTML = JSON.stringify(data, null, 2);
  } catch (error) {
    resultDiv.innerHTML = 'Error: ' + error.message;
  }
};

submitButton.addEventListener('click', handleSubmit);

textInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSubmit();
  }
});
