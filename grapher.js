var input = document.getElementById("input");

var axes = {}; 

var functions = [
  function fun1(x) { return Math.sin(x); }, 
  function fun2(x) { return Math.cos(3 * x); }
];

function addFunction() {
  input = document.getElementById("input");
  if(input.value != "")  
  {
    var div = document.createElement("div");
    div.style = "padding-left: 16px; color: azure; display: inline; font-family: Arial";
    var t = document.createTextNode(input.value);
    div.appendChild(t);
    document.body.appendChild(div);
  }
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
  if (null == canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  axes.scale = document.getElementById("scale").value;
  axes.x0 = .5 + .5 * canvas.width;  // x0 pixels from left to x=0
  axes.y0 = .5 + .5 * canvas.height; // y0 pixels from top to y=0
  axes.doNegativeX = true;

  showAxes(ctx, axes);
  plot(ctx, axes, functions[0], "rgb(139, 233, 253)", 2); 
  plot(ctx, axes, functions[1], "rgb(241, 121, 198)", 2);
}

function plot (ctx, axes, func, color, thickness) {
  var xx, //The current 'x' value that is being plotted
  yy, //The current 'y' value that is being plotted
  dx = 0.01, //The distance 'x' between each point that is plotted
  x0 = axes.x0, //The 'x' value of the origin
  y0 = axes.y0, //The 'y' value of the origin
  scale = axes.scale; //The scale of the viewport

  var iMax = Math.round((ctx.canvas.width - x0) / dx);
  var iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;

  ctx.beginPath();
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;

  for (var i = iMin; i <= iMax; i++) {
    xx = dx * i; 
    yy = scale * func(xx / scale);

    if (i == iMin) {
      ctx.moveTo(x0 + xx, y0 - yy);
    }
    else {
      ctx.lineTo(x0 + xx, y0 - yy);
    }           
  }
  ctx.stroke();
}

function showAxes(ctx, axes) {
  var x0 = axes.x0, w = ctx.canvas.width;
  var y0 = axes.y0, h = ctx.canvas.height;
  var xmin = axes.doNegativeX ? 0 : x0;
  
  ctx.beginPath();
  ctx.strokeStyle = "rgb(128, 128, 128)"; 

  ctx.moveTo(xmin, y0); 
  ctx.lineTo(w, y0);  // X axis

  ctx.moveTo(x0, 0);    
  ctx.lineTo(x0, h);  // Y axis

  ctx.stroke();
}