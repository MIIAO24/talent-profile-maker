// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: 'https://3ndh5bfc18.execute-api.us-east-1.amazonaws.com/prod',
  ENDPOINTS: {
    GENERATE_CV: '/generate-cv'
  }
};

export const generateCV = async (cvData: any) => {
  try {
    console.log('Enviando datos a AWS:', cvData);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE_CV}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(cvData)
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Resultado de AWS:', result);
    return result;
  } catch (error) {
    console.error('Error generating CV:', error);
    throw error;
  }
};