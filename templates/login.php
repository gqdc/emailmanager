<?php
?>
<!DOCTYPE html>
<html>
<head>
  <title>E-mail Manager - Se connecter</title>
  <link rel="icon" href="favicon.ico" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</head>
<body>
  <header>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="light">
      <div class="container-fluid justify-content">
        <span class="navbar-brand text-light">
          <img src="./img/omrs-emailmanager-logo.png" alt="OMRS EmailManager Logo" width="45" height="45" class="me-1 d-inline-block align-text-top">
          Gestionnaire de comptes e-mail et aliases
        </span>
      </div>
    </nav>
  </header>
<div class="container-fluid">
  <?php
    show_login_form();
  ?>
</div>
<!--<script src="js/components/login.js"></script>-->
<script src="js/api.js"></script>
<script src="js/auth.js"></script>
</body>
</html>