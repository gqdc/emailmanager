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

<template id="account_informations_modal">
  <div class="w3-modal" style="display: none;">
    <div class="w3-modal-content w3-card-4">
      <header class="w3-container w3-orange"> 
        <h2></h2>
      </header>
      <div class="w3-container">
        <div class="w3-container">
          <h3>Rediriger</h3>
          <form class="w3-container" id="email_redirect">
            <p>Rediriger les e-mails de ce compte ?
            <input type="radio" id="email_redirect_true" name="email_redirect" value="true" autocomplete="off" /> <label for="email_redirect_true">Oui</label>
            <input type="radio" id="email_redirect_false" name="email_redirect" value="false" autocomplete="off" /> <label for="email_redirect_false">Non</label></p>
            <div id="redirect_target_list">
              <label>Rediriger les e-mails vers :</label><select class="w3-select w3-border" name="redirectTarget" form="email_redirect" autocomplete="off"></select>
            </div>
            <p><button class="w3-button w3-border" form="email_redirect" name="send_email_redirect" disabled="true">Confirmer</button><span class="status_box"></span></p>
          </form>
        </div>
        <div class="w3-container">
          <form class="w3-container" id="email_password">
            <fieldset name="security">
              <h3>Sécurité</h3>
            </fieldset>
          </form>
        </div>
      </div>
      <footer class="w3-container w3-white"></footer>
    </div>
  </div>
</template>

<template id="account_creation_modal">
  <div class="w3-modal" style="display: none;">
    <div class="w3-modal-content w3-card-4">
      <header class="w3-container w3-orange">
        <h2></h2>
      </header>
      <div class="w3-container">
        <div class="w3-container">
          <form class="w3-container" id="email_creation">
          <fieldset name="identity">
            <h3>Identification</h3>
            <label for="username">Nom d'utilisateur</label><input class="w3-input w3-border" id="username" name="username" type="text" autocomplete="new-password" pattern="^[\w\d]{1}[\w\d\-.]{4,32}[\w\d]$" required="true"></input>
                <ul id="username_infos" style="display:none">
                  <li id="username_requirements"></li>
                  <li id="username_warning"></li>
                  <li id="username_score"></li>
                </ul>
          </fieldset>
          <fieldset name="security">
            <h3>Sécurité</h3>
          </fieldset>
          <!--<h3>Paramètres facultatifs</h3>
            <label for="quota">Quota</label><input class="w3-input w3-border" type="range" id="quota" name="quota" min="0" max="100"/>-->
            <p><button class="w3-button w3-border" form="email_creation" name="send_email_creation" disabled="true">Créer le compte</button><span class="status_box"></span></p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<template id="account_deletion_modal">
  <div class="w3-modal" style="display: none;">
    <div class="w3-modal-content w3-card-4">
      <header class="w3-container w3-orange">
        <h2></h2>
      </header>
      <div class="w3-container">
        <div class="w3-container">
          <form class="w3-container" id="email_deletion">
            <h3><!-- Voulez-vous supprimer le compte ... --></h3>
            <label for="email_delete_true">Oui </label><input type="radio" id="email_delete_true" name="email_delete" value="true" autocomplete="off" />
            <label for="email_delete_false">Non </label><input type="radio" id="email_delete_false" name="email_delete" value="false" autocomplete="off" checked="true"/>
            <p><button class="w3-button w3-border" form="email_deletion" name="send_email_deletion" disabled="true">Supprimer le compte</button><span class="status_box"></span></p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<template id="password_inputs">
    <label>Nouveau mot de passe :</label><input class="w3-input w3-border" name="password" type="password" minlength="12" autocomplete="new-password"></input>
    <ul id="password_infos" style="display:none">
      <li id="password_requirements"></li>
      <li id="password_score"></li>
      <li id="password_warning"></li>
      <li id="password_suggestion"></li>
    </ul>
    <label>Confirmer le nouveau mot de passe :</label><input class="w3-input w3-border" type="password" disabled="true"></input>
    <p><button class="w3-button w3-border" form="email_password" name="send_email_password" disabled="true">Changer le mot de passe</button><span class="status_box"></span></p>
</template>

<section id="accounts"></section>


<script>
    var Email = {
          DomainName: "<?php echo EMAIL_DOMAIN ?>"
        }
</script>
<script src="js/components/password-strength.js"></script>
<script src="js/components/accountsList.js"></script>
<script src="js/api.js"></script>
<script src="js/main.js"></script>

</body>
</html>