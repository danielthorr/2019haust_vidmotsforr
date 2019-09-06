"use strict";

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
}
//svgPoints("bowMiddle");

function elById(id) {
  return document.getElementById(id);
}

let svg = document.querySelector("svg");
let arrowFeathers = elById("arrowFeather");
let arrow = elById("arrow");
let bow = elById("bow");
let bowTop = elById("bowTop");
let bowBottom = elById("bowBottom")
let bowString = elById("bowString");

svg.addEventListener("mouseenter", function() {
  anime.remove(arrow);
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

svg.addEventListener("mouseleave", function() {
  anime.remove(arrow);
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

svg.addEventListener("mousedown", function() {
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
        duration: 1500
      });
    }
    }
  );
});