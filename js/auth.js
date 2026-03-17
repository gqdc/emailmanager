// Form submission
const formID = "userAuth";
const parentForm = document.querySelector(`form#${formID}`);
const submitButton = document.querySelector(`button[form=${formID}]`);
/*submitButton.addEventListener("click", (event) => {
	event.preventDefault();
	console.log(parentForm);
	showLoader('modalUserAuth');
	//add_account(parentForm);
});*/
parentForm.addEventListener("submit", (event) => {
	event.preventDefault();
	console.log(parentForm);
	showLoader('modalUserAuth');
	auth_user(parentForm);
});

async function auth_user(form) {
  console.info('auth_user');
  console.log(form);

  const action = "auth_user";
  const formData = new FormData(form);
  console.log(formData);
  
  formData.append("action", action);
  
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
    //const json = await response.json();
    return response;
  } catch (error) {
    console.error('Erreur :', error);
    return null;
  }
}