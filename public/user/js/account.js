// account controls;
var editprofilecontrol = document.getElementById('editprofilecontrol');
var authenticatecontrol = document.getElementById('authenticatecontrol');

// modals
var authmodal = document.getElementById('authmodal');
var editbiomodal = document.getElementById('editbiomodal')

// modal display;
authenticatecontrol.onclick = () => {
    authmodal.style.display = 'block'
    editbiomodal.style.display = 'none'
    authenticatecontrol.style.backgroundColor = 'blueviolet'
    authenticatecontrol.style.color = 'white'
    editprofilecontrol.style.backgroundColor = 'white'
    editprofilecontrol.style.color = 'black'
}

editprofilecontrol.onclick = () => {
    authmodal.style.display = 'none'
    editbiomodal.style.display = 'block'
    editprofilecontrol.style.backgroundColor = 'blueviolet'
    editprofilecontrol.style.color = 'white'
    authenticatecontrol.style.backgroundColor = 'white'
    authenticatecontrol.style.color = 'black'
}

