<?php
?>
<!DOCTYPE html>
<html>
<head>
  <title><?php echo EMAIL_DOMAIN ?></title>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <style>
    body {
      max-width:1366px;
      margin:auto;
    }
    tr.inactive > td {
      text-decoration:line-through;
    }

    .custom-loader {
      width:20px;
      height:20px;
      border-radius:50%;
      background:conic-gradient(#0000 10%,#0967F4);
      -webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 4px),#000 0);
      animation:s3 0.5s infinite linear;
    }

    @keyframes s3 {to{transform: rotate(1turn)}}

    .status_box {
      margin-left: 15px;
      font-size: 20px;
      vertical-align: middle;
    }

    .indicator span.weak:before{
      background-color: #ff4757;
    }
    .indicator span.medium:before{
      background-color: orange;
    }
    
    .indicator span.strong:before{
      background-color: #23ad5c;
    }

    form .text.weak{
      color: #ff4757;
    }

    form .text.medium{
     color: orange;
    }

    form .text.strong{
      color: #23ad5c;
    }

    form .indicator span.active:before{
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }

    form .indicator{
      height: 10px;
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      display: none;
    }

    form .indicator span{
      position: relative;
      height: 100%;
      width: 100%;
      background: lightgrey;
      border-radius: 5px;
    }

    form .indicator span:nth-child(2){
      margin: 0 3px;
    }
    form .indicator span.active:before{
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }

    form ul.w3-ul li {
      border-bottom: none;
    }
    fieldset {
      border: none;
    }
  </style>
  <script type="text/javascript" src="js/tools/node_modules/@zxcvbn-ts/core/dist/zxcvbn-ts.js"></script>
  <script type="text/javascript" src="js/tools/node_modules/@zxcvbn-ts/language-common/dist/zxcvbn-ts.js"></script>
  <script type="text/javascript" src="js/tools/node_modules/@zxcvbn-ts/language-en/dist/zxcvbn-ts.js"></script>
  <script type="text/javascript" src="js/tools/node_modules/@zxcvbn-ts/language-fr/dist/zxcvbn-ts.js"></script>
</head>
<body>

<?= $content ?>

<script>
    var Email = {
          DomainName: "<?php echo EMAIL_DOMAIN ?>",
          AccountsList: <?php echo $accountsList ?>,
        };
</script>
<script src="js/components/password-strength.js"></script>
<script src="js/components/accountsList.js"></script>
<script src="js/api.js"></script>
<script src="js/main.js"></script>

</body>
</html>