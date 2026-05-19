# Manual de desplegament — ForjaWiki

## Introducció

Aquest document explica com desplegar l’aplicació **Forja Wiki** utilitzant Docker.

El projecte està compost per:
- Frontend en React
- Backend en Laravel
- Base de dades MariaDB
- phpMyAdmin per gestió de la base de dades

---

# Índex

1. Requisits previs  
2. Estructura del projecte  
3. Configuració de ports  
4. Desplegament amb Docker  
5. Configuració del backend (Laravel)  
6. Base de dades
7. Accés a l’aplicació  
8. Reinici del sistema  
9. Problemes habituals  

---

# 1. Requisits previs

Abans de començar assegura’t de tenir instal·lat:

- Docker
- Docker Compose

Comprova-ho amb:

```
docker --version
docker compose --version
```

---

# 2. Estructura del projecte

El projecte ha d’estar organitzat així:

backend/forja-wiki-backend  
frontend/forja-wiki-frontend  
docker-compose.yml  

---

# 3. Configuració de ports

- Frontend: 3000
- Backend: 8080
- MariaDB: 3306
- phpMyAdmin: 8081

---

# 4. Desplegament amb Docker

Executa el següent comandament des de l’arrel del projecte:

```
docker compose up --build
```

---

# 5. Configuració del backend (Laravel)

Un cop els contenidors estan en marxa:

```
docker exec -it forjawiki_backend bash
```

Dins del bash del contenidor:

```
composer install
php artisan key:generate
php artisan storage:link
php artisan migrate:fresh --seed
```

Perque funcioni la base de dades:

```
cp .env.example .env
```

El .env ha de quedar així:

```
DB_CONNECTION=mysql
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=forja_wiki
DB_USERNAME=forjawiki
DB_PASSWORD=root
```

---

# 6. Base de dades

La base de dades es crea en el propi Docker, si no es crees s'ha de crear d'aquesta forma:

```
docker exec -it forjawiki_mariadb mysql -u root -p

PASSWORD: root

CREATE DATABASE forja_wiki; 

SHOW DATABASES;
```

---

# 7. Accés a l’aplicació

Al iniciar el Docker es pot accedir a cada servei:  

- Frontend → http://localhost:3000
- Backend → http://localhost:8080
- phpMyAdmin → http://localhost:8081

Si s'accedeix des del servidor, canviar localhost per 172.20.2.204

---

# 8. Reinici del sistema  

Per reiniciar completament el projecte si hi ha algun problema:

```
docker compose down -v
docker compose up --build
```

---

# 9.  Problemes habituals  

Port ocupat o en ús:

- Canviar el port corresponent al docker-compose.yml.

Error de connexió a la base de dades:

- Comprovar: DB_HOST=mariadb

Frontend no carrega:

- Revisar package.json i les dependències instal·lades.

Error de PHP version:

- El projecte requereix PHP 8.3 o superior.

Error de permisos Laravel:

- Executar dins del contenidor backend: chmod -R 777 storage bootstrap/cache

Error de migracions:

- Si la base de dades està corrupta o incompleta: php artisan migrate:fresh --seed