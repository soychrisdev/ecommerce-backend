### Instroduccion:

Este proyecto cuenta con autenticacion para registar y loguear los usuarios, una vez que estos esten logueados se puede comenzar a utilizar los endpoints correspondientes.

### Instrucciones

1. Instalar dependencias
2. Levantar base de datos utilizando docker.
3. Crear usuario base de datos segun las siguientes instrucciones:
   ```
   mongosh "mongodb://root:admin@localhost:27017/admin"
   ```
   ```
   use ventistore
   ```
   Aqui utilizar contraseña previamente definida en nuestro archivo env o en nuestro config. RUTA: /SRC/CONFIG/INDEX.TS

   ![image](https://github.com/user-attachments/assets/d14cc171-fad9-480f-9139-41ae91ceed88)

   ```
   db.createUser( { user: "ventistore", pwd: passwordPrompt(), roles: [{ role: "readWrite", db: "ventistore" }] } )
   ```
5. Ejecutar npm run dev o npm run devfix en caso de que existan conflictos con Node.
6. Utilizar el archivo postman para utilizar los endpoints por el lado del servidor.

### ¿Que falta?
0. TEST TEST TEST UNITARIOS, INTEGRACION Y E2E. 
1. Swagger
2. Logger
3. Redis cache control para los tokens
4. Checkouts y pagos
5. Mejoras en terminos de patrones de diseño (SOLID)
6. Manejar productos
