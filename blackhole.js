var oldStarsBoxShadows;
var oldStars2BoxShadows;
var oldStars3BoxShadows;

var stars;
var stars2;
var stars3;

function moveMouse(event)
{
    if (stars && stars2 && stars3)
    {
        // Apply lens effect to each star container
        // Get the bounding rectangle of the .text-header element
        const rect = stars.getBoundingClientRect();

        // Calculate the mouse position relative to the .text-header element
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        // Apply the lens effect with the correct offset
        applyLensEffect(stars, offsetX, offsetY);
        applyLensEffect(stars2, offsetX, offsetY);
        applyLensEffect(stars3, offsetX, offsetY);
    }
    else
    {
        console.error('One or more star containers are missing.');
    }
}

// Function to calculate the distortion effect based on mouse position
function applyLensEffect(starsElement, px, py)
{
    if (starsElement === document.getElementById("shooting-star"))
    {
        return;
    }
    var boxShadows = getComputedStyle(starsElement).getPropertyValue('box-shadow').split('rgb(255, 255, 255) ');// Get all the box shadows
    if (starsElement === stars && oldStarsBoxShadows !== undefined)
    {
        boxShadows = oldStarsBoxShadows.split('rgb(255, 255, 255) ');
    }
    else if (starsElement === stars2 && oldStars2BoxShadows !== undefined)
    {
        boxShadows = oldStars2BoxShadows.split('rgb(255, 255, 255) ');
    }
    else if (starsElement === stars3 && oldStars3BoxShadows !== undefined)
    {
        boxShadows = oldStars3BoxShadows.split('rgb(255, 255, 255) ');
    }
    else if (starsElement === shootingStar && oldShootingStar !== undefined)
    {
        boxShadows = oldShootingStar.split('rgb(255, 255, 255) ');
        
    }
    // Loop through each shadow (representing a star)
    let newShadows = boxShadows.map(shadow => {
        let s = shadow.split("px");
        let offsetX = Number(s[0]);
        let offsetY = Number(s[1]);

        if (isNaN(offsetX) || isNaN(offsetY)) {
            return `0px 0px #FFF`;
        }

        let x1 = offsetX - px;
        let y1 = offsetY - py;
        let distance = Math.sqrt(x1 * x1 + y1 * y1);
        const rayon = 100;

        if (distance < rayon) {
            let sc = 1 - smootherstep((rayon - distance) / rayon);
            offsetX = Math.floor(px + x1 * sc);
            offsetY = Math.floor(py + y1 * sc);
        }

        return `${offsetX}px ${offsetY}px #FFF`;
    });

    // Update the box-shadow for the element
    let newShadowsString = newShadows.join(', ');
    if (newShadowsString === oldStarsBoxShadows || newShadowsString === oldStars2BoxShadows || newShadowsString === oldStars3BoxShadows) {
        return;
    }
    starsElement.style.boxShadow = newShadowsString;
}

// Smootherstep function for smooth distortion effect
function smootherstep(t) {
    t = Math.max(0, Math.min(1, t)); // Clamp between 0 and 1
    return t * t * (3 - 2 * t); // Faster cubic approximation
}

document.addEventListener('DOMContentLoaded', function ()
{
    stars = document.getElementById('stars');
    stars2 = document.getElementById('stars2');
    stars3 = document.getElementById('stars3');

    oldStarsBoxShadows = getComputedStyle(stars).getPropertyValue('box-shadow');
    oldStars2BoxShadows = getComputedStyle(stars2).getPropertyValue('box-shadow');
    oldStars3BoxShadows = getComputedStyle(stars3).getPropertyValue('box-shadow');
    // Function to listen for mouse movements and apply the distortion
    let animationFrameId = null;
    document.getElementById('text-header').addEventListener('mousemove', (event) => {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(() => {
                moveMouse(event);
                animationFrameId = null; // Reset for the next frame
            });
        }
    });
});