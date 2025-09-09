# Sistema de Autenticación con Node.js

Un sistema de autenticación simple construido con Express.js que permite registro, login y gestión de sesiones usando JWT y cookies.

## Características

- ✅ Registro de usuarios con contraseñas hasheadas (bcrypt)
- ✅ Autenticación con JWT tokens
- ✅ Sesiones seguras con cookies HttpOnly
- ✅ Rutas protegidas
- ✅ Base de datos local con archivos JSON
- ✅ Interfaz web con formularios de login/registro

## Tecnologías

- **Backend**: Node.js, Express.js
- **Autenticación**: JWT, bcrypt
- **Base de datos**: db-local (JSON files)
- **Frontend**: EJS templates, Vanilla JavaScript
- **Seguridad**: cookie-parser, validaciones

## Instalación

```bash
# Clonar repositorio
git clone <tu-repo>
cd autenticacion-users

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## Uso

1. **Accede a** `http://localhost:3000`
2. **Registra** un nuevo usuario o usa las credenciales existentes
3. **Inicia sesión** para acceder al contenido protegido
4. **Cierra sesión** cuando termines

### Usuarios de prueba
- `admin123` / `admin123`
- `everth` / `everth123`
- `giraldo` / `giraldo123`

## Estructura del proyecto

```
├── db/User.json          # Base de datos de usuarios
├── views/               # Templates EJS
│   ├── index.ejs       # Página principal (login/registro)
│   └── protected.ejs   # Página protegida
├── config.js           # Configuración (puerto, JWT secret)
├── user.repository.js  # Lógica de usuarios
└── index.js           # Servidor principal
```

## API Endpoints

- `GET /` - Página principal
- `POST /login` - Iniciar sesión
- `POST /register` - Registrar usuario
- `POST /logout` - Cerrar sesión
- `GET /protected` - Contenido protegido

## Configuración

Puedes modificar las variables de entorno en `config.js`:

```javascript
PORT = 3000              // Puerto del servidor
SALT_ROUNDS = 10        // Rounds para bcrypt
SECRET_JWT_KEY = "..."  // Clave secreta JWT
```

## Seguridad

- Contraseñas hasheadas con bcrypt
- JWT tokens con expiración (1 hora)
- Cookies HttpOnly, Secure y SameSite
- Validaciones de entrada
- Rutas protegidas con middleware

## Desarrollo

## Desarrollo

```bash
npm run dev    # Servidor con auto-restart
npm run lint   # Linter con Standard JS
```

## Notas para el Futuro

### Mejoras Pendientes
- [ ] Rate limiting para login attempts
- [ ] Refresh tokens para sesiones más largas
- [ ] Validación de email en registro
- [ ] Hash del JWT secret en producción
- [ ] Migración a base de datos real (MongoDB/PostgreSQL)
- [ ] Tests unitarios y de integración
- [ ] Logs de seguridad y auditoría

### Bugs Conocidos
- **user.repository.js línea 47-48**: Validaciones de longitud usan `<` en lugar de `.length <`
- **index.ejs**: Typo en `id="resgister-confirm-password"` (falta 'i')
- **index.js**: `cookeParser` debería ser `cookieParser`
