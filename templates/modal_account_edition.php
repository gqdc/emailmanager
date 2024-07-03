<?php ob_start(); ?>
<template id="account_informations_modal">
  <div class="w3-modal" style="display: none;">
    <div class="w3-modal-content w3-card-4">
      <header class="w3-container w3-orange"> 
        <h2></h2>
      </header>
      <div class="w3-container">
        <div class="w3-container">
          <h3>Rediriger</h3>
          <form class="w3-container" id="email_redirect">
            <p>Rediriger les e-mails de ce compte ?
            <input type="radio" id="email_redirect_true" name="email_redirect" value="true" autocomplete="off" /> <label for="email_redirect_true">Oui</label>
            <input type="radio" id="email_redirect_false" name="email_redirect" value="false" autocomplete="off" /> <label for="email_redirect_false">Non</label></p>
            <div id="redirect_target_list">
              <label>Rediriger les e-mails vers :</label><select class="w3-select w3-border" name="redirectTarget" form="email_redirect" autocomplete="off"></select>
            </div>
            <p><button class="w3-button w3-border" form="email_redirect" name="send_email_redirect" disabled="true">Confirmer</button><span class="status_box"></span></p>
          </form>
        </div>
        <div class="w3-container">
          <form class="w3-container" id="email_password">
            <fieldset name="security">
              <h3>Sécurité</h3>
            </fieldset>
          </form>
        </div>
      </div>
      <footer class="w3-container w3-white"></footer>
    </div>
  </div>
</template>
<?php require('password_inputs.php'); ?>
<?php echo ob_get_clean(); ?>