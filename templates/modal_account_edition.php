<?php ob_start();?>
<template id="account_edition_modal">
  <div id="modalEmailEdition" class="modal fade" tabindex="-1" aria-labelledby="modalEmailEdition" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-secondary-subtle">
          <h2 class="modal-title overflow-auto">Éditer un compte</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="" id="emailEdition">
            <fieldset name="security"><legend>Mot de passe</legend></fieldset>
            <hr>
            <fieldset name="aliases"><legend>Redirection(s)</legend></fieldset>
          </form>
        </div>
        <div class="modal-footer justify-content-start">
          <button class="btn btn-primary" type="button" form="emailEdition" name="send_email_edition" disabled="true">
            <span role="status">Éditer le compte</span>
          </button>
          <div class="alert border-0 p-2 my-0">
            <span class="status-icon" aria-hidden="true"></span>
            <span class="status-text" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<?php require('aliases_input.php'); ?>
<?php require('password_inputs.php'); ?>
<?php echo ob_get_clean(); ?>