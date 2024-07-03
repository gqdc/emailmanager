<?php ob_start(); ?>
<template id="account_deletion_modal">
  <div class="w3-modal" style="display: none;">
    <div class="w3-modal-content w3-card-4">
      <header class="w3-container w3-orange">
        <h2></h2>
      </header>
      <div class="w3-container">
        <div class="w3-container">
          <form class="w3-container" id="email_deletion">
            <h3><!-- Voulez-vous supprimer le compte ... --></h3>
            <label for="email_delete_true">Oui </label><input type="radio" id="email_delete_true" name="email_delete" value="true" autocomplete="off" />
            <label for="email_delete_false">Non </label><input type="radio" id="email_delete_false" name="email_delete" value="false" autocomplete="off" checked="true"/>
            <p><button class="w3-button w3-border" form="email_deletion" name="send_email_deletion" disabled="true">Supprimer le compte</button><span class="status_box"></span></p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<?php echo ob_get_clean(); ?>