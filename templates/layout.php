<?php
?>
<!DOCTYPE html>
<html>
<head>
  <title><?php echo 'E-mail Manager - ' . EMAIL_DOMAIN ?></title>
  <link rel="icon" href="favicon.ico" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
  <script type="text/javascript" src="js/tools/node_modules/@zxcvbn-ts/core/dist/zxcvbn-ts.js"></script>
  <script type="text/javascript" src="js/tools/node_modules/@zxcvbn-ts/language-common/dist/zxcvbn-ts.js"></script>
  <script type="text/javascript" src="js/tools/node_modules/@zxcvbn-ts/language-en/dist/zxcvbn-ts.js"></script>
  <script type="text/javascript" src="js/tools/node_modules/@zxcvbn-ts/language-fr/dist/zxcvbn-ts.js"></script>
</head>
<body>
  <?php
    show_header(CUSTOMER_ID);
  ?>
<div class="container-fluid">
  <?php
    show_accounts_list(EMAIL_DOMAIN);
    show_aliases_list(EMAIL_DOMAIN);
  ?>
</div>
<script>
  var Email = {
      DomainName: "<?php echo EMAIL_DOMAIN ?>",
      AccountsList: <?php echo get_accounts_list(EMAIL_DOMAIN) ?>,
      AliasesList: <?php echo get_aliases_list(EMAIL_DOMAIN) ?>,
      GlobalList: [],
    };
  Email.GlobalList.push(...Email.AccountsList);
  Email.GlobalList.push(...Email.AliasesList);

  var Customer = {
    Infos: <?php echo get_customer_infos(CUSTOMER_ID) ?>,
    Ressources: <?php echo get_customer_ressources(CUSTOMER_ID) ?>,
  };
</script>
<script src="js/components/password-strength.js"></script>
<script src="js/components/header.js"></script>
<script src="js/components/accountsList.js"></script>
<script src="js/api.js"></script>
<script src="js/main.js"></script>

</body>
</html>
