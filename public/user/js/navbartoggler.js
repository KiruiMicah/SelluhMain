        // getting html elements
var menubar = document.getElementById('menubar');
var userDashboardSection = document.getElementById('usersdashboardsection');
var selluhnavbarul = document.getElementById('selluhnavbarul');

// add click events to toggle navbar
menubar.onclick = () => {
    
    selluhnavbarul.style.display = 'flex'
    selluhnavbarul.style.transition = '2s ease-in-out;'
}