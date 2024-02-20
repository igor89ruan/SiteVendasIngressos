const form = document.getElementById("formLogin")

function validar(e) {
    if (form.checkVisibility() === false) {
        form.classList.add('was-validated');
        e.preventDefault();
        e.stopPropagation();
    } else {
        form.classList.remove( 'was-validated' );
        return true;
    }
}

form.addEventListener( "submit", validar);