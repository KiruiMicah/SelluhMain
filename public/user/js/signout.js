// firebase.auth.onAuthStateChanged((user) => {
    
//     if(user){

        document.getElementById('signoutBtn').onclick = () => {
    // invoke firebase;
    firebase.auth().signOut().then(() => {
        alert('youre are signed out!')

       window.location.href = '/' 
    })
    .catch((error) => {
        console.log(error.message);
    })

}
//     }
//     else {
//         window.location.href = "/index.html"
//     }
// })
