function make_login_form() {
  console.info('make_login_form');
    
  const tpl = document.querySelector("template#user_auth_modal");
  const tplSection = document.importNode(tpl.content, true);

  make_user_auth_modal();
  const modalUserAuth = new bootstrap.Modal(document.getElementById('modalUserAuth'));
  modalUserAuth.show();
}

function make_user_auth_modal() {
  const formID = "userAuth";
  const template = document.querySelector("#user_auth_modal");
  const modal = document.importNode(template.content, true);

  if (document.getElementById('modalUserAuth')) {
    document.getElementById('modalUserAuth').remove();
  }

  modal.querySelector('div').id = "modalUserAuth";
  document.querySelector('body').append(modal);
  
  // Form submission
  const parentForm = document.querySelector(`form#${formID}`);
  const submitButton = document.querySelector(`button[form=${formID}]`);
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(parentForm);
    showLoader('modalUserAuth');
    //add_account(parentForm);
  });
}