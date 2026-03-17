async function fetchAccountsList() {
  const formData = new FormData();
  formData.append("action", "get_accounts_list");
  formData.append('domainName', Email.DomainName);
  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Erreur :', error);
    return null;
  }
}

async function fetchAliasesList() {
  const formData = new FormData();
  formData.append("action", "get_aliases_list");
  formData.append("domainName", Email.DomainName);
  console.log(formData);
  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Erreur :', error);
    return null;
  }
}

async function fetchAccountInformations(domain, username) {
  try {
    const accountsList = await fetchAccountsList(domain)

    if (accountsList) {
      for (const account of accountsList) {
        if (account.username === username && account.domain === domain) {
          account.forward_to = account.forward_to.split(`,${username}@${domain}`).join('');
          return account;
        }
      }
    }
  } catch (error) {
    console.error('Erreur :', error);
    return null;
  }
}

async function fetchItemInformations(domain, username, itemType='email') {
  let itemsList = '';
  try {
    switch(itemType) {
      case "alias":
        console.info('Fetch aliases list of ' + Email.DomainName)
        itemsList = await fetchAliasesList(domain);
        break;
      default:
        console.info('Fetch accounts list of ' + Email.DomainName)
        itemsList = await fetchAccountsList(Email.DomainName);
    }
    
    if (itemsList) {
      for (let item of itemsList) {
        if (item.username === username && item.domain === domain) {
          item.forward_to = item.forward_to.split(`,${username}@${domain}`).join('');
          return item;
        }
      }
    }
  } catch (error) {
    console.error('Erreur :', error);
    return null;
  }
}

async function change_domain(form) {
  console.info('change_domain');
  console.log(form);
  const action = "change_domain";
  const formData = new FormData(form);

  formData.append("action", action);
  formData.append("domainName", domain);

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 0.4 secondes
  await delay(0.4 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Erreur : ', error)
    return null
  }
}
/* Set, or unset, a target redirection
 * on an email account.
 * domain str
 * username str
 * target str
 */
async function set_account_redirection(form) {
  console.info('set_account_redirection');
  console.log(form);

  const action = "set_account_redirection";
  const formData = new FormData(form);
  console.log(formData);
  let target = null;

  if (formData.get('email_redirect') === "true" ) {
    target = formData.get('redirectTarget');
  }

  formData.append("action", action);
  formData.append("domainName", domain);
  //formData.append("username", username);
  formData.append("target", target);

  formData.delete("email_redirect");
  formData.delete("redirectTarget");
  console.log(formData);

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 2 secondes
  await delay(0.4 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
    showCheckmark(form.id);
    disableButton(form.id);
    refreshAccountInformations(domain, username, action);
    return json;
  } catch (error) {
    showCrossmark(form.id);
    console.error('Erreur : ', error)
    return null
  }
}

/* Set e-mail password.
 * domain str
 * username str
 * password str
 */
async function setPassword(domain, username, form) {
  console.info('setPassword');
  console.log(form);
  
  const action = "set_account_password";
  const formData = new FormData(form);
  
  let password = formData.get('password');

  formData.append("action", action);
  formData.append("domainName", domain);
  formData.append("username", username);
  formData.append("password", password);

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 2 secondes
  await delay(0.4 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
    showCheckmark(form.id);
    disableButton(form.id);
    refreshAccountInformations(domain, username, action);
    return json;
  } catch (error) {
    showCrossmark(form.id);
    console.error('Erreur : ', error)
    return null
  }
}

async function get_account_informations(form) {
  console.info('get_account_informations');

  const action = "get_account_informations";
  const formData = new FormData(form);

  formData.append("action", action);
  formData.append("domainName", domain);
  formData.delete("password");
  formData.delete("aliases");

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 0.4 secondes
  await delay(0.4 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Erreur : ', error)
    return null
  }
}

async function get_alias_informations(form) {
  console.info('get_alias_informations');

  const action = "get_alias_informations";
  const formData = new FormData(form);
  const username = formData.get("aliasname");

  formData.append("action", action);
  formData.append("domainName", domain);
  formData.append("username", username);

  formData.delete("aliasname");

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 0.4 secondes
  await delay(0.4 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Erreur : ', error)
    return null
  }
}

async function add_account(form) {
  console.info('add_account');
  
  const action = "add_account";
  const formData = new FormData(form);

  formData.append("action", action);
  formData.append("domainName", domain);

  if (formData.get('email_redirect') === "false") {
    target = formData.delete('aliases');
    aliases = '';
  } else {
    aliases = formData.get('email_redirect');
  }

  if (typeof formData.get('quota') !== "undefined") {
    quota = formData.get('quota');
  } else {
    quota = null;
  }

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });
  console.log(formData);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 2 secondes
  await delay(1 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
        
    if (json.success == 'true') {
      Email.AccountsList.push({"username": formData.get('username'), "domain": domain, "forward_to": aliases, "quota": quota, "active": 1, "bytes": 0,  "messages": 0});
      Email.AccountsList.sort((a, b) => {
        if (a.username < b.username) { return -1; }
        if (a.username > b.username ) { return 1; }

        return 0;
      });
      showCheckmark("modalEmailCreation");
      disableButton(form.id);

      update_accounts_section(domain,Email.AccountsList);
      await delay(1.5 * 1000);
      bootstrap.Modal.getInstance('#modalEmailCreation').hide();
      return json;
    } else {
      console.error('Erreur : ', json.error);
      showCrossmark("modalEmailCreation", json.error);
    }
  } catch (error) {
    showCrossmark("modalEmailCreation", error);
    console.error('Erreur : ', error);
    return null
  }
}

async function edit_account(form,username,domainName) {
  console.info('edit_account');
  
  const action = "edit_account";
  const formData = new FormData(form);

  formData.append("action", action);
  formData.append("domainName", domainName);
  formData.append("username", username);

  if (formData.get('password') === '') {
    formData.delete('password');
  }

  if (formData.get('email_redirect') === "false") {
    formData.delete("aliases");
    aliases = '';
  } else {
    aliases = formData.get('aliases');
  }

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });
  console.log(formData);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 2 secondes
  await delay(1 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
        
    if (json.success == true) {
      let accountIndex = Email.AccountsList.findIndex(list => list.username === username);
      Email.AccountsList[accountIndex].forward_to = aliases;
      showCheckmark("modalEmailEdition");
      disableButton(form.id);
      update_accounts_section(domainName, Email.AccountsList);

      await delay(1.5 * 1000);
      bootstrap.Modal.getInstance('#modalEmailEdition').hide();

      return json;
    } else {
      console.error('Erreur : ', json.error);
      showCrossmark("modalEmailEdition");
    }
  } catch (error) {
    showCrossmark("modalEmailEdition");
    console.error('Erreur2 : ', error);
    return null
  }
}

async function delete_account(form,username,domainName,itemType) {
  console.info('delete_item ' + itemType + ' ' + username + '@' + domainName);
  
  const action = "delete_account";
  const formData = new FormData(form);

  formData.append("action", action);
  formData.append("username", username);
  formData.append("domainName", domainName);

  console.log(formData);

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 2 secondes
  await delay(1 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
    

    switch(itemType) {
      case "deleteAlias":
        let aliasIndex = Email.AliasesList.findIndex(list => list.username === username);
        Email.AliasesList.splice(aliasIndex, 1);
        update_aliases_section(domain,Email.AliasesList);
        break;
      default:
        let accountIndex = Email.AccountsList.findIndex(list => list.username === username);
        Email.AccountsList.splice(accountIndex, 1);
        update_accounts_section(domain,Email.AccountsList);
    }

    showCheckmark('modalEmailDeletion');
    disableButton(form.id);

    await delay(1.5 * 1000);
    bootstrap.Modal.getInstance('#modalEmailDeletion').hide();

    return json;
  } catch (error) {
    showCrossmark('modalEmailDeletion');
    console.error('Erreur : ', error)
    return null
  }
}

async function add_alias(form) {
  console.info('add_alias');
  
  const action = "add_alias";
  const formData = new FormData(form);

  formData.append("action", action);
  formData.append("domainName", domain);

  console.log(formData);

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 2 secondes
  await delay(0.4 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
        
    if (json.success == 'true') {
      Email.AliasesList.push({"username": formData.get('username'), "domain": domain, "forward_to": formData.get('aliases')});
      Email.AliasesList.sort((a, b) => {
        if (a.username < b.username) { return -1; }
        if (a.username > b.username ) { return 1; }

        return 0;
      });
      showCheckmark("modalAliasCreation");
      disableButton(form.id);
      update_aliases_section(domain, Email.AliasesList);

      await delay(1.5 * 1000);
      bootstrap.Modal.getInstance('#modalAliasCreation').hide();

      return json;
    } else {
      console.error('Erreur : ', json.error);
      showCrossmark("modalAliasCreation", json.error);
    }
  } catch (error) {
    console.error('Erreur : ', error);
    showCrossmark("modalAliasCreation", error);
    return null
  }
}

async function delete_alias(form,username,domainName) {
  console.info('delete_alias');
  
  const action = "delete_alias";
  const formData = new FormData(form);

  formData.append("action", action);
  formData.append("username", username);
  formData.append("domainName", domainName);

  console.log(formData);

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 2 secondes
  await delay(1 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
    let aliastIndex = Email.AliasesList.findIndex(list => list.username === username);
    Email.AliasesList.splice(aliastIndex, 1);

    showCheckmark('modalAliasDeletion');
    disableButton(form.id);

    update_accounts_section(domain,Email.AliasesList);

    await delay(1.5 * 1000);
    bootstrap.Modal.getInstance('#modalAliasDeletion').hide();

    return json;
  } catch (error) {
    showCrossmark('modalAliasDeletion');
    console.error('Erreur : ', error)
    return null
  }
}

async function edit_alias(form,username,domainName) {
  console.info('edit_alias');
  
  const action = "edit_alias";
  const formData = new FormData(form);

  formData.append("action", action);
  formData.append("domainName", domainName);
  formData.append("username", username);

  let aliases = formData.get('aliases');

  const requestURL = '/emailmanager/';
  const request = new Request(requestURL, {
    method: "POST",
    body: formData,
  });
  console.log(formData);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Montrer l'icône de chargement et temporiser 2 secondes
  await delay(1 * 1000);

  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const json = await response.json();
        
    if (json.success == 'true') {
      let aliasIndex = Email.AliasesList.findIndex(list => list.username === username);
      Email.AliasesList[aliasIndex].forward_to = aliases;
      showCheckmark("modalAliasEdition");
      disableButton(form.id);
      update_aliases_section(domainName, Email.AliasesList);

      await delay(1.5 * 1000);
      bootstrap.Modal.getInstance('#modalAliasEdition').hide();

      return json;
    } else {
      console.error('Erreur : ', json.error);
      console.error('Erreur : ', json);
      showCrossmark("modalAliasEdition");
    }
  } catch (error) {
    showCrossmark("modalAliasEdition");
    console.error('Erreur2 : ', error);
    return null
  }
}

function remove_status_icon(modalID) {
  console.info('remove_status_icon ' + modalID);
  // document.querySelector(`div#${modalID} div.modal-footer div.alert`).classList = "alert border-0 p-2 my-0 visually-hidden";
  // document.querySelector(`div#${modalID} div.modal-footer div.alert span.status-icon`).classList = "status-icon";
  // document.querySelector(`div#${modalID} div.modal-footer div.alert span.status-text`).classList = "status-text";
  // document.querySelector(`div#${modalID} div.modal-footer div.alert span.status-text`).innerText = "";

  document.querySelector(`div#${modalID} div.alert`).classList = "alert border-0 p-2 my-0 visually-hidden";
  document.querySelector(`div#${modalID} div.alert span.status-icon`).classList = "status-icon";
  document.querySelector(`div#${modalID} div.alert span.status-text`).classList = "status-text";
  document.querySelector(`div#${modalID} div.alert span.status-text`).innerText = "";
}

function showCheckmark(modalID) {
  console.info('showCheckmark ' + modalID);

  //let statusBox = document.querySelector(`div#${modalID} div.modal-footer div.alert`);
  //let statusIcon = document.querySelector(`div#${modalID} div.modal-footer div.alert span.status-icon`);
  //let statusText = document.querySelector(`div#${modalID} div.modal-footer div.alert span.status-text`);
  
  let statusBox = document.querySelector(`div#${modalID} div.alert`);
  let statusIcon = document.querySelector(`div#${modalID} div.alert span.status-icon`);
  let statusText = document.querySelector(`div#${modalID} div.alert span.status-text`);

  remove_status_icon(modalID);

  statusBox.classList.toggle('visually-hidden', false);
  statusBox.classList.add('alert-success');

  statusIcon.classList.add('bi','bi-check-circle');

  statusText.innerText = " Succès";
}

function showCrossmark(modalID, message=null) {
  console.info('showCrossmark');
  
  //let statusBox = document.querySelector(`div#${modalID} div.modal-footer div.alert`);
  //let statusIcon = document.querySelector(`div#${modalID} div.modal-footer div.alert span.status-icon`);
  //let statusText = document.querySelector(`div#${modalID} div.modal-footer div.alert span.status-text`);
  let statusBox = document.querySelector(`div#${modalID} div.alert`);
  let statusIcon = document.querySelector(`div#${modalID} div.alert span.status-icon`);
  let statusText = document.querySelector(`div#${modalID} div.alert span.status-text`);

  remove_status_icon(modalID);

  statusBox.classList.toggle('visually-hidden', false);
  statusBox.classList.add('alert-danger');

  statusIcon.classList.add('bi','bi-exclamation-triangle');
  statusText.innerText = " Échec";
  if (message) {
    statusText.innerText += ' : ' + message;
  }
}

function showLoader(modalID) {
  console.info('showLoader ' + modalID);

  //let statusBox = document.querySelector(`div#${modalID} div.modal-footer div.alert`);
  //let statusIcon = document.querySelector(`div#${modalID} div.modal-footer div.alert span.status-icon`);
  //let statusText = document.querySelector(`div#${modalID} div.modal-footer div.alert span.status-text`);

  let statusBox = document.querySelector(`div#${modalID} div.alert`);
  let statusIcon = document.querySelector(`div#${modalID} div.alert span.status-icon`);
  let statusText = document.querySelector(`div#${modalID} div.alert span.status-text`);

  remove_status_icon(modalID);

  statusBox.classList.toggle('visually-hidden', false);
  statusBox.classList.add('alert-primary');

  statusIcon.classList.add('spinner-border','spinner-border-sm');

  statusText.innerText = " Veuillez patienter";
}

function disableButton(formID) {
  console.info('disableButton');

  let button = document.querySelector(`button[form=${formID}]`);
  button.setAttribute('disabled',true);
}