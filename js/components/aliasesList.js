function make_aliases_section(domain, aliasesList) {
  console.info('make_aliases_section ' + domain);
  
  const tpl = document.querySelector("template#aliases_list");
  const tplSection = document.importNode(tpl.content, true);
  
  const aliasesTable = tplSection.querySelector('table');
  const sectionButton = tplSection.querySelector('button#create_email_alias');
  const sectionHeader = tplSection.querySelector('header');
  const sectionHeaderTitle = sectionHeader.querySelector('h2');
  
  sectionHeaderTitle.innerText = `Liste des aliases de courriels @${domain}`;

  //aliasesTable.classList.add('table', 'table-hover');

  for (const alias of aliasesList) {
    const aliasLine = document.createElement("tr");

    const alias = document.createElement("td");
    const forward = document.createElement("td");
    const quota = document.createElement("td");
    const actions = document.createElement("td");

    alias.textContent = alias.username + "@" + alias.domain;
    forward.textContent = alias.forward_to
    quota.innerHTML = floor10(alias.bytes/1073741824,'-1') + ' Go / ' + alias.quota/1048576 + ' Go<br />' + alias.messages + ' Messages'    ;
    actions.classList.add('w3-center');

    actions.innerHTML = `<button class="btn" name="editAlias" value="${alias.username}@${alias.domain}" >éditer</button> `;
 
    actions.innerHTML += `<button class="btn" name="deleteAlias" value="${alias.username}@${alias.domain}">supprimer</button>`;

    accountLine.appendChild(alias);
    accountLine.appendChild(forward);
    accountLine.appendChild(quota);
    accountLine.appendChild(actions);

    aliasesTable.querySelector("tbody").appendChild(aliasLine);
  }

  document.querySelector('section#aliases').append(sectionHeader, aliasesTable)
  
  let addBtn = document.getElementById('create_alias_account');
  let deleteBtn = document.querySelectorAll('button[name=deleteAlias');
  let editBtn = document.querySelectorAll('button[name=editAlias');

  addBtn.addEventListener('click', () => {
    console.log('addBtn');
    make_alias_creation_modal();
    show_alias_creation_modal();
  })

  deleteBtn.forEach(button => {
    button.addEventListener('click', async (event) => {
    console.log("deleteAlias");
      try {
        console.log(event);
        let make = await make_alias_deletion_modal(event, aliasesList);
        show_alias_deletion_modal(event);
      } catch (e) {
        console.log(e);
      }
    })
  })

  editBtn.forEach(button => {
    button.addEventListener('click', async (event) => {
      try {
        let make = await make_alias_edition_modal(event, aliasesList);
        show_alias_edition_modal(event);
      } catch (e) {
        console.log(e);
      }
    })
  })
}