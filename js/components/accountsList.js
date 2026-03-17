function make_accounts_section(domain, accountsList) {
  console.info('make_accounts_section ' + domain);
  console.info(accountsList);
  
  const tpl = document.querySelector("template#accounts_list");
  const tplSection = document.importNode(tpl.content, true);
  
  const accountsTable = tplSection.querySelector('table');
  const sectionButton = tplSection.querySelector('button#create_email_account');
  const sectionHeader = tplSection.querySelector('header');

  for (const account of accountsList) {
    const accountLine = document.createElement("tr");

    const email = document.createElement("td");
    const forward = document.createElement("td");
    const quota = document.createElement("td");
    const actions = document.createElement("td");

    email.textContent = account.username + "@" + account.domain;
    // On retire l'adresse e-mail courante de la liste des aliases du compte, 
    // car elle est implicitement contenu dans la liste, et qu'il n'est donc pas nécessaire de l'afficher/
    forward.innerHTML = account.forward_to.replace(','+email.textContent,'').split(`,`).join('<br>');

    usedQuota = floor10(account.bytes/1073741824,'-1');
    maxQuota = account.quota/1048576;
    percentQuota = usedQuota/maxQuota*100;
    
    quota.innerHTML = `<meter min="0" max="100" low="40" high="80" value="${percentQuota}">${percentQuota}%</meter><br />${usedQuota} Go / ${maxQuota} Go<br /> ${account.messages} Messages`;
    actions.classList.add('w3-center');

    actions.innerHTML = `<button class="btn btn-warning" name="editEmail" value="${account.username}@${account.domain}" >Éditer</button> `;
 
    actions.innerHTML += `<button class="btn btn-danger" name="deleteEmail" value="${account.username}@${account.domain}">Supprimer</button>`;

    accountLine.appendChild(email);
    accountLine.appendChild(forward);
    accountLine.appendChild(quota);
    accountLine.appendChild(actions);

    accountsTable.querySelector("tbody").appendChild(accountLine);
  }

  document.querySelector('section#accounts').append(sectionHeader, accountsTable)
  
  let addBtn = document.getElementById('create_email_account');
  let deleteBtn = document.querySelectorAll('button[name=deleteEmail');
  let editBtn = document.querySelectorAll('button[name=editEmail');

  addBtn.addEventListener('click', () => {
    console.log('addBtn');
    make_account_creation_modal();
    const modalEmailCreation = new bootstrap.Modal(document.getElementById('modalEmailCreation'));
    modalEmailCreation.show();
  })

  deleteBtn.forEach(button => {
    button.addEventListener('click', async (event) => {
    console.log("deleteEmail");
      try {
        console.log(event);
//        let modalID = await make_account_deletion_modal(event, accountsList);
        let modalID = await make_account_deletion_modal(event);
        const modalEmailDeletion = new bootstrap.Modal(document.getElementById(modalID));
        modalEmailDeletion.show();

        document.getElementById(modalID).addEventListener('hidden.bs.modal', function () {
          modalEmailDeletion.dispose(); // Remove the modal from Bootstrap
          document.getElementById(modalID).remove(); // .. then remove the modal from the dom.
        })
      } catch (e) {
        console.log(e);
      }
    })
  })

  editBtn.forEach(button => {
    button.addEventListener('click', async (event) => {
      console.log('editBtn');
      try {
        let modalID = await make_account_edition_modal(event, accountsList);
        const modalEmailEdition = new bootstrap.Modal(document.getElementById(modalID));
        modalEmailEdition.show();
        console.log(modalEmailEdition);
        
        document.getElementById(modalID).addEventListener('hidden.bs.modal', function () {
          modalEmailEdition.dispose(); // Remove the modal from Bootstrap
          document.getElementById(modalID).remove(); // .. then remove the modal from the dom.
        })

      } catch (e) {
        console.log(e);
      }
    })
  })
}

function make_aliases_section(domain, aliasesList) {
  console.info('make_aliases_section ' + domain);
  console.info(aliasesList);

  const tpl = document.querySelector("template#aliases_list");
  const tplSection = document.importNode(tpl.content, true);
  const aliasesTable = tplSection.querySelector('table');
  const sectionButton = tplSection.querySelector('button#create_email_alias');
  const sectionHeader = tplSection.querySelector('header');

  for (const alias of aliasesList) {
    const aliasLine = document.createElement("tr");

    const email = document.createElement("td");
    const forward = document.createElement("td");
    const actions = document.createElement("td");

    email.textContent = alias.username + "@" + alias.domain;
    forward.innerHTML = alias.forward_to.split(`,`).join('<br>');

    actions.innerHTML = `<button class="btn btn-warning" name="editAlias" value="${alias.username}@${alias.domain}" >Éditer</button> `;
    actions.innerHTML += `<button class="btn btn-danger" name="deleteAlias" value="${alias.username}@${alias.domain}">Supprimer</button>`;

    aliasLine.appendChild(email);
    aliasLine.appendChild(forward);
    aliasLine.appendChild(actions);

    aliasesTable.querySelector("tbody").appendChild(aliasLine);
  }

  document.querySelector('section#aliases').append(sectionHeader, aliasesTable)
  
  let addBtn = document.getElementById('create_email_alias');
  let deleteBtn = document.querySelectorAll('button[name=deleteAlias');
  let editBtn = document.querySelectorAll('button[name=editAlias');

  addBtn.addEventListener('click', () => {
    console.log('addBtn');
    make_alias_creation_modal();
    const modalAliasCreation = new bootstrap.Modal(document.getElementById('modalAliasCreation'));
    modalAliasCreation.show();    
  })

  deleteBtn.forEach(button => {
    button.addEventListener('click', async (event) => {
    console.log("deleteAlias");
      try {
        console.log(event);
        //let modalID = await make_alias_deletion_modal(event, aliasesList);
        let modalID = await make_account_deletion_modal(event);
        const modalAliasDeletion = new bootstrap.Modal(document.getElementById(modalID));
        modalAliasDeletion.show();
        document.getElementById(modalID).addEventListener('hidden.bs.modal', function () {
          modalAliasDeletion.dispose(); // Remove the modal from Bootstrap
          document.getElementById(modalID).remove(); // .. then remove the modal from the dom.
        })
      } catch (e) {
        console.log(e);
      }
    })
  })

  editBtn.forEach(button => {
    button.addEventListener('click', async (event) => {
      console.log('editBtn');
      try {
        let modalID = await make_alias_edition_modal(event, aliasesList);
        const modalAliasEdition = new bootstrap.Modal(document.getElementById(modalID));
        modalAliasEdition.show();
        console.log(modalAliasEdition);
        
        document.getElementById(modalID).addEventListener('hidden.bs.modal', function () {
          modalAliasEdition.dispose(); // Remove the modal from Bootstrap
          document.getElementById(modalID).remove(); // .. then remove the modal from the dom.
        })

      } catch (e) {
        console.log(e);
      }
    })
  })
}

async function update_accounts_section(domain,accountList) {
  console.info('update_accounts_section ' + domain);
  document.querySelector('section#accounts').innerHTML = "";
  make_accounts_section(domain, accountsList);
}

async function update_aliases_section(domain,aliasesList) {
  console.info('update_aliases_section ' + domain);
  document.querySelector('section#aliases').innerHTML = "";
  make_aliases_section(domain, aliasesList);
}


async function make_account_edition_modal(event, accountsList) {
  console.info('make_account_edition_modal ' + event );

  const formID = 'emailEdition';
  let emailAddress = event.target.value
  let username = emailAddress.split('@')[0];
  //let domain = emailAddress.split('@')[1];
  let domain = Email.DomainName;
  let modalID = `modalEmailEdition`;
  
  if ( document.getElementById(modalID)) {
    return modalID;
  } 
  else {
    try {
      const account = await fetchItemInformations(domain, username);

      if (account) {
        const template = document.querySelector("#account_edition_modal");
        const modal = document.importNode(template.content, true);

        modal.querySelector('div').id = modalID;
        modal.querySelector('h2.modal-title').innerText = emailAddress;

        // Form submission
        const parentForm = modal.querySelector(`form#${formID}`);
        const submitButton = modal.querySelector(`button[form=${formID}]`);
        submitButton.addEventListener("click", (event) => {
          event.preventDefault();
          console.log(parentForm);
          showLoader('modalEmailEdition');
          edit_account(parentForm,username,domain);
        });  

        document.querySelector('body').append(modal);
        add_password_inputs(formID, username, domain);
        add_alias_input(formID,account.forward_to);
        
        return modalID;
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  }
}

function comparePasswords(formID) {
  let parentForm = document.getElementById(formID);
  let securityFieldset = parentForm.querySelector("fieldset[name='security']");
  let passwordInputs = securityFieldset.querySelectorAll("input[type='password']");
  let inputPassword = passwordInputs[0];
  let inputPasswordVerify = passwordInputs[1];

  if (inputPassword.value === inputPasswordVerify.value) {
    enable_form_button(formID)
    return true;
  } else {
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

async function refreshAccountInformations(domain, username, action) {
  console.info('refreshAccountInformations');

  const modal = document.getElementById(`modal_${username}@${domain}`);

  const table = document.querySelector('section#accounts table');
  const tableLines = table.getElementsByTagName('tr');
  
  for (const line of tableLines) {
    if (line.firstElementChild.textContent === `${username}@${domain}`) {
      try {
        const account = await fetchItemInformations(domain, username)

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
  const formID = "emailCreation";
  const template = document.querySelector("#account_creation_modal");
  const modal = document.importNode(template.content, true);

  if (document.getElementById('modalEmailCreation')) {
    document.getElementById('modalEmailCreation').remove();
  }

  modal.querySelector('div').id = "modalEmailCreation";
  document.querySelector('body').append(modal);

  // Username
  add_username_input(formID)

  // Password
  add_password_inputs(formID, username, domain);

  // Redirection 
  add_alias_input(formID);
  
  // Form submission
  const parentForm = document.querySelector(`form#${formID}`);
  const submitButton = document.querySelector(`button[form=${formID}]`);
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(parentForm);
    showLoader('modalEmailCreation');
    add_account(parentForm);
  });
}

function make_account_deletion_modal(event) {
  
  const formID = 'emailDeletion';
  let emailAddress = event.target.value
  let username = emailAddress.split('@')[0];
  let domain = emailAddress.split('@')[1];
  let itemType = event.target.name;
  let modalID = 'modalEmailDeletion';

  const template = document.querySelector("#account_deletion_modal");
  const modal = document.importNode(template.content, true);       
  modal.querySelector('h2.modal-title').innerText = emailAddress;

  const parentForm = modal.querySelector(`form#${formID}`);
  
  // Soumission du formulaire de suppression de compte mail
  parentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showLoader(modalID);
    console.log(event);
    delete_account(parentForm,username,domain,itemType);
  });

  document.querySelector('body').append(modal);
  add_deletion_input(formID, itemType);

  return modalID;
}

async function make_alias_edition_modal(event, aliasesList) {
  console.info('make_alias_edition_modal');

  const formID = 'aliasEdition';
  let emailAddress = event.target.value
  let username = emailAddress.split('@')[0];
  let domain = emailAddress.split('@')[1];
  let modalID = `modalAliasEdition`;
  
  if ( document.getElementById(modalID)) {
    return modalID;
  } 
  else {
    try {
      const alias = await fetchItemInformations(domain, username, 'alias');

      if (alias) {
        
        const template = document.querySelector("#alias_edition_modal");
        const modal = document.importNode(template.content, true);

        //modal.querySelector('div').id = "modal_" + username + domain;
        modal.querySelector('div').id = modalID;
        modal.querySelector('h2.modal-title').innerText = emailAddress;

        // Form submission
        const parentForm = modal.querySelector(`form#${formID}`);
        const submitButton = modal.querySelector(`button[form=${formID}]`);
        submitButton.addEventListener("click", (event) => {
          event.preventDefault();
          console.log(parentForm);
          showLoader('modalAliasEdition');
          edit_alias(parentForm,username,domain);
        });  

        document.querySelector('body').append(modal);
        add_alias_input(formID,alias.forward_to);
        
        return modalID;
      }

    } catch (error) {
      console.error('Erreur :', error);
    }
  }
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

  let passwordRequirementLenghtBox = password_inputs.querySelector('#password-requirements-length');
  let passwordRequirementLenghtIcon = password_inputs.querySelector('#password-requirements-length i');

  let passwordScoreBox = password_inputs.getElementById('password-requirements-score');
  let passwordScoreIcon = passwordScoreBox.querySelector('i');
  let passwordScoreInfos = passwordScoreBox.querySelector('span');

  /*let passwordWarningBox = password_inputs.getElementById('password-requirements-warning');
  let passwordWarningIcon = passwordWarningBox.querySelector('i');
  let passwordWarningInfos = passwordWarningBox.querySelector('span');*/
  
  let buttonParagraph = password_inputs.querySelector('p');

  if (formID != "email_password") {
    buttonParagraph.remove();
  }

  //let passwordFormButton = password_inputs.querySelector("button[name='send_email_password']");
  //passwordFormButton.disabled = true;
  

  passwordFormInputPassword.addEventListener("keyup", debounce(function(event){
    passwordFormInputPasswordVerify.disabled = true;

    passwordRequirementLenghtIcon.classList = "bi bi-info-circle";

    passwordScoreInfos.innerHTML = "";
    passwordScoreBox.style.display = "none";

    if (passwordFormInputPassword.value.length > 0) {
      
      if (passwordFormInputPassword.value.length >= 12 ) {
        passwordRequirementLenghtBox.classList = 'visually-hidden';
        passwordRequirementLenghtIcon.classList = 'bi bi-check-circle';
        passwordScoreBox.style.display= "inherit";

        passwordTestResult = passwordEstimator(passwordFormInputPassword.value, [username,domain]);
        
        console.log(passwordTestResult);

        switch (passwordTestResult.score) {
          case 0:
            passwordScoreInfos.innerHTML = 'Fiabilité du mot de passe : <strong>faible</strong>';
            passwordScoreIcon.classList = "bi bi-x-circle";
            passwordScoreBox.classList = "text-danger";

            break;
          case 1:
            passwordScoreInfos.innerHTML = 'Fiabilité du mot de passe : <strong>faible</strong>';
            passwordScoreIcon.classList = "bi bi-x-circle";
            passwordScoreBox.classList = "text-danger";

            break;
          case 2:
            passwordScoreInfos.innerHTML = 'Fiabilité du mot de passe : <strong>faible</strong>';
            passwordScoreIcon.classList = "bi bi-x-circle";
            passwordScoreBox.classList = "text-danger";

            break;
          case 3:
            passwordScoreInfos.innerHTML = 'Fiabilité du mot de passe : <strong>bonne</strong>';
            passwordScoreIcon.classList = 'bi bi-check-circle';
            passwordScoreBox.classList = 'text-success-emphasis';

            passwordFormInputPasswordVerify.disabled = false;

            break;
          case 4:
            passwordScoreInfos.innerHTML = 'Fiabilité du mot de passe : <strong>bonne</strong>';
            passwordScoreIcon.classList = 'bi bi-check-circle text-success-emphasis';
            passwordScoreBox.classList = 'text-success-emphasis';

            passwordFormInputPasswordVerify.disabled = false;

            break;
        }

        /*if (passwordTestResult.feedback.warning !== null) {
          console.log(passwordTestResult.feedback.warning);
          passwordWarningIcon.classList = 'bi bi-info-circle' 
          passwordWarningInfos.innerHTML = passwordTestResult.feedback.warning;
        } else {
          passwordWarningInfos.innerHTML = "";
        }*/
      } else {
          passwordRequirementLenghtBox.classList = 'text-danger';
          passwordRequirementLenghtIcon.classList = 'bi bi-x-circle';
      }
    } else {
      passwordRequirementLenghtBox.classList = 'text-info-emphasis';
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
  let formButton = document.querySelector(`button[form=${formID}]`);
  formButton.disabled = false;
}

function disable_form_button(formID) {
  let formButton = document.querySelector(`button[form=${formID}]`);
  formButton.disabled = true;
}

function add_alias_input(formID, aliasesList=null) {
  console.log(formID);
  const parentForm = document.getElementById(formID);
  const template = document.querySelector("#alias_input");
  const templateContent = document.importNode(template.content, true);
  const aliasesFieldset = parentForm.querySelector("fieldset[name='aliases']");

  let radiosDiv = templateContent.querySelector("input[name='email_redirect']").closest('div');
  let radioInputGroup = templateContent.querySelectorAll("input[name='email_redirect']");
  let radioTrue = templateContent.querySelector("input[name='email_redirect'][value='true']");
  let radioFalse = templateContent.querySelector("input[name='email_redirect'][value='false']");

  let aliasesSectionFieldset = templateContent.querySelector("fieldset");
  let aliasesInput = templateContent.getElementById('aliases');
  let aliasesStatusBox = templateContent.getElementById('aliases_infos');
  let aliasesTargetList = templateContent.getElementById('targets-list');
  let aliasesTargetFormat = templateContent.getElementById('targets-requirements-format');
  let aliasesTargetCount = templateContent.getElementById('targets-requirements-count');
  switch(formID) {
    case "aliasCreation":
      radiosDiv.remove();
      break;
    case "aliasEdition":
      radiosDiv.remove();
      aliasesInput.value = aliasesList;
      break;
    default:
      /*
       * Chercher si le compte mail ou l'alias a déjà des redirections.
       * Choisir "oui" ou "non" en fonction du résultat,
       * Inscrire la liste des redirections dans le input text et déclencher une vérification du champ.
       */
      if (aliasesList) {
        radioTrue.checked = true;
        radioFalse.checked = false;
        aliasesInput.value = aliasesList;
        aliasesSectionFieldset.classList.toggle('visually-hidden',false);
      } else {
        radioTrue.checked = false;
        radioFalse.checked = true;
        aliasesSectionFieldset.classList.toggle('visually-hidden',true);
      }
  }

  radioInputGroup.forEach(inputRadio => {
    inputRadio.addEventListener('click', () => {
      console.log(inputRadio);
      if (radioTrue.checked === true) {
        aliasesSectionFieldset.classList.toggle('visually-hidden',false);
      }
      if (radioFalse.checked === true) {
        aliasesSectionFieldset.classList.toggle('visually-hidden',true);
      }
    });
  })

  aliasesInput.addEventListener("keyup", debounce(async function(event){
    disable_form_button(formID);
    makeAliasesListFromInputText(formID,aliasesFieldset);
  }, 500));

  aliasesFieldset.appendChild(templateContent);
  if (aliasesList) {
    makeAliasesListFromInputText(formID,aliasesFieldset);
  }
}

function makeAliasesListFromInputText(formID,fieldset) {
      console.log(fieldset);
      const aliasesInput = fieldset.querySelector('#aliases');
      const aliasesInputLabel = fieldset.querySelector('label[for="aliases"]');
      const aliasesTargetList = fieldset.querySelector('#targets-list');
      const aliasesTargetFormat = fieldset.querySelector('#targets-requirements-format');
      
      aliasesTargetList.innerHTML = "";

      if (aliasesInput.value.length > 0) {
        if (aliasesInput.value.length > 3) {
          let aliases = alias_validation(formID);

          if (aliases) {
            if (aliases.length >= 1) {
              aliasesTargetFormat.classList.toggle('visually-hidden', false);
              aliasesInputLabel.innerHTML = `Cible(s) de redirection (${aliases.length}/10)`;
              if (aliases.length > 1) {
                aliasesTargetFormat.classList.toggle('visually-hidden', true);
              }
              if (aliases.length > 10) {
                disable_form_button(formID);
                aliasesInputLabel.innerHTML += ' <i class="bi bi-x-circle text-danger"></i>';
              } else {
                enable_form_button(formID);
                aliases.forEach((alias) => aliasesTargetList.innerHTML += `<div class="text-nowrap overflow-x-hidden"><i class="bi bi-check-circle"> ${alias}</i></div>`);
              }
            } else {
              aliasesTargetFormat.classList.toggle('visually-hidden', true);
            }
          } else {
            aliasesTargetFormat.classList.toggle('visually-hidden', false);

          }
        }
      } else {
        aliasesTargetFormat.classList.toggle('visually-hidden', false);
        aliasesInputLabel.innerText= `Cible(s) de redirection (0/10)`;
      }
}

function make_alias_creation_modal() {
  const formID = "aliasCreation";
  const template = document.querySelector("#alias_creation_modal");
  const modal = document.importNode(template.content, true);

  if (document.getElementById("modalAliasCreation")) {
    document.getElementById("modalAliasCreation").remove();
  }

  document.querySelector('body').append(modal);

  add_username_input(formID);
  add_alias_input(formID);
  
  // Form submission
  const parentForm = document.querySelector(`form#${formID}`);
  const submitButton = document.querySelector(`button[form=${formID}]`);
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(parentForm);
    showLoader('modalAliasCreation');
    add_alias(parentForm);
  });
}
/*
function make_alias_deletion_modal(event) {
  const formID = 'aliasDeletion';
  let emailAddress = event.target.value
  let username = emailAddress.split('@')[0];
  let domain = emailAddress.split('@')[1];
  let modalID = 'modalAliasDeletion';

  const template = document.querySelector("#alias_deletion_modal");
  const modal = document.importNode(template.content, true);       
  modal.querySelector('h2.modal-title').innerText = emailAddress;

  const parentForm = modal.querySelector(`form#${formID}`);
  
  // Soumission du formulaire de suppression de compte mail
  parentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showLoader(modalID);
    delete_alias(parentForm,username,domain);
  });

  document.querySelector('body').append(modal);
  add_deletion_input(formID, "alias");

  return modalID;
}
*/

function add_deletion_input(formID, itemType) {
  console.log(itemType);
  const parentForm = document.getElementById(formID);
  const deletionFieldset = parentForm.querySelector("fieldset[name='deletion']");
  const template = document.querySelector("#deletion_input");
  const templateContent = document.importNode(template.content, true);
 // let deletionType;

  let radioLabel = templateContent.querySelector("label");
  let radioInputGroup = templateContent.querySelectorAll("input[name='email_delete']");
  let radioTrue = templateContent.querySelector("input[name='email_delete'][value='true']");
  let radioFalse = templateContent.querySelector("input[name='email_delete'][value='false']");

  switch(itemType) {
    case "deleteAlias":
      radioLabel.innerText = radioLabel.innerText.replace("_ITEM_","cet alias");
      break;
    default:
      radioLabel.innerText = radioLabel.innerText.replace("_ITEM_","ce compte");
  }

  radioInputGroup.forEach(inputRadio => {
    inputRadio.addEventListener('click', () => {

      if (radioTrue.checked === true) {
        enable_form_button(formID)
      }
      if (radioFalse.checked === true) {
        disable_form_button(formID)
      }
    });
  })

  deletionFieldset.appendChild(templateContent);
}

function add_username_input(formID) {
  const parentForm = document.getElementById(formID);
  const identityFieldset = parentForm.querySelector("fieldset[name='identity']");
  const template = document.querySelector("#username_input");
  const templateContent = document.importNode(template.content, true);
  let usernameType;

  switch(formID) {
    case "email_edition":
      usernameType = "compte e-mail";
      templateContent.querySelector("input[name='username']").placeholder = "Nom d'utilisateur";
      break;
    case "aliasCreation":
      usernameType = "alias";
      templateContent.querySelector("input[name='username']").placeholder = "Nom de l'alias";
      break;
    default:
      console.info(`Formulaire standard : ${formID}`);
      usernameType = "compte e-mail";
      templateContent.querySelector("input[name='username']").placeholder = "Nom d'utilisateur";
  }

  let usernameInput = templateContent.getElementById('username');

  let usernameRequirementLenghtBox = templateContent.querySelector('#username-requirements-lenght');
  let usernameRequirementLenghtIcon = templateContent.querySelector('#username-requirements-lenght i');

  let usernameRequirementAvailableBox = templateContent.querySelector('#username-requirements-available');
  let usernameRequirementAvailableIcon = templateContent.querySelector('#username-requirements-available i');

  let usernameRequirementSpecialCharBox = templateContent.querySelector('#username-requirements-special-chars');
  let usernameRequirementSpecialCharIcon = templateContent.querySelector('#username-requirements-special-chars i');

  usernameInput.addEventListener("keyup", debounce(async function(event){
    disable_form_button(formID);

    usernameRequirementLenghtBox.classList.toggle('visually-hidden', false);
    usernameRequirementSpecialCharBox.classList.toggle('visually-hidden', true);
    usernameRequirementAvailableBox.classList.toggle('visually-hidden', true);

    if (usernameInput.value.length > 0) {
      usernameRequirementLenghtBox.classList = 'text-danger';
      usernameRequirementLenghtIcon.classList = 'bi bi-x-circle';

      if (validateSpecialChars(usernameInput.value)) {
        usernameRequirementSpecialCharBox.classList.toggle('visually-hidden', true);
      } else {
        usernameRequirementSpecialCharBox.classList.toggle('visually-hidden', false);
      }

      if (usernameInput.value.length >= 3 && usernameInput.value.length <= 32) {
      usernameRequirementLenghtBox.classList.toggle('visually-hidden', true);
        if (validateSpecialChars(usernameInput.value)) {
          usernameRequirementSpecialCharBox.classList.toggle('visually-hidden', true);
          try {
            let userExistence = verify_username_existence(document.querySelector(`form#${formID}`));

            if (userExistence.length != 0) {
              if (userExistence[0]['active'] == 1) {
                console.log("Le compte existe déjà");
              }
            } else {
              usernameRequirementAvailableBox.classList.toggle('visually-hidden', false);
              console.log("Le compte n'existe pas");
            }
          } catch {

          }
        } else {
          usernameRequirementSpecialCharBox.classList.toggle('visually-hidden', false);
        }
      }
    } else {
      usernameRequirementLenghtBox.classList = 'text-info-emphasis';
      usernameRequirementLenghtIcon.classList = 'bi bi-info-circle';
      usernameRequirementSpecialCharBox.classList.toggle('visually-hidden', true);
    } 
  }, 500));

  identityFieldset.appendChild(templateContent);
}

function alias_validation(formID) {
  let parentForm = document.getElementById(formID);
  let aliasesFieldset = parentForm.querySelector("fieldset[name='aliases']");
  let aliasesInput = aliasesFieldset.querySelector("input#aliases");
  let aliases = aliasesInput.value.match(/([a-zA-Z0-9._+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})+/g);

  console.log(aliases);

  if (aliases) {
    return aliases;
  } else {
    return false;
  }
}

function verify_username_existence(formID) {
  let formData = new FormData(formID);
  let username = formData.get('username');

  return Email.GlobalList.filter(user => user.username.includes(username));
}

function validateSpecialChars(str) {
  const invalidCharsRegex = /[^a-zA-Z0-9.\-_+]/;
  return !invalidCharsRegex.test(str)
}