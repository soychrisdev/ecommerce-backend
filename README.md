1. Instalar dependencias
2. Levantar base de datos utilizando docker.
3. Crear usuario base de datos segun las siguientes instrucciones:
   ```
   mongosh "mongodb://root:admin@localhost:27017/admin"
   ```
   ```
   use ventistore
   ```
   ```
   db.createUser( { user: "ventistore", pwd: passwordPrompt(), roles: [{ role: "readWrite", db: "ventistore" }] } )
   ```
5. Ejecutar npm run dev o npm run devfix en caso de que existan conflictos con Node.
