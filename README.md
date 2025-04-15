# CRM C-POCKET(Node.js)

## 📌 Descripción
Este repositorio contiene el backend de Pockipayments, un sistema de gestión de relaciones con clientes (CRM) diseñado para facilitar la gestión de pagos 💸, clientes 👥 y transacciones 🔄. 



DOCUMENTACION SWAGGER
- http://localhost:3000/api-docs/#/

---

## 📂 Estructura del Proyecto

```
📦 Proyecto
│   ├── 📁 src
│   │   ├── 📁 config
│   │   ├── 📁 controllers
│   │   ├── 📁 interface
│   │   ├── 📁 lib
│   │   ├── 📁 middleware
│   │   ├── 📁 models
│   │   ├── 📁 routes
│   │   ├── 📁 schemas
│   │   ├── 📁 services
│   │   ├── 📁 types
│   │   ├── app.ts
│   │   ├── index.ts
│   ├── .env
│   ├── package.json
│   ├── .gitignore
│   ├── tsconfig.json
│
├── README.md
```

---

## 📦 Instalación y Configuración

### **Requisitos Previos:**

- Node.js v18+
- MySQL
- Git

### **Backend**

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/CapitalPocket/pockipayments.git
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno `.env`:
   ```env
   #DATABASE
   DB_NAME = "prueba"
   DB_USER = "prueba_user"
   DB_PASSWORD = "prueba_password"
   DB_HOST = "prueba host"
   DB_DIALECT = "mysql"

   #SERVER
   PORT = 3000
   TOKEN_SECRET ="c4p1t4lp0ck3t"
   TOKEN_POKI = "poki.com"
   BACKEND_URL = "http://localhost:3000"
   ```
4. Iniciar el servidor:
   ```bash
   npm run dev && npm run tsc || npm run dev
   ```


