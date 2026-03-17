<?php ob_start(); ?>
<template id="alias_input">
  <div class="mb-2">
    <label>Rediriger les e-mails de ce compte ?</label>
    <input type="radio" id="email_redirect_true" name="email_redirect" value="true" autocomplete="off" /> <label for="email_redirect_true">Oui</label>
    <input type="radio" id="email_redirect_false" name="email_redirect" value="false" autocomplete="off" checked /> <label for="email_redirect_false">Non</label>
  </div>
  <fieldset class="mb-2">
  <div class="form-floating">
    <input type="text" class="form-control" id="aliases" name="aliases" autocomplete="off" pattern="([a-zA-Z0-9._+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,},?)+" placeholder="name@example.com" required="true">
    <label for="aliases">Cible(s) de redirection (0/10)</label>
  </div>
    <div class="form-text text-info-emphasis">
      <div id="targets-requirements-format" class="text-info-emphasis"><i class="bi bi-info-circle"></i> Ajoutez plusieurs cibles en les séparant par une virgule.</div>
    </div>
    <div class="form-text text-info-emphasis">
      <div id="targets-list" class="row row-cols-2 text-success"></div>
    </div>
  </fieldset>
</template>
<?php echo ob_get_clean(); ?>