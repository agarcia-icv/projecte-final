# Pasos per executar la api

**Instalar dependencies:**  
``composer install``

**Crear .env:**  
``cp .env.example .env``

**Dins del .env:**  
DB_DATABASE=forja_wiki  
DB_USERNAME=root (usuari del SQL)  
DB_PASSWORD=P@ssw0rd (contrasenya del usuari de SQL)  
DB_PORT=3307 (port de mariaDB)  

**Crear fitxer .sql i executar:**  
``CREATE DATABASE forja_wiki;``

**Generar key de Laravel:**  
``php artisan key:generate``

**Executar migracions:**  
``php artisan migrate``

**Iniciar api:**  
``php artisan serve``
