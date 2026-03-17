<?php ob_start(); ?>
<template id="alias_creation_modal">
  <div id="modalAliasCreation" class="modal fade" tabindex="-1" aria-labelledby="modalAliasCreation" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-secondary-subtle">
          <h2 class="modal-title overflow-auto">Ajouter un alias</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="" id="aliasCreation">
          <fieldset name="identity">
            <h3>Identification</h3>
          </fieldset>
          <fieldset name="aliases">
            <h3>Redirection</h3>
          </fieldset>
          </form>
        </div>
        <div class="modal-footer justify-content-start">
          <button class="btn btn-primary" type="button" form="aliasCreation" name="send_alias_creation" disabled="true">
            <span role="status">Créer l'alias</span>
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
<?php require('username_input.php'); ?>
<?php require('aliases_input.php'); ?>
<?php echo ob_get_clean(); ?>