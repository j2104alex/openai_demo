const { Configuration, OpenAIApi } = require("openai");
//require('dotenv').config();

/**se crea una instancia de la clase Configuration con la información necesaria para
 *  realizar la autenticación con la API de OpenAI. En este caso, se está utilizando
 *  la variable de entorno OPENAI_API_KEY, que se supone que debe contener
 *  la clave de la API de OpenAI.
 */
const configuration = new Configuration({
    /**La variable de entorno process.env es un objeto global que proporciona
     *  acceso a todas las variables de entorno definidas en el sistema operativo.
     *  En este caso, se busca la variable OPENAI_API_KEY y se utiliza como valor
     *  para la propiedad apiKey del objeto de configuración. */
    apiKey: process.env.OPENAI_API_KEY,
});
/**se crea una instancia de la clase OpenAIApi, pasándole la instancia de
 *  Configuration creada anteriormente como argumento. Esto configura la 
 * conexión con los servicios de OpenAI, permitiendo que la aplicación
 *  pueda hacer solicitudes a la API de OpenAI. */
const openai = new OpenAIApi(configuration);

/**MODELO:Un modelo en OpenAI es un programa de inteligencia artificial que ha
 *  sido entrenado con grandes cantidades de datos para aprender a realizar 
 * tareas específicas */

/** LISTAR MODELOS:
 * Enumera los modelos disponibles actualmente y proporciona información básica
 * sobre cada uno, como el propietario y la disponibilidad. */
async function listarModelos() {
    const response = await openai.listModels();
    console.log(response);
}
//listarModelos();

/**INFORMACION DE UN MODELO ESPECIFICO
 * Recupera una instancia modelo, proporcionando información básica sobre el modelo, 
 * como el propietario y los permisos. */
async function recuperarModelos() {
    const openai = new OpenAIApi(configuration);
    const response = await openai.retrieveModel("text-davinci-003");
    console.log(response);
}

recuperarModelos();

/**CREAR TEXTO:
 * Genera un texto dependiendo del contenido del cuerpo de la solicitud
 */
async function generarTexto() {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            /**es el texto inicial que se proporciona al modelo de lenguaje
             *  de OpenAI para generar el texto de salida. */
            prompt: "My name is Sofia, i'm 34 years old, i'm developer with 5 experience years please create a decription for a cv",
            /**limitar el número máximo de tokens (o palabras) que se 
             * generarán como respuesta. */
            max_tokens: 50,
            /**Valores más altos como 0.8 harán que la salida sea más aleatoria, mientras 
             * que valores más bajos como 0.2 la harán más enfocada */
            temperature: 0,
            /**Controla la creatividad y diversidad del texto generado */
            top_p: 1,
            /**es un número entero que indica la cantidad de respuestas 
             * únicas que se generarán. devuelve una lista con n elementos, cada uno de los
             *  cuales representa una respuesta generada por el modelo de lenguaje. */
            n: 1,
            /**se utiliza para habilitar la respuesta en tiempo real a medida que se 
             * va generando el texto */
            stream: false,
            /**e utiliza para obtener información adicional sobre las probabilidades de 
             * las palabras generadas por el modelo de lenguaje, sirve para evaluar la
             * calidad de la respuesta */
            logprobs: null,
            /**Se utiliza para indicar al modelo de lenguaje cuándo detener la generación
             * de texto
             */
            stop: "\n"
        });
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}
//generarTexto();
async function generarImagen() {
    try {
        const response = await openai.createImage({
            //Parametro
            prompt: "A cute baby sea otter",
            //Numer de respuestas
            n: 2,
            //Tamaño
            size: "1024x1024",
        });
        /**La URL de la imagen generada se guarda en la variable image_url
         * generada mediante la funcion createImage
         */
        const image_url = response.data;
        console.log(image_url);
    } catch (err) {
        console.log(err);
    }
}

//generarImagen();

/**
 * Generar imagenes
 */
async function audioATexto() {
    try {
        const resp = await openai.createTranscription(
            /**
             * fs= módulo fs de Node.js para crear un flujo de lectura de
             *  un archivo de audio llamado "audio.mp3". Este flujo de lectura
             *  se utiliza como entrada
             * 
             * reateReadStream= método del módulo fs (file system) de Node.js
             * que crea un stream de lectura de un archivo.
             * 
             * whisper-1= indica el modelo de lenguaje de OpenAI
            */
            fs.createReadStream("audio.mp3"),
            "whisper-1")
    } catch (err) {
        console.log(err)
    }
}
