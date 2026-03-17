<?php ob_start(); ?>
<template id="accounts_list">
  <header class="bg-primary-subtle">
    <nav class="navbar">
      <div class="container-fluid">
        <h2 class="navbar-brand">Adresses e-mail</h2>
        <button type="button" id="create_email_account" class="btn btn-success">Ajouter un compte</button>
      </div>
    </nav>
  </header>
  <table class="table table-hover border">
    <thead>
      <tr>
        <th>Adresse</th><th>Redirection</th><th>Quota</th><th>Options</th>
      </tr>
    </thead>
    <tbody class="">
    </tbody>
  </table>
</template>

<section id="accounts" class="mb-5">
</section>
<?php
require('modal_account_creation.php');
require('modal_account_edition.php');
require('modal_account_deletion.php');
?>

<?php
  $content = ob_get_clean(); 
  echo $content;
?>

<?php //require('layout.php'); ?>