<?php ob_start(); ?>
<template id="alias_deletion_modal">
  <div id="modalAliasDeletion" class="modal fade" tabindex="-1" aria-labelledby="modalAliasDeletion" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-secondary-subtle">
          <h2 class="modal-title overflow-auto">Supprimer un alias</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="" id="aliasDeletion">
            <fieldset name="deletion"><legend>Suppression</legend></fieldset>
          </form>
        </div>
        <div class="modal-footer justify-content-start">
          <button class="btn btn-primary" form="aliasDeletion" name="send_alias_deletion" disabled="true">
            <span role="status">Supprimer l'alias</span>
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
<?php require('deletion_inputs.php'); ?>
<?php echo ob_get_clean(); ?>