# 2. Requisits

## 2.1 Requisits funcionals

### Usuari no registrat

Pot:
* Visualitzar els posts de la wiki.
* Cercar eines pel seu nom.
* Accedir als detalls de cada post, mostrarà la informació completa d'aquest.
* Veure les valoracions del post.

### Usuari registrat

Pot:
* Registrar-se com a nou usuari.
* Iniciar sessió com a usuari existent.
* Valorar els posts ja existents.
* Modificar la valoració d’un post.
* Tot el que pot fer un usuari no registrat.

### Administrador

Pot:
* Crear nous posts.
* Editar posts existents.
* Eliminar posts.
* Gestionar tot el contingut de la pàgina.
* Tot el que pot fer un usuari registrat



## 2.2 Requisits no funcionals

### Seguretat

* Les contrasenyes dels usuaris es guardaran encriptades.
* El sistema implementarà control d’accés segons el rol de cada usuari.
* Es realitzaran validacions de dades per evitar atacs com SQL Injection.
* El sistema protegirà les rutes del backend.
* Es farà ús de control de versions amb Git.

### Rendiment

* El temps de resposta del sistema serà breu.
* El sistema optimitzarà les consultes a la base de dades.
* El projecte seguirà una estructura clara separant frontend i backend.
* L’arquitectura permetrà afegir noves funcionalitats en el futur (com comentaris o categories).
* Es fara documentacio de tot el projecte per facilitar la comprensió d'aquest.

### Accessibilitat

* Es garantirà un contrast adequat de colors llegible per tothom.
* La navegació dins de la pàgina serà accessible i fàcil.
* La interfície de la web serà clara i intuïtiva per a l’usuari.
* El disseny serà responsive, adaptant-se a dispositius mòbils i tauletes.
* Es farà ús de Bootstrap per una millor experiència visual.
