<?php ob_start(); ?>
<template id="account_creation_modal">
  <div class="w3-modal" style="display: none;">
    <div class="w3-modal-content w3-card-4">
      <header class="w3-container w3-orange">
        <h2></h2>
      </header>
      <div class="w3-container">
        <div class="w3-container">
          <form class="w3-container" id="email_creation">
          <fieldset name="identity">
            <h3>Identification</h3>
            <label for="username">Nom d'utilisateur</label><input class="w3-input w3-border" id="username" name="username" type="text" autocomplete="new-password" pattern="^[\w\d]{1}[\w\d\-.]{4,32}[\w\d]$" required="true"></input>
                <ul id="username_infos" style="display:none">
                  <li id="username_requirements"></li>
                  <li id="username_warning"></li>
                  <li id="username_score"></li>
                </ul>
          </fieldset>
          <fieldset name="security">
            <h3>Sécurité</h3>
          </fieldset>
          <!--<h3>Paramètres facultatifs</h3>
            <label for="quota">Quota</label><input class="w3-input w3-border" type="range" id="quota" name="quota" min="0" max="100"/>-->
            <p><button class="w3-button w3-border" form="email_creation" name="send_email_creation" disabled="true">Créer le compte</button><span class="status_box"></span></p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<?php require('password_inputs.php'); ?>
<?php echo ob_get_clean(); ?>