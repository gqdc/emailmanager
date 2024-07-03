async function fetchAccountsList() {
  const formData = new FormData();
  formData.append("action", "get_accounts_list");
  
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
          return account;
        }
      }
    }
  } catch (error) {
    console.error('Erreur :', error);
    return null;
  }
}

/* Set, or unset, a target redirection
 * on an email account.
 * domain str
 * username str
 * target str
 */
async function setRedirection(domain, username, form) {
  console.info('setRedirection');
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
  formData.append("username", username);
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
    //showCheckmark(form.id);
    //disableButton(form.id);
    //make_accounts_section(domain);
    return json;
  } catch (error) {
    //showCrossmark(form.id);
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
      showCheckmark(form.id);
      disableButton(form.id);
      update_accounts_section(domain);
      return json;
    } else {
      console.error('Erreur : ', json.error);
      showCrossmark(form.id);
    }
  } catch (error) {
    showCrossmark(form.id);
    console.error('Erreur : ', error);
    return null
  }
}

async function delete_account(domain, username, form) {
  console.info('delete_account');
  
  const action = "delete_account";
  const formData = new FormData();

  formData.append("action", action);
  formData.append("domainName", domain);
  formData.append("username", username);

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
    update_accounts_section(domain);
    return json;
  } catch (error) {
    showCrossmark(form.id);
    console.error('Erreur : ', error)
    return null
  }
}

function showCheckmark(formId) {
  let statusBox = document.querySelector('form#' + formId +' span.status_box');
  statusBox.innerHTML = "&#10004;";
  statusBox.style.display = 'inline-block';
  statusBox.style.color = '#21DA0C';
}

function disableButton(formId) {
  console.info('disableButton');
  let button = document.querySelector(`form#${formId} button`);
  button.setAttribute('disabled',true);
}

function hideCheckmark(formId) {
  let statusBox = document.querySelector('form#' + formId +' span.status_box');
  statusBox.innerText = "";
  statusBox.innerHTML = "";
  statusBox.style.display = "none";
}

function showCrossmark(formId) {
  let statusBox = document.querySelector('form#' + formId +' span.status_box');
  statusBox.innerHTML = "&#10007;";
  statusBox.style.display = 'inline-block';
  statusBox.style.color = '#df000f';
}

function showLoader(formId) {
  let statusBox = document.querySelector('form#' + formId +' span.status_box');
  statusBox.innerHTML = `<div class="custom-loader"></div>`;
  statusBox.style.display = 'inline-block';
}