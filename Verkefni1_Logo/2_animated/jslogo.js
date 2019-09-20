"use strict";
/*

? Unused function - it's only a helper function to draw points to visualize better paths

function svgPoints(id) {
  let path = document.getElementById(id);
  let points = path.getAttribute("d").split(",");

  points.forEach(point => {
    let ptest = point.split(" ");
    let c1, c2 = "";
    if (ptest.length > 2 ) { c1 = ptest[1]; c2 = ptest[2]; }
    else { c1 = ptest[0]; c2 = ptest[1]; }
    c1 = c1.replace(/[^0-9]/g, "");
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    path.parentElement.appendChild(circle);
    circle.setAttribute("class", "tmpPoints")
    circle.setAttribute("cx", c1);
    circle.setAttribute("cy", c2);
    circle.setAttribute("r", "3");
    circle.setAttribute("fill", "red");
  });
} */
//svgPoints("bowMiddle");

/*
  * Það vantar örlítið í kóðann til þess að athuga hvenær animation er búið og hvenær það er "leyfilegt"
  * fyrir næsta animation að byrja. Ég tel það vera minniháttar vandamál eins og er og það væri
  * eflaust ekki mikið mál að bæta því við.
*/


// Lítil "hjálpar-aðgerð" til þess að minnka innsláttarvinnu \\
function elById(id) {
  return document.getElementById(id);
}

// Búum til breytur og finnum HTML element-in sem við vinnum með \\ 
let svg = document.querySelector("svg");
let arrowFeathers = elById("arrowFeather");
let arrow = elById("arrow");
let bow = elById("bow");
let bowTop = elById("bowTop");
let bowBottom = elById("bowBottom");
let bowString = elById("bowString");
let instructions = elById("instructions");

// Bætum öllum element-unum í fylki, við notum það seinna í anime.removeAll \\
let svgElements = [arrow, bow, bowTop, bowBottom, bowString, instructions];

let bowDrawFinished = false;

// Bætum við aðferð fyrir anime sem fjarlægir animation frá element-um
// við þurfum að gera það ef við ætlum að stoppa animation áður en það klárast
anime.removeAll = function(elems) {
  this.remove(elems);
}

// Event þegar notandi færir músina yfir myndina \\
svg.addEventListener("mouseenter", function() {
  // Við hvert event þurfum við að passa að textinn passi við það sem er að gerast \\ 
  instructions.innerHTML = "Hold down to draw bow";
  instructions.setAttribute("textLength", "85%");
  
  anime.removeAll(svgElements);

  anime({
  targets: arrow,
  transform: "rotate(20) translate(50, -40) scale(0.8)",
  duration: 200,
  easing: "easeOutQuad",
  });
  anime({
    targets:bow,
    transform: "translate(95, 0)",
    easing: "linear",
    duration: 150
  });
});

// Event þegar músin fer af myndinni, þá færum við alla element-a á upphafsstað \\
svg.addEventListener("mouseleave", function() {

  instructions.innerHTML = "Hover over me!";
  instructions.setAttribute("textLength", "50%");

  anime.removeAll(svgElements);

  anime({
  targets: arrow,
  transform: "rotate(45) translate(70, -160) scale(0.8)",
  duration: 200,
  easing: "easeOutQuad"
  });
  anime({
    targets:bow,
    transform: "translate(70, 0)",
    easing: "linear",
    duration: 150
  });
});

// Event þegar notandi heldur niðri takka á músinni \\
svg.addEventListener("mousedown", function() {

  // Við notum þessa breytu til þess að athuga hvort
  // boginn hafi verið dreginn alveg til baka
  bowDrawFinished = false;

  instructions.innerHTML = "Drawing the bow: 0%";
  instructions.setAttribute("textLength", "85%");

  anime({
    targets: arrow,
    transform: "rotate(0) translate(-73, 10) scale(0.8)",
    duration: 300,
    easing: "easeOutQuad",
    complete: function() {
      anime({
        targets: arrow,
        transform: "rotate(0) translate(-5, 10) scale(0.8)",
        easing: "cubicBezier(0.075, 0.025, 0.195, 0.985)",
        duration: 1500
      });
      anime({
        targets: bow,
        transform: "translate(45, 0)",
        easing: "cubicBezier(0.075, 0.025, 0.195, 0.985)",
        duration: 1500
      });
      anime({
        targets: bowString,
        d: "M140 45, Q142 48, 143 48, L231 170, 145 302, Q144 302, 140 310",
        //d"M100 10, Q114 12, 112 35, 112 170, 112 325, Q112 338, 100 340"
        easing: "cubicBezier(0.075, 0.025, 0.195, 0.985)",
        duration: 1500
      });
      anime({
        targets: bowTop,
        d: "M10 155, C30 85, 100 90, 130 70, C138 65, 150 55, 140 45",
        //d"M10 155, C10 75, 100 70, 110 40, C115 25, 110 10, 100 10"
        easing: "cubicBezier(0.075, 0.025, 0.195, 0.985)",
        duration: 1500
      });
      anime({
        targets: bowBottom,
        d: "M10 195, C30 265, 100 260, 130 280, C138 285, 150 300, 140 310",
        //d"M10 195, C10 275, 100 280, 110 310, C115 325, 110 340, 100 340"
        easing: "cubicBezier(0.075, 0.025, 0.195, 0.985)",
        duration: 1500
      });
      anime({
        targets: bowMiddle,
        translateX: -2,
        d: "M12 155, C10 175, 10 175, 12 195",
        easing: "cubicBezier(0.075, 0.025, 0.195, 0.985)",
        duration: 1500,
        update: function(anim) {
          // Fyrir hvern ramma af animation-inu sem boginn er dreginn uppfærum við textann
          // til þess að sýna hversu nálægt notandi er að boginn sé dreginn alveg til baka.
          instructions.innerHTML = "Drawing the bow: " + Math.round(anim.progress) + "%";
          instructions.setAttribute("textLength", "85%");
        },
        // Þegar þetta animation klárast er boginn dreginn alveg til baka og þá má sleppa takkanum
        complete: function() { bowDrawFinished = true; }
      });
    }
    }
  );
});

// Event þegar notandi sleppir takkanum á músinni \\
svg.addEventListener("mouseup", function() {

  instructions.innerHTML = "Arrow fired!";
  instructions.setAttribute("textLength", "50%");
  anime.remove([arrow, bow, bowString, bowTop, bowBottom, bowMiddle]);

  // Við viljum færa öll elements nema arrow - sem færist eftir því hvort boginn
  // hafi verið dreginn alla leið til baka
  anime({
    targets: bowString,
    d: "M100 10, Q114 12, 112 35, 112 170, 112 325, Q112 338, 100 340",
    easing: "easeInCubic",
    duration: 60
  });
  anime({
    targets: bowTop,
    d: "M10 155, C10 75, 100 70, 110 40, C115 25, 110 10, 100 10",
    easing: "easeInCubic",
    duration: 60
  });
  anime({
    targets: bowBottom,
    d: "M10 195, C10 275, 100 280, 110 310, C115 325, 110 340, 100 340",
    easing: "easeInCubic",
    duration: 60
  });
  anime({
    targets: bowMiddle,
    translateX: 0,
    d: "M10 155, C10 175, 10 175, 10 195",
    easing: "easeInCubic",
    duration: 60
  });
  anime({
    targets: bow,
    delay: 250,
    transform: "translate(95, 0)",
    easing: "easeInSine",
    duration: 700
  });

  // Athugum hvort boginn hafi verið dreginn til baka 
  // og annaðhvort skjótum örinni eða færum örina til baka
  if (bowDrawFinished) {
    anime({
    targets: arrow,
    transform: "rotate(0) translate(-300, 10) scale(0.8)",
    easing: "easeInCubic",
    duration: 70
    });
  } else {
    instructions.innerHTML = "Hold down to draw bow";
    instructions.setAttribute("textLength", "85%");
    anime({
    targets: arrow,
    transform: "rotate(45) translate(70, -160) scale(0.8)",
    easing: "easeInCubic",
    duration: 60
    });
  }
});