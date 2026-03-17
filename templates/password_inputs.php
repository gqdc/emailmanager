<?php ob_start(); ?>
<template id="password_inputs">
  <fieldset>
    <div class="form-floating">
      <input class="form-control" name="password" type="password" minlength="12" autocomplete="new-password" placeholder="Nouveau mot de passe"></input>
      <label for="password">Nouveau mot de passe</label>
    </div>
    <div class="form-text text-info-emphasis" id="password_infos">
      <span id="password-requirements-length"><i class="bi bi-info-circle"></i> 12 caractères minimum.</span>
      <span id="password-requirements-score"><i class=""></i> <span></span></span>
      <!-- <span id="password-requirements-warning"><i class=""></i> <span></span></span> -->
    </div>
  <div class="form-floating mt-2">
    <input class="form-control" type="password" name="password-confirmation" disabled="true" placeholder="Confirmer le nouveau mot de passe"></input>
    <label for="password-confirmation">Confirmer le nouveau mot de passe</label>
  </div>
    <span id="password-confirmation-infos"><i class=""></i> </span>
    <p><button class="btn btn-primary" form="email_password" name="send_email_password" disabled="true">Changer le mot de passe</button><span class="status_box"></span></p>
  </fieldset>
</template>
<?php echo ob_get_clean(); ?>