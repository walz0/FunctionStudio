var axes = {};
var time = 0;
var scope = {
  x: 0,
  t: 0
}
var tree;
var expr;

var functions = [
  function fun1(x) { return Math.cos(x + time); }, 
];

//60 Frames per second
var interval = setInterval(timedInterval, 16.7);
function timedInterval () {
  time += 0.05;
  draw();
}

function setExpr(newExpr){
  expr = newExpr;
}

function addFunction() {
  setExpr(document.getElementById("input").value);
}

function updateScale() {
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var viewportScale = document.getElementById("scale").value;
  axes.scale = viewportScale;
  draw();
}

function draw() {
  var canvas = document.getElementById("canvas");
  canvas.width = screen.width - 100;
  canvas.height = screen.height - 250;
  if (null == canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  axes.scale = document.getElementById("scale").value;
  axes.x0 = .5 + .5 * canvas.width;  // x0 pixels from left to x=0
  axes.y0 = .5 + .5 * canvas.height; // y0 pixels from top to y=0

  showAxes(ctx, axes);
  plot(ctx, axes, "rgb(139, 233, 253)", 2); 
  //plot(ctx, axes, functions[1], "rgb(241, 121, 198)", 2);
}

function plot (ctx, axes, color, thickness) {
  var xx, //The current 'x' value that is being plotted
  yy, //The current 'y' value that is being plotted
  dx = 2, //The distance 'x' between each point that is plotted
  x0 = axes.x0, //The 'x' value of the origin
  y0 = axes.y0, //The 'y' value of the origin
  scale = axes.scale; //The scale of the viewport

  //The range of x values of which to loop through
  var iMax = Math.round((ctx.canvas.width - x0) / dx);
  var iMin = Math.round(-x0 / dx);

  ctx.beginPath();
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;

  //Plotting and evaluating the function at each point x
  for (var i = iMin; i <= iMax; i++) {
    xx = dx * i;
    yy = scale * evaluateMathExpr(xx / scale);

    if (i == iMin) {
      ctx.moveTo(x0 + xx, y0 - yy);
    }
    else {
      ctx.lineTo(x0 + xx, y0 - yy);
    }
  }
  ctx.stroke();
}

function evaluateMathExpr(mathX) {
  // Set values on the scope visible inside the math expression.
  scope.x = mathX;
  scope.t = time;

  // Evaluate the previously parsed math expression with the
  // new values for 'x' and 't' and return it.
  return math.eval(expr, scope);
}

function showAxes(ctx, axes) {
  var x0 = axes.x0
  var w = ctx.canvas.width;

  var y0 = axes.y0
  var h = ctx.canvas.height;

  var xmin = 0;
  
  ctx.beginPath();
  ctx.strokeStyle = "rgb(128, 128, 128)";

  ctx.moveTo(xmin, y0);
  ctx.lineTo(w, y0);  // X axis

  ctx.moveTo(x0, 0);
  ctx.lineTo(x0, h);  // Y axis

  ctx.stroke();
}