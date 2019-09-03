"use strict";
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
        targets: bow,
        transform: "translate(0, 0)",
        easing: "cubicBezier(0.075, 0.025, 0.195, 0.985)",
        duration: 1500
      })
    }
    }
  );
});