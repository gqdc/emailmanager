<?php ob_start(); ?>
<template id="aliases_list">
  <header class="bg-primary-subtle">
    <nav class="navbar">
      <div class="container-fluid">
        <h2 class="navbar-brand">Aliases et redirections</h2>
        <button id="create_email_alias" class="btn btn-success">Ajouter un alias</button>
      </div>
    </nav>
  </header>
    <table class="table table-hover border">
      <thead>
        <tr>
          <th>Alias</th><th>Cible(s)</th><th>Options</th>
        </tr>
      </thead>
      <tbody class="">
      </tbody>
    </table>
</template>

<section id="aliases">
</section>
<?php
require('modal_alias_creation.php');
require('modal_alias_deletion.php');
require('modal_alias_edition.php');
?>
<?php 
$content = ob_get_clean();
echo $content;
?>