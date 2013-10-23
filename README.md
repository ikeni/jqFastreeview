jqFastreeview
=============

### Informations ###
Version 1.0.
Ce plugin a pour vocations à mettre en place rapidement et simplement une arborescence à partir d'une suite de balise ```<ul>``` et ```<li>```.

Crée à partir de jQuery 1.9.1.

Propriété      | Type        | Valeur par Défaut | Description
:--------------|:------------|:-----------------|:------------
 cssClass      | String      |fastreeview        | Nom de la classe CSS ajouté.    
 initialShow   | Boolean     |false              | ``false`` : L'arbre est présenté completement replié. <br/> ``true`` : L'arbre est présenté completement déplié.
 openId        | Array      |null        | Tableau d'identifiant des elements ```<li>``` à présenter déplier.
 ajaxUrl      | String      |null        | Url utilisé pour l'appel AJAX.
 ajaxDataType      | String      |null        | Type de donnée en retour <br/> ``html`` : Retourne un contenu html.<br/> ``json`` : Retourne un contenu json
 ajaxSuccess      | function      |null        | Fonction a exécuter une fois l'appel en succès.
 ajaxError      | function      |null        | Fonction a exécuter une fois l'appel en erreur.
 debug      | Boolean      |false        | Active le mode debug pour voir le temps de traitement du plugin dans la console. 
 


### Utilisations ###
```$('#treeview').fastreeview(); ```

### Dépendance ###
- [x] jQuery 1.9.1


## English ##
Version 1.0.
Jquery plugin for make a fast and simple treeview with ```<ul>``` and ```<li>```.


Property      | Type        | Default value | Description
:--------------|:------------|:-----------------|:------------
 cssClass      | String      |fastreeview        | Name of the CSS class.
 initialShow   | Boolean     |false              | ``false`` : The tree is totaly close. <br/> ``true`` : The tree is totaly oepn.
 openId        | Array      |null        | Array of id  ```<li>``` to open at start.
 ajaxUrl      | String      |null        | Url to use for AJAX.
 ajaxDataType      | String      |null        | Data type return by the request <br/> ``html`` : For a html return .<br/> ``json`` : For a json return 
 ajaxSuccess      | function      |null        | Function to execute in case of success.
 ajaxError      | function      |null        | Function to execute in case of error.
 debug      | Boolean      |false        | Active the debug mode.  
 


### Dependency ###
- [x] jQuery 1.9.1



