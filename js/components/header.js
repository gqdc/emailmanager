function make_header() {
  console.info('make_header');
    
  const tpl = document.querySelector("template#header");
  const tplSection = document.importNode(tpl.content, true);
  
  let navbar = tplSection.querySelector('nav');
  let DomainNameList = navbar.querySelector('select#domain_name_list');
  
  Customer.Ressources.forEach((ressource, key) => {
    if (ressource.domain_name == Email.DomainName) {
      DomainNameList[key] = new Option(ressource.domain_name, ressource.domain_name, true, true);
    }
    else {
      DomainNameList[key] = new Option(ressource.domain_name, ressource.domain_name, false, false);
    }
  });

  document.querySelector('header').append(navbar);

  document.querySelector('select#domain_name_list').addEventListener("change", (event) => {
    document.querySelector('form#domain_name_change').requestSubmit();
  });
}