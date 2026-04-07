# 2. Requisits

## 2.1 Requisits funcionals

### Usuari no registrat

Pot:
* Visualitzar els posts de la wiki.
* Cercar eines pel seu nom.
* Accedir als detalls de cada post, mostrarà la informació completa d'aquest.
* Visualitzar les valoracions del post.
* Visualitzar el comentaris dels usuaris registrats
* Registrar-se com a nou usuari.

### Usuari registrat

Pot:
* Tot el que pot fer un usuari no registrat.
* Iniciar sessió com a usuari existent.
* Valorar els posts ja existents.
* Comentar
* Modificar la seva valoració d’un post.

### Editor

Pot:
* Tot el que pot fer un usuari registrat.
* Crear nous posts.
* Editar posts existents.

### Administrador

Pot:
* Tot el que pot fer un usuari editor
* Eliminar posts.
* Gestionar tots els usuaris.
* Gestionar tot el contingut de la pàgina.


## 2.2 Requisits no funcionals

### Seguretat

* Les contrasenyes dels usuaris es guardaran encriptades. Farem servir bycript que esta incorporat al laravel
* El sistema implementarà control d’accés segons el rol de cada usuari (Els administradors tenen control total).
* Es realitzaran validacions de dades per evitar atacs com SQL Injection.
* El sistema protegirà les rutes del backend.
* Es farà ús del control de versions amb Git, així podrem disposar de copies de seguretat recuperables de tot el que s’hagi fet.

### Rendiment

* El temps de resposta del sistema serà breu.
* El projecte seguirà una estructura clara separant frontend i backend.
* L’arquitectura permetrà afegir noves funcionalitats en el futur (com comentaris o categories).
* Es fara documentacio de tot el projecte per facilitar la comprensió d'aquest.

### Accessibilitat

* Es garantirà un contrast adequat de colors llegible per tothom.
* La navegació dins de la pàgina serà accessible i fàcil d'entendre.
* La interfície de la web serà clara i intuïtiva per a l’usuari.
* El disseny serà responsive, adaptant-se a dispositius mòbils i tauletes.
* Es farà ús de Bootstrap per una millor experiència visual.
