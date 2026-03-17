<?php ob_start(); ?>
<template id="username_input"> 
  <div class="input-group">
    <input type="text" id="username" name="username" class="form-control" autocomplete="new-password" pattern="^[\w]{1}[\w.\-_+]{1,30}[\w]$" required="true" placeholder="Adresse e-mail"></input>
    <span class="input-group-text"><?php echo '@' . EMAIL_DOMAIN; ?></span>
  </div>
  <div class="form-text text-info-emphasis" id="username-requirements">
    <div id="username-requirements-lenght" class="text-info-emphasis"><i class="bi bi-info-circle"></i> 3 caractères minimum.</div>
    <div id="username-requirements-special-chars" class="text-danger visually-hidden"><i class="bi bi-info-circle"></i> Caractères spéciaux autorisés : <b class="text-black">. - _ +</b></div>
    <div id="username-requirements-available" class="text-success visually-hidden"><i class="bi bi-check-circle"></i> Ce nom est disponible.</div>
  </div>
</template>
<?php echo ob_get_clean(); ?>