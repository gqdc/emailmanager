<?php ob_start(); ?>
<template id="accounts_list">
  <header>
    <div class="w3-row">
      <div class="w3-col s9"><h2></h2></div>
      <div class="w3-col s3"><button id="create_email_account" class='w3-button w3-green' style="margin-top:10px; margin-bottom:10px">Ajouter un compte</button></div>
    </div>
  </header>
    <table>
      <tr class='w3-orange'>
        <th>Adresse e-mail</th><th>Redirection</th><th>Quota</th><th class="w3-center">Options</th>
      </tr>
    </table>
</template>

<section id="accounts">
</section>
<?php

require('modal_account_creation.php');
require('modal_account_deletion.php');
require('modal_account_edition.php');

$content = ob_get_clean(); ?>

<?php require('layout.php'); ?>