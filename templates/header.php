<?php ob_start(); ?>
<template id="header">
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="light">
      <div class="container-fluid justify-content">
        <span class="navbar-brand text-light">
          <img src="./img/omrs-emailmanager-logo.png" alt="OMRS EmailManager Logo" width="45" height="45" class="me-1 d-inline-block align-text-top">
          Gestion des e-mail et aliases de <b><?php echo EMAIL_DOMAIN; ?></b>
        </span>
        <form class="d-flex" name="domain_name_change" id="domain_name_change" method="post" action="/emailmanager/">
          <div class="input-group">
            <span class="input-group-text">Sélectioner un domaine</span>
            <select id="domain_name_list" class="form-select" name="domainName">
            </select>
            <!--<button class="btn btn-light">Valider</button>-->
          </div>
        </form>
      </div>
    </nav>
</template>
<header class="mb-5"></header>
<?php 
  $content = ob_get_clean(); 
  echo $content;
?>