<?php ob_start(); ?>
<template id="password_inputs">
    <label>Nouveau mot de passe :</label><input class="w3-input w3-border" name="password" type="password" minlength="12" autocomplete="new-password"></input>
    <ul id="password_infos" style="display:none">
      <li id="password_requirements"></li>
      <li id="password_score"></li>
      <li id="password_warning"></li>
      <li id="password_suggestion"></li>
    </ul>
    <label>Confirmer le nouveau mot de passe :</label><input class="w3-input w3-border" type="password" disabled="true"></input>
    <p><button class="w3-button w3-border" form="email_password" name="send_email_password" disabled="true">Changer le mot de passe</button><span class="status_box"></span></p>
</template>
<?php echo ob_get_clean(); ?>