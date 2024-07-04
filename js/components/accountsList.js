function make_accounts_section(domain, accountsList) {
  console.info('make_accounts_section ' + domain);
  
  // RAZ de la section (utile lorsque l'on veut regénérer la liste)
  //document.querySelector('section#accounts').innerHTML = "";

  const tpl = document.querySelector("template#accounts_list");
  const tplSection = document.importNode(tpl.content, true);
  
  const accountsTable = tplSection.querySelector('table');
  const sectionButton = tplSection.querySelector('button#create_email_account');
  const sectionHeader = tplSection.querySelector('header');
  const sectionHeaderTitle = sectionHeader.querySelector('h2');
  
  sectionHeaderTitle.innerText = `Liste des comptes de courriels @${domain}`;

  accountsTable.classList.add('w3-table-all', 'w3-hoverable');

  for (const account of accountsList) {
    const accountLine = document.createElement("tr");

    const email = document.createElement("td");
    const forward = document.createElement("td");
    const quota = document.createElement("td");
    const actions = document.createElement("td");

    email.textContent = account.username + "@" + account.domain;
    forward.textContent = account.forward_to
    quota.innerHTML = floor10(account.bytes/1073741824,'-1') + ' Go / ' + account.quota/1048576 + ' Go<br />' + account.messages + ' Messages'    ;
    actions.classList.add('w3-center');

    actions.innerHTML = `<button class="w3-button w3-blue" name="editEmail" value="${account.username}@${account.domain}" >éditer</button> `;
 
    actions.innerHTML += `<button class="w3-button w3-red" name="deleteEmail" value="${account.username}@${account.domain}">supprimer</button>`;

    accountLine.appendChild(email);
    accountLine.appendChild(forward);
    accountLine.appendChild(quota);
    accountLine.appendChild(actions);

    accountsTable.appendChild(accountLine);
  }

  document.querySelector('section#accounts').append(sectionHeader, accountsTable)
  
  let addBtn = document.getElementById('create_email_account');
  let deleteBtn = document.querySelectorAll('button[name=deleteEmail');
  let editBtn = document.querySelectorAll('button[name=editEmail');

  addBtn.addEventListener('click', () => {
    console.log('addBtn');
    make_account_creation_modal();
    show_account_creation_modal();
  })

  deleteBtn.forEach(button => {
    button.addEventListener('click', async (event) => {
    console.log("deleteEmail");
      try {
        console.log(event);
        let make = await make_account_deletion_modal(event, accountsList);
        show_account_deletion_modal(event);
      } catch (e) {
        console.log(e);
      }
    })
  })

  editBtn.forEach(button => {
    button.addEventListener('click', async (event) => {
      //makeActionModal(accountsList, event);
      try {
        let make = await make_account_edition_modal(event, accountsList);
        show_account_edition_modal(event);
      } catch (e) {
        console.log(e);
      }
    })
  })
}


async function update_accounts_section(domain,accountList=null) {
  console.info('update_accounts_section ' + domain);
  if (accountList) {
    console.info('with ' + accountList);
  }
  // RAZ de la section (utile lorsque l'on veut regénérer la liste)
  document.querySelector('section#accounts').innerHTML = "";

  const tpl = document.querySelector("template#accounts_list");
  const tplSection = document.importNode(tpl.content, true);
  
  const accountsTable = tplSection.querySelector('table');
  const sectionButton = tplSection.querySelector('button#create_email_account');
  const sectionHeader = tplSection.querySelector('header');
  const sectionHeaderTitle = sectionHeader.querySelector('h2');
  
  sectionHeaderTitle.innerText = `Liste des comptes de courriels @${domain}`;

  accountsTable.classList.add('w3-table-all', 'w3-hoverable');

  try {
    const accountsList = await fetchAccountsList(domain)

    if (accountsList) {
      for (const account of accountsList) {
        const accountLine = document.createElement("tr");
        
        // Si le compte est désactivé, on applique la classe "inactive" au <tr>
        /*if ( account.active == 0 ) {
          accountLine.classList.add('inactive');
        }*/

        const email = document.createElement("td");
        const forward = document.createElement("td");
        const quota = document.createElement("td");
        const actions = document.createElement("td");

        email.textContent = account.username + "@" + account.domain;
        forward.textContent = account.forward_to
        quota.innerHTML = floor10(account.bytes/1073741824,'-1') + ' Go / ' + account.quota/1048576 + ' Go<br />' + account.messages + ' Messages'    ;
        actions.classList.add('w3-center');

        actions.innerHTML = `<button class="w3-button w3-blue" name="editEmail" value="${account.username}@${account.domain}" >éditer</button> `;
     
        /*if ( account.active == 0 ) {
            actions.innerHTML += `<button class="w3-button" name="activateEmail" value="${account.username}@${account.domain}">activer</button>`;
        } else {
            actions.innerHTML += `<button class="w3-button" name="deactivateEmail" value="${account.username}@${account.domain}">désactiver</button>`;
        }*/

        actions.innerHTML += `<button class="w3-button w3-red" name="deleteEmail" value="${account.username}@${account.domain}">supprimer</button>`;

        accountLine.appendChild(email);
        accountLine.appendChild(forward);
        accountLine.appendChild(quota);
        accountLine.appendChild(actions);

        accountsTable.appendChild(accountLine);
      }


      document.querySelector('section#accounts').append(sectionHeader, accountsTable)
      
      let addBtn = document.getElementById('create_email_account');
      let deleteBtn = document.querySelectorAll('button[name=deleteEmail');
      let editBtn = document.querySelectorAll('button[name=editEmail');

      addBtn.addEventListener('click', () => {
        console.log('addBtn');
        make_account_creation_modal();
        show_account_creation_modal();
      })

      deleteBtn.forEach(button => {
        button.addEventListener('click', async (event) => {
        console.log("deleteEmail");
          try {
            console.log(event);
            let make = await make_account_deletion_modal(event, accountsList);
            show_account_deletion_modal(event);
          } catch (e) {
            console.log(e);
          }
        })
      })

      editBtn.forEach(button => {
        button.addEventListener('click', async (event) => {
          //makeActionModal(accountsList, event);
          try {
            let make = await make_account_edition_modal(event, accountsList);
            show_account_edition_modal(event);
          } catch (e) {
            console.log(e);
          }
        })
      })
    }   
  } catch (e) {
    console.error(e);
  }
}

async function make_account_edition_modal(event, accountsList) {
  console.info('make_account_edition_modal');

  const formID = 'email_password';
  let emailAddress = event.target.value
  let username = emailAddress.split('@')[0];
  let domain = emailAddress.split('@')[1];

  if (accountsList === undefined) {
    console.info('fetchAccountList');
    try {
      let accountsList = await fetchAccountList(domain);
      console.log(accountsList);
    } catch (e) {
      console.error('Error: ', e);
    }
  }
  
  try {
    const account = await fetchAccountInformations(domain, username, accountsList);

    if (account) {
      const template = document.querySelector("#account_informations_modal");
      const modal = document.importNode(template.content, true);

      modal.querySelector('div').id = "modal_" + username + "@" + domain;        
      modal.querySelector('header h2').innerText = "Configuration - " + emailAddress;

      let closeBtn = document.createElement('span');
      closeBtn.classList = "w3-button w3-display-topright w3-xlarge w3-hover-red";
      closeBtn.innerHTML = "&times;";

      modal.querySelector('header h2').append(closeBtn); 

      // Formulaire redirection e-mail
      // Construction de la liste de redirection
      modal.querySelector('select').id = "redirect_" + username + "@" + domain;

      for (const redirection of accountsList) {
        if ( redirection.username !== username) {
          option = document.createElement("option");
          option.value = redirection.username + "@" + redirection.domain;
          option.innerText = redirection.username + "@" + redirection.domain;
        
          // Si le compte est redirigé, on selectionne la cible de redirection
          if ( account.forward_to === redirection.username + "@" + redirection.domain) {
            option.setAttribute('selected', true);
          }
          modal.querySelector('select').append(option);
        }
      }

      if (account.forward_to !== "") {
        modal.querySelector('input#email_redirect_false').checked = false;
        modal.querySelector('input#email_redirect_true').checked = true;
        modal.querySelector('div#redirect_target_list').style.display = "block";
      } else {
        modal.querySelector('input#email_redirect_false').checked = true;
        modal.querySelector('input#email_redirect_true').checked = false;
        modal.querySelector('div#redirect_target_list').style.display = "none";
      }

      document.querySelector('body').append(modal);

      // Active ou non la liste de sélection des cibles de redirection
      // en fonction de l'état des boutons radios.
      let radioRedirect = document.querySelectorAll('input[name="email_redirect"]');
      let registeredRadioRedirect = document.querySelector('input[name="email_redirect"]:checked').value;
      let buttonSendFormRedirect = document.querySelector('button[name="send_email_redirect"]');
      let formRedirect = document.getElementById('email_redirect');
      let selectRedirect = document.querySelector('select[name=redirectTarget]');
      let registeredOptionIndex = selectRedirect.selectedIndex;

      radioRedirect.forEach(radio => {
        // Active le bouton "Confirmer" de la partie "Rediriger"
        // lors d'un changement sur le bouton "Rediriger les e-mails"
        radio.addEventListener('change', (event => {
          let checkedRadioRedirect = document.querySelector('input[name="email_redirect"]:checked').value;      
          if (checkedRadioRedirect !== registeredRadioRedirect) {
            buttonSendFormRedirect.removeAttribute('disabled');
          } else {
            buttonSendFormRedirect.setAttribute('disabled',true);
          }

          // Reset de l'option sélectionnée dans le select "redirectTarget"
          selectRedirect.selectedIndex = registeredOptionIndex;
          console.warn("Reset de l'option sélectionnée dans le select redirectTarget");

          if (document.querySelector('div#redirect_target_list').style.display === "none") {
            document.querySelector('div#redirect_target_list').style.display = "block";
          } else {
            document.querySelector('div#redirect_target_list').style.display = "none";
          }

          // Masque la check mark de confirmation d'envoi du formulaire
          formRedirect.querySelector('span.status_box').style.display = "none";
        }))
      })

      // Active le bouton "Confirmer" de la partie "Rediriger" si l'option change.
      // Désactive le bouton si l'option est celle par défaut.
      selectRedirect.addEventListener('change', (event) => {
        let selectedOptionIndex = document.querySelector('select[name=redirectTarget]').selectedIndex;
        if (selectedOptionIndex !== registeredOptionIndex) {
          buttonSendFormRedirect.removeAttribute('disabled');
        } else {
          buttonSendFormRedirect.setAttribute('disabled',true);
        }

        // Masque la check mark de confirmation d'envoi du formulaire
        formRedirect.querySelector('span.status_box').style.display = "none";
      })

      // Soumission du formulaire de redirection
      formRedirect.addEventListener("submit", (event) => {
        event.preventDefault();
        showLoader(formRedirect.id);
        setRedirection(domain, username, formRedirect);

        console.log(formRedirect);
        // Mise à jour du select si on a changé la cible de redirection
        selectRedirect[registeredOptionIndex].removeAttribute('selected');
        selectRedirect[selectRedirect.selectedIndex].setAttribute('selected', true);
        registeredOptionIndex = selectRedirect.selectedIndex;

        // Mise à jour du bouton radio
        registeredRadioRedirect = document.querySelector('input[name="email_redirect"]:checked').value;
      });

      add_password_inputs(formID, username, domain);

      /*passwordFormInputPasswordVerify.addEventListener("keyup", debounce(function(event){
        comparePasswords();
      }));

      passwordForm.addEventListener("submit", (event) => {
        event.preventDefault();
        showLoader(passwordForm.id);
        setPassword(domain, username, passwordForm);
      });*/
    }
  } catch (error) {
    console.error('Erreur :', error);
  }
}

function comparePasswords(formID) {
  let parentForm = document.getElementById(formID);
  let securityFieldset = parentForm.querySelector("fieldset[name='security']");
  let passwordInputs = securityFieldset.querySelectorAll("input[type='password']");
  let inputPassword = passwordInputs[0];
  let inputPasswordVerify = passwordInputs[1];

  //let passwordFormButton = document.querySelector("button[name='send_email_password']");

  if (inputPassword.value === inputPasswordVerify.value) {
    //passwordFormButton.disabled = false;
    enable_form_button(formID)
    return true;
  } else {
    //passwordFormButton.disabled = true;
    disable_form_button(formID)
    return false;
  }
}

function checkPasswordStrenght() {
  let passwordForm = document.querySelector('form#email_password');
  let passwordFormInputPassword = passwordForm[0];

  console.log(zxcvbnts.core.zxcvbn(passwordFormInputPassword.value)); 
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function show_account_edition_modal(event) {
  const emailaddress = event.target.value;
  
  const modal = document.getElementById("modal_" + emailaddress);
  const closeBtn = modal.querySelector('header span');
  closeBtn.addEventListener('click', function(){
    mask_account_edition_modal(emailaddress);
  });

  modal.style.display='block';
}

function mask_account_edition_modal(emailaddress) {
  const modal = document.getElementById("modal_" + emailaddress);
  modal.style.display='none';
  modal.remove();
}

async function refreshAccountInformations(domain, username, action) {
  console.info('refreshAccountInformations');

  const modal = document.getElementById(`modal_${username}@${domain}`);

  const table = document.querySelector('section#accounts table');
  const tableLines = table.getElementsByTagName('tr');
  
  for (const line of tableLines) {
    if (line.firstElementChild.textContent === `${username}@${domain}`) {
      try {
        const account = await fetchAccountInformations(domain, username)

        let cells = line.getElementsByTagName('td');

        let forward = cells[1];
        let quota = cells[2];
        let actions = cells[3];

        switch(action) {
          case "set_account_redirection":
            console.info('set_account_redirection to',account['forward_to']);
            // Mise à jour de la redirection dans le tableau de la page
            forward.innerText = account['forward_to'];
            break;
          case "set_account_status":
            console.info('set_account_status to',account['active']);
            break;
          case "set_account_password":
            console.info('set_account_password for',`${username}@${domain}`);
            break;
          default:
            console.info("Aucune action n'a été défini");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function make_account_creation_modal() {
  const formID = "email_creation";
  const template = document.querySelector("#account_creation_modal");
  const modal = document.importNode(template.content, true);

  modal.querySelector('div').id = "modal_account_creation";
  modal.querySelector('header h2').innerText = "Ajouter un compte"

  let closeBtn = document.createElement('span');
  closeBtn.classList = "w3-button w3-display-topright w3-xlarge w3-hover-red";
  closeBtn.innerHTML = "&times;";

  modal.querySelector('header h2').append(closeBtn);  
  document.querySelector('body').append(modal);

  let usernameInput = document.getElementById('username');
  let usernameStatusBox = document.getElementById('username_infos');
  let usernameRequirementsBox = document.getElementById('username_requirements');
  let usernameScoreBox = document.getElementById('username_score');
  let usernameWarningBox = document.getElementById('username_warning');

  usernameInput.addEventListener("keyup", debounce(async function(event){
    usernameRequirementsBox.innerHTML = "";
    usernameScoreBox.innerHTML = "";
    usernameWarningBox.innerHTML = "";

    usernameRequirementsBox.style.display = "none";
    usernameScoreBox.style.display = "none";
    usernameWarningBox.style.display = "none";

    if (usernameInput.value.length > 0) {
      usernameStatusBox.classList.add("w3-ul");
      usernameStatusBox.style.display = "block";

      usernameRequirementsBox.innerHTML = '<img src="img/information-help.svg" height="22" width="22"> 4 caractères minimum';
      usernameRequirementsBox.style.display = "inherit";

      if (usernameInput.value.length > 3) {
        usernameRequirementsBox.innerHTML = "";
        usernameRequirementsBox.style.display = "none";

        try {
          let accountExistence = await get_account_informations(document.querySelector(`form#${formID}`));  
          if (accountExistence.length != 0) {
            if (accountExistence.error) {
              console.log(accountExistence);
              usernameWarningBox.innerHTML = `<img src="img/warning-signs.svg" height="22" width="22" alt="Attention"> ${accountExistence.error}`;
              usernameWarningBox.style.display = "inherit";
            } else {
                if (accountExistence[0]['active'] == 1) {
                  console.log("Le compte existe déjà");
                  usernameScoreBox.innerHTML = `<img src="img/checked-success.svg" height="22" width="22" alt="Success"> Le nom d'utilisateur est déjà utilisé`;
                  usernameScoreBox.style.display = "inherit";      
                } else {
                  console.log(accountExistence);
                  usernameWarningBox.innerHTML = `<img src="img/warning-signs.svg" height="22" width="22" alt="Attention"> Erreur inconnu`;
                  usernameWarningBox.style.display = "inherit";    
                }              
            }
          } else if (accountExistence.length == 0) {
            console.log("Le compte n'existe pas");
            usernameScoreBox.innerHTML = `<img src="img/checked-success.svg" height="22" width="22" alt="Success"> nom d'utilisateur valide`;
            usernameScoreBox.style.display = "inherit";

            usernameWarningBox.innerHTML = "";
            usernameWarningBox.style.display = "none";
          }
      } catch {

        }
      }
    } else {
      usernameRequirementsBox.innerHTML = '<img src="img/information-help.svg" height="22" width="22"> 4 caractères minimum';
      usernameRequirementsBox.style.display = "inherit";
    }
  }, 500));

  add_password_inputs(formID, username, domain);

  const parentForm = document.querySelector(`form#${formID}`);
  
  // Soumission du formulaire de création de compte mail
  parentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showLoader(formID);
    add_account(parentForm);
  });
}

function mask_account_creation_modal() {
  const modal = document.getElementById("modal_account_creation");
  modal.style.display='none';
  modal.remove();
}

function show_account_creation_modal() {
  const modal = document.getElementById("modal_account_creation");
  const closeBtn = modal.querySelector('header span');
  closeBtn.addEventListener('click', function(){
    mask_account_creation_modal();
  });

  modal.style.display='block';
}

function make_account_deletion_modal(event) {
  let emailAddress = event.target.value
  let username = emailAddress.split('@')[0];
  let domain = emailAddress.split('@')[1];

  const formID = "email_deletion";
  const template = document.querySelector("#account_deletion_modal");
  const modal = document.importNode(template.content, true);

  modal.querySelector('div').id = "modal_account_deletion";
  modal.querySelector('header h2').innerText = "Suppression - " + emailAddress;
  modal.querySelector('h3').innerText = "Êtes-vous sûre de supprimer " + emailAddress + "?";

  let closeBtn = document.createElement('span');
  closeBtn.classList = "w3-button w3-display-topright w3-xlarge w3-hover-red";
  closeBtn.innerHTML = "&times;";

  modal.querySelector('header h2').append(closeBtn); 

  document.querySelector('body').append(modal);

  let radioDelete = document.querySelectorAll('input[name="email_delete"]');
  let buttonSendFormDelete = document.querySelector('button[name="send_email_deletion"]');

  radioDelete.forEach(radio => {
    // Active le bouton "Confirmer" de la partie "Rediriger"
    // lors d'un changement sur le bouton "Rediriger les e-mails"
    radio.addEventListener('change', (event => {
      let checkedRadioDelete = document.querySelector('input[name="email_delete"]:checked').value;
      console.log(checkedRadioDelete);
      if (checkedRadioDelete == "true") {
        buttonSendFormDelete.removeAttribute('disabled');
      } else {
        buttonSendFormDelete.setAttribute('disabled',true);
      }
    }))
  })

  const parentForm = document.querySelector(`form#${formID}`);
  
  // Soumission du formulaire de création de compte mail
  parentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showLoader(formID);
    delete_account(username, parentForm);
  });
}

function mask_account_deletion_modal() {
  const modal = document.getElementById("modal_account_deletion");
  modal.style.display='none';
  modal.remove();
}

function show_account_deletion_modal() {
  const modal = document.getElementById("modal_account_deletion");
  const closeBtn = modal.querySelector('header span');
  closeBtn.addEventListener('click', function(){
    mask_account_deletion_modal();
  });

  modal.style.display='block';
}

function add_password_inputs(formID, username=null, domain=null) {
  const parentForm = document.getElementById(formID);
  const template = document.querySelector("#password_inputs");
  const password_inputs = document.importNode(template.content, true);
  const securityFieldset = parentForm.querySelector("fieldset[name='security']");

  // Formulaire de changement de mot de passe
  let passwordFormInputs = password_inputs.querySelectorAll("input[type='password']");
  let passwordFormInputPassword = passwordFormInputs[0];
  let passwordFormInputPasswordVerify = passwordFormInputs[1];

  let passwordRequirementsBox = password_inputs.getElementById('password_requirements');
  let passwordStatusBox = password_inputs.getElementById('password_infos');
  let passwordScoreBox = password_inputs.getElementById('password_score');
  let passwordSuggestionBox = password_inputs.getElementById('password_suggestion');
  let passwordWarningBox = password_inputs.getElementById('password_warning');
  let buttonParagraph = password_inputs.querySelector('p');

  if (formID != "email_password") {
    buttonParagraph.remove();
  }

  //let passwordFormButton = password_inputs.querySelector("button[name='send_email_password']");
  //passwordFormButton.disabled = true;
  

  passwordFormInputPassword.addEventListener("keyup", debounce(function(event){
    passwordFormInputPasswordVerify.disabled = true;

    passwordRequirementsBox.innerHTML = "";
    passwordScoreBox.innerHTML = "";
    passwordSuggestionBox.innerHTML = "";
    passwordWarningBox.innerHTML = "";

    passwordRequirementsBox.style.display = "none";
    passwordScoreBox.style.display = "none";
    passwordSuggestionBox.style.display = "none";
    passwordWarningBox.style.display = "none";

    if (passwordFormInputPassword.value.length > 0) {
      passwordStatusBox.classList.add("w3-ul");
      passwordStatusBox.style.display = "block";

      passwordRequirementsBox.innerHTML = '<img src="img/information-help.svg" height="22" width="22"> 12 caractères minimum';
      passwordRequirementsBox.style.display = "inherit";

      if (passwordFormInputPassword.value.length >= 12 ) {
        passwordRequirementsBox.innerHTML = "";
        passwordRequirementsBox.style.display = "none";
        passwordScoreBox.style.display= "inherit";

        passwordTestResult = passwordEstimator(passwordFormInputPassword.value, [username,domain]);
        
        console.log(passwordTestResult);

        switch (passwordTestResult.score) {
          case 0:
            passwordScoreBox.innerHTML = 'Fiabilité du mot de passe : <strong>Très faible</strong>';
            passwordScoreBox.classList = "w3-tag, w3-large, w3-red";

            break;
          case 1:
            passwordScoreBox.innerHTML = 'Fiabilité du mot de passe : <strong>faible</strong>';
            passwordScoreBox.classList = "w3-tag, w3-large, w3-red";

            break;
          case 2:
            passwordScoreBox.innerHTML = 'Fiabilité du mot de passe : <strong>moyenne</strong>';
            passwordScoreBox.classList = "w3-tag, w3-large, w3-orange";

            break;
          case 3:
            passwordScoreBox.innerHTML = 'Fiabilité du mot de passe : <strong>bonne</strong>';
            passwordScoreBox.classList = "w3-tag, w3-large, w3-yellow";

            passwordFormInputPasswordVerify.disabled = false;

            break;
          case 4:
            passwordScoreBox.innerHTML = 'Fiabilité du mot de passe : <strong>excellente</strong>';
            passwordScoreBox.classList = "w3-tag, w3-large, w3-green";

            passwordFormInputPasswordVerify.disabled = false;

            break;
        }

        if (passwordTestResult.feedback.warning !== null) {
          console.log(passwordTestResult.feedback.warning);
          passwordWarningBox.innerHTML = `<img src="img/warning-signs.svg" height="22" width="22" alt="Attention"> ${passwordTestResult.feedback.warning}`;
          passwordWarningBox.style.display = "inherit";
        } else {
          passwordWarningBox.innerHTML = "";
        }
        
        if ( passwordTestResult.feedback.suggestions.length > 0 ) {
          console.log(passwordTestResult.feedback.suggestions);
          suggestionsList = document.createElement('ul');
          suggestionsList.style.paddingLeft = '0px';
          passwordSuggestionBox.appendChild(suggestionsList);
          
          passwordTestResult.feedback.suggestions.forEach(function (element) {
            let suggestion = document.createElement('li');
            suggestion.style.paddingLeft = '0px';
            suggestion.innerHTML = `<img src="img/information-help.svg" height="22" width="22" alt="Conseils"> ${element}`;
            passwordSuggestionBox.appendChild(suggestion);
          });

          passwordSuggestionBox.style.display = "inherit";
        } else {
          passwordSuggestionBox.innerHTML = "";
        }
      }
    } else {
        passwordStatusBox.style.display = "none";
    }    
  },500));

  passwordFormInputPasswordVerify.addEventListener("keyup", debounce(function(event){
    comparePasswords(formID);
  }));

  if (parentForm.id == "email_password") {
    parentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showLoader(parentForm.id);
      setPassword(domain, username, parentForm);  
    });
  }

  securityFieldset.appendChild(password_inputs);
}

function enable_form_button(formID) {
  let parentForm = document.getElementById(formID);
  let formButton = parentForm.querySelector(`button[form=${formID}]`);

  formButton.disabled = false;
}

function disable_form_button(formID) {
  let parentForm = document.getElementById(formID);
  let formButton = parentForm.querySelector(`button[form=${formID}]`);

  formButton.disabled = true;
}