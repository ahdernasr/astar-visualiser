//GLOBAL VARIABLES
let grid;
startnode = false;
endnode = false;
wallnode = false;
lastStartHoverEl = "";
lastEndHoverEl = "";
resetOnClick = false;
containsStartHover = true;

//CUSTOMIZATION
row = 13;
col = 30;
rateMultiplier = 2;
rate = 30 / rateMultiplier;

function App() {
  createGrid();
}

function calcDistance(x1, y1, x2, y2) {
  distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  return distance;
}

function createGrid() {
  grid = document.createElement("div");
  grid.classList.add("grid");
  document.body.firstElementChild.appendChild(grid);
  for (x = 0; x < col; x++) {
    line = document.createElement("div");
    grid.appendChild(line);
    for (y = 0; y < row; y++) {
      gridEl = document.createElement("div");
      gridEl.classList.add("gridEl");
      gridEl.value = {
        xcoord: x,
        ycoord: y,
        gx: Number.MAX_SAFE_INTEGER,
        hx: 0,
        fx: 0,
      };
      if (x == 0 || y == 0) {
        gridEl.classList.add("edgenode");
      }
      if (y == row - 1 || x == col - 1) {
        gridEl.classList.add("edgenode");
      }
      if (x == 0 && y == 0) {
        gridEl.style.borderRadius = "1rem 0 0 0";
      }
      if (y == row - 1 && x == 0) {
        gridEl.style.borderRadius = "0 0 0 1rem";
      }
      if (y == 0 && x == col - 1) {
        gridEl.style.borderRadius = "0 1rem 0 0";
      }
      if (y == row - 1 && x == col - 1) {
        gridEl.style.borderRadius = "0 0 1rem 0";
      }
      line.appendChild(gridEl);
    }
  }
  grid.addEventListener("mouseenter", () => {
    enterGridHandler();
  });
  grid.addEventListener("mouseleave", () => {
    enterGridHandler();
  });
  return;
}

document.getElementById("reset").addEventListener("click", () => {
  grid.remove();
  createGrid();
});

document.getElementById("startnode").addEventListener("click", () => {
  if (resetOnClick) {
    grid.remove();
    createGrid();
    resetOnClick = false;
  }
  startNode();
});

document.getElementById("endnode").addEventListener("click", () => {
  if (resetOnClick) {
    grid.remove();
    createGrid();
    resetOnClick = false;
  }
  endNode();
});

document.getElementById("wallnode").addEventListener("click", () => {
  if (resetOnClick) {
    grid.remove();
    createGrid();
    resetOnClick = false;
  }
  wallNode();
});

document.getElementById("visualise").addEventListener("click", () => {
  if (resetOnClick) {
    grid.remove();
    createGrid();
    resetOnClick = false;
  }
  visualise();
});

function reset(row, col) {
  grid.remove();
  newGrid = document.createElement("div");
  newGrid.classList.add("grid");
  document.body.firstElementChild.appendChild(newGrid);
  for (x = 0; x < col; x++) {
    line = document.createElement("div");
    newGrid.appendChild(line);
    for (y = 0; y < row; y++) {
      gridEl = document.createElement("div");
      gridEl.classList.add("gridEl");
      gridEl.value = {
        xcoord: x,
        ycoord: y,
        gx: Number.MAX_SAFE_INTEGER,
        hx: 0,
        fx: 0,
      };
      if (x == 0 || y == 0) {
        gridEl.classList.add("edgenode");
      }
      if (y == row - 1 || x == col - 1) {
        gridEl.classList.add("edgenode");
      }
      if (x == 0 && y == 0) {
        gridEl.style.borderRadius = "1rem 0 0 0";
      }
      if (y == row - 1 && x == 0) {
        gridEl.style.borderRadius = "0 0 0 1rem";
      }
      if (y == 0 && x == col - 1) {
        gridEl.style.borderRadius = "0 1rem 0 0";
      }
      if (y == row - 1 && x == col - 1) {
        gridEl.style.borderRadius = "0 0 1rem 0";
      }
      line.appendChild(gridEl);
    }
  }
}

function startNode() {
  if (!startnode) {
    startnode = true;
    endnode = false;
    wallnode = false;
  } else {
    startnode = false;
  }
  if (lastStartHoverEl.firstElementChild) {
    if (lastStartHoverEl.firstElementChild.classList.contains("start")) {
      lastStartHoverEl.removeChild(lastStartHoverEl.firstElementChild);
    }
  }
}

function endNode() {
  if (!endnode) {
    endnode = true;
    startnode = false;
    wallnode = false;
  } else {
    endnode = false;
  }
  if (lastEndHoverEl.firstElementChild) {
    if (lastEndHoverEl.firstElementChild.classList.contains("end")) {
      lastEndHoverEl.removeChild(lastEndHoverEl.firstElementChild);
    }
  }
}

function wallNode() {
  mouseClicked = false;
  if (!wallnode) {
    wallnode = true;
    startnode = false;
    endnode = false;
  } else {
    wallnode = false;
  }
}

function enterGridHandler() {
  gridList = document.getElementsByClassName("gridEl");
  startdiv = document.createElement("div");
  enddiv = document.createElement("div");
  mouseClicked = false;

  if (lastStartHoverEl.firstElementChild) {
    if (lastStartHoverEl.firstElementChild.classList.contains("starthover")) {
      lastStartHoverEl.removeChild(lastStartHoverEl.firstElementChild);
    }
  }
  if (lastEndHoverEl.firstElementChild) {
    if (lastEndHoverEl.firstElementChild.classList.contains("endhover")) {
      lastEndHoverEl.removeChild(lastEndHoverEl.firstElementChild);
    }
  }
  for (g of gridList) {
    g.addEventListener("mouseenter", (event) => {
      if (
        startnode &&
        !event.target.closest(".gridEl").classList.contains("edgenode")
      ) {
        startdiv.classList.add("starthover");
        event.target.closest(".gridEl").appendChild(startdiv);
        lastStartHoverEl = event.target.closest(".gridEl");
      } else if (
        endnode &&
        !event.target.closest(".gridEl").classList.contains("edgenode")
      ) {
        enddiv.classList.add("endhover");
        event.target.closest(".gridEl").appendChild(enddiv);
        lastEndHoverEl = event.target.closest(".gridEl");
      }
    });
    g.addEventListener("click", (event) => {
      if (mouseClicked) {
        mouseClicked = false;
      } else {
        mouseClicked = true;
      }
      if (startnode) {
        startdiv.classList.remove("starthover");
        if (event.target.closest(".gridEl").firstElementChild)
          if (
            event.target
              .closest(".gridEl")
              .firstElementChild.classList.contains("end")
          ) {
            event.target
              .closest(".gridEl")
              .removeChild(event.target.closest(".gridEl").firstElementChild);
          }
        if (event.target.closest(".gridEl").firstElementChild)
          if (
            event.target
              .closest(".gridEl")
              .firstElementChild.classList.contains("wallnode")
          ) {
            event.target
              .closest(".gridEl")
              .removeChild(
                event.target.closest(".gridEl").classList.remove("wallnode")
              );
          }
        event.target.closest(".gridEl").classList.remove("end");
        event.target.closest(".gridEl").classList.remove("wallnode");
        startdiv.classList.add("start");
        event.target.closest(".gridEl").appendChild(startdiv);
        startnode = false;
      } else if (endnode) {
        enddiv.classList.remove("endhover");
        if (event.target.closest(".gridEl").firstElementChild)
          if (
            event.target
              .closest(".gridEl")
              .firstElementChild.classList.contains("start")
          ) {
            event.target
              .closest(".gridEl")
              .removeChild(event.target.closest(".gridEl").firstElementChild);
          }
        if (event.target.closest(".gridEl").firstElementChild)
          if (
            event.target
              .closest(".gridEl")
              .firstElementChild.classList.contains("wallnode")
          ) {
            event.target
              .closest(".gridEl")
              .removeChild(
                event.target.closest(".gridEl").classList.remove("wallnode")
              );
          }
        event.target.closest(".gridEl").classList.remove("start");
        event.target.closest(".gridEl").classList.remove("wallnode");
        startdiv.classList.add("end");
        event.target.closest(".gridEl").appendChild(startdiv);
        endnode = false;
      }
    });
    g.addEventListener("mouseenter", (event) => {
      if (wallnode && mouseClicked) {
        if (event.target.closest(".gridEl").classList.contains("wallnode")) {
          event.target.closest(".gridEl").classList.remove("wallnode");
        } else {
          event.target.closest(".gridEl").classList.add("wallnode");
        }
        if (event.target.closest(".gridEl").firstElementChild)
          if (
            event.target
              .closest(".gridEl")
              .firstElementChild.classList.contains("start") ||
            event.target
              .closest(".gridEl")
              .firstElementChild.classList.contains("end")
          ) {
            event.target
              .closest(".gridEl")
              .removeChild(event.target.closest(".gridEl").firstElementChild);
          }
      }
    });
  }
}

function visualise() {
  startnode = false;
  endnode = false;
  wallnode = false;
  for (g of gridList) {
    if (g.firstElementChild) {
      if (g.firstElementChild.classList.contains("start")) {
        startEl = g;
      }
      if (g.firstElementChild.classList.contains("end")) {
        endEl = g;
      }
    }
  }
  for (g of gridList) {
    g.value.gx = calcDistance(
      g.value.xcoord,
      g.value.ycoord,
      startEl.value.xcoord,
      startEl.value.ycoord
    );
    g.value.hx = calcDistance(
      g.value.xcoord,
      g.value.ycoord,
      endEl.value.xcoord,
      endEl.value.ycoord
    );
    g.value.fx = g.value.hx + g.value.fx;
  }
  startEl.value.gx = 0;
  endEl.value.gx = calcDistance(
    endEl.value.xcoord,
    endEl.value.ycoord,
    startEl.value.xcoord,
    startEl.value.ycoord
  );

  algorithm(startEl, endEl);
}

function findEl(x, y) {
  for (e of gridList) {
    if (e.value.xcoord == x && e.value.ycoord == y) {
      return e;
    }
  }
}

function findLowestFx(arr) {
  lowest = Number.MAX_SAFE_INTEGER;
  corr = "";
  for (a of arr) {
    if (a.value.fx < lowest) {
      lowest = a.value.fx;
      corr = a;
    }
  }
  return corr;
}

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function algorithm(start, end) {
  colormultiplier = 255;
  openList = [];
  closedList = [];
  path = [];
  openList.push(start);
  found = false;
  while (openList[0]) {
    current = findLowestFx(openList);
    openList.remove(current);
    closedList.push(current);
    current.classList.add("explored");
    if (
      current.value.xcoord == end.value.xcoord &&
      current.value.ycoord == end.value.ycoord
    ) {
      start.classList.add("path");
      start.firstElementChild.classList.add("spin");
      setTimeout(() => {
        start.firstElementChild.classList.remove("spin");
      }, 1000);
      end.classList.add("path");
      c = current;
      path = [];
      found = true;
      while (c.value.parent) {
        path.push(c);
        c = c.value.parent;
      }
      for (p of path.reverse()) {
        await sleep(50);
        p.classList.add("path");
      }
      end.firstElementChild.classList.add("spin");
      setTimeout(() => {
        end.firstElementChild.classList.remove("spin");
      }, 1000);
      resetOnClick = true;
      return;
    }
    left = findEl(current.value.xcoord - 1, current.value.ycoord + 0);
    right = findEl(current.value.xcoord + 1, current.value.ycoord + 0);
    bottom = findEl(current.value.xcoord + 0, current.value.ycoord + 1);
    above = findEl(current.value.xcoord + 0, current.value.ycoord - 1);
    // topright = findEl(current.value.xcoord + 1, current.value.ycoord - 1);
    // topleft = findEl(current.value.xcoord - 1, current.value.ycoord - 1);
    // bottomright = findEl(current.value.xcoord + 1, current.value.ycoord + 1);
    // bottomleft = findEl(current.value.xcoord - 1, current.value.ycoord + 1);
    adjacents = [
      left,
      right,
      bottom,
      above,
      // topright,
      // topleft,
      // bottomright,
      // bottomleft,
    ];
    for (a of adjacents) {
      if (
        a.classList.contains("edgenode") ||
        a.classList.contains("wallnode") ||
        closedList.includes(a)
      ) {
        continue;
      }
      best = false;
      gScore = current.value.gx + 1;
      if (!openList.includes(a)) {
        best = true;
        await sleep(rate);
        a.classList.add("explored");
        colormultiplier -= 1;
        openList.push(a);
      } else if (gScore <= a.value.gx) {
        best = true;
      }
      if (best) {
        a.value.parent = current;
        a.value.fx -= a.value.gx;
        a.value.gx = gScore;
        a.value.fx += a.value.gx;
      }
    }
  }
  if (!found) {
    await sleep(50);
    alert("No available paths");
    resetOnClick = true;
    return;
  }
}

App();
