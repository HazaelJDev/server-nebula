//Configuración de variables de entorno en el servidor
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}