"use strict";
let svg = document.querySelector("svg");
let path = svg.querySelector("path");

/*anime({
  targets: path,
  d: "M50 100, C75 50, 100 50, 125 100",
  easing: "easeOutQuad",
  duration: 1000,
  loop: true
});*/

class PathCont {
  constructor(elem) {
    this.path = elem;
    this.points = [];
  }
}

class DrawPoints {
  constructor() {
    this.svg = document.querySelector("svg");
    this.paths = new PathCont(document.querySelectorAll("path"));
    this.pathPoints = [];
    this.ppc = [];
    this.paths.forEach(path => { this.path.points.push(path.getAttribute("d")) });
    console.log(this.pathPoints);
    this.getPoints();
  }
  getPoints() {
    this.pathPoints.forEach(points => {
      points = points.split(",");
      console.log(points);
      points.forEach(point=> {
        this.paths
      })
      /*this.ppc.push(points.map(point => {
        console.log(point);
        return point = point.replace(/[^0-9]{0,2}/, "");
      }));*/
    });
    console.log(this.ppc);
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    s.appendChild(circle);
    circle.setAttribute("class", "tmpPoints")
    circle.setAttribute("cx", c1);
    circle.setAttribute("cy", c2);
    circle.setAttribute("r", "3");
    circle.setAttribute("fill", "blue");
  }
  drawPoints() {

  }
}

let dp = new DrawPoints();

/*
function svgPoints() {
  let tmpSvg = document.querySelectorAll("svg");

  tmpSvg.forEach(s => {
    let tmpPath = s.querySelectorAll("path");

    tmpPath.forEach(p => {
      let points = p.getAttribute("d").split(",");

      points.forEach(point => {
        let ptest = point.split(" ");
        let c1, c2 = "";
        if (ptest.length > 2 ) { c1 = pte st[1]; c2 = ptest[2]; }
        else { c1 = ptest[0]; c2 = ptest[1]; }
        c1 = c1.replace(/[^0-9]/g, "");
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        s.appendChild(circle);
        circle.setAttribute("class", "tmpPoints")
        circle.setAttribute("cx", c1);
        circle.setAttribute("cy", c2);
        circle.setAttribute("r", "3");
        circle.setAttribute("fill", "blue");
      });
    });
  });
}

svgPoints();*/
