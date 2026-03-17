<?php ob_start(); ?>
<template id="deletion_input">
  <div class="mb-2">
    <label>Voulez-vous supprimer _ITEM_ ?</label>
    <input type="radio" id="email_delete_true" name="email_delete" value="true" autocomplete="off" /> <label for="email_delete_true">Oui</label>
    <input type="radio" id="email_delete_false" name="email_delete" value="false" autocomplete="off" checked /> <label for="email_delete_false">Non</label>
  </div>
</template>
<?php echo ob_get_clean(); ?>