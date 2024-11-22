function multipleBoxShadow(n) {
    let value = `${random(window.innerWidth*2)}px ${random(window.innerHeight*2)}px #FFF`;
    for (let i = 2; i <= n; i++) {
        value += `, ${random(window.innerWidth*2)}px ${window.innerHeight - random(window.innerHeight*2)}px #FFF`;
    }
    return value;
}

function shootingBoxShadow() {
    const shootingstar = document.getElementById('shooting-star');
    shootingstar.style.boxShadow = `0px ${random(window.innerHeight)}px #FFF`;
}
  
  // Helper function to generate a random number
function random(max) {
    return Math.floor(Math.random() * max);
}
  
  // Apply the generated shadows to the elements
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.getElementById('stars');
    const stars2 = document.getElementById('stars2');
    const stars3 = document.getElementById('stars3');
  
    // Set the box-shadows for each element
    stars.style.boxShadow = multipleBoxShadow(700);
    stars2.style.boxShadow = multipleBoxShadow(200);
    stars3.style.boxShadow = multipleBoxShadow(100);

    shootingBoxShadow();
    setInterval(shootingBoxShadow, 9900);
});