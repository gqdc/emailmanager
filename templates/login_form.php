<?php //ob_start(); ?>
<div class="row row-cols-4 row-cols-sm-3 justify-content-center">
	<div>
		<div class="card mt-5" id="modalUserAuth">
			<h2 class="card-header bg-primary text-light">Se connecter</h5>
			<div class="card-body mt-3">
				<form id="userAuth">
					<div class="input-group">
						<span class="input-group-text fs-5">Identifiant</span>
						<input type="email" class="form-control fs-5" id="user_login" name="user_login" placeholder="" required>
					</div>
				</form>
				<div class="mt-1 p-2"><i class="bi bi-info-circle"></i> Un lien d'authentification sera envoyé à l'e-mail indiquée.</div>
			</div>
			<div class="card-footer border-0 bg-white d-inline-flex">
				<button type="button" class="btn btn-primary me-2" form="userAuth" name="send_user_authentication">S'authentifier</button>
	      <div class="alert border-0 p-2 my-0">
	        <span class="status-icon" aria-hidden="true"></span>
	        <span class="status-text" aria-hidden="true"></span>
	      </div>
			</div>
		</div>
	</div>
</div>
<?php 
  //$content = ob_get_clean(); 
  //echo $content;
?>