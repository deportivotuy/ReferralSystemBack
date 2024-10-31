const translate = require('@vitalets/google-translate-api'); // Asegúrate de que esta línea esté correcta

async function translateText(text) {
    console.log(text)
    try {
        const res = await translate(text, { from: 'es', to: 'en' });
        return res.text; // Devuelve el texto traducido
    } catch (error) {
        console.error('Error en la traducción:', error);
        throw error; // Propaga el error si ocurre
    }
}

// Exporta la función para que pueda ser utilizada en otros archivos
module.exports = {
    translateText
};
