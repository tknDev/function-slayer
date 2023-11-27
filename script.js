
const svgns = "http://www.w3.org/2000/svg";
const width = document.getElementById("coordinate_system").getAttribute("width");
const height = document.getElementById("coordinate_system").getAttribute("height");

// AudioElement erzeugen
const targetHitSound = new Audio('Sound/OsuHitSound.wav');
const obstacleHitSound = new Audio('Sound/Impact.wav');
// Sobald der Sound geladen ist, ihn mit dem AudioContext verbinden
targetHitSound.addEventListener('loadeddata', () => {
  // AudioContext erstellen oder fortsetzen in Reaktion auf eine Benutzeraktion
    document.body.addEventListener('click', function init() {
    document.body.removeEventListener('click', init);
    let audioCtx = new AudioContext();
    // AudioNode aus dem AudioElement erzeugen
    const source = audioCtx.createMediaElementSource(targetHitSound);
    // Node mit Lautstärke verbinden
    const gainNode = audioCtx.createGain();
    // AudioNode mit Destination verbinden um abzuspielen
    source.connect(gainNode).connect(audioCtx.destination);
    });
});

obstacleHitSound.addEventListener('loadeddata', () => {
    // AudioContext erstellen oder fortsetzen in Reaktion auf eine Benutzeraktion
    document.body.addEventListener('click', function init() {
    document.body.removeEventListener('click', init);
    let audioCtx = new AudioContext();
    // AudioNode aus dem AudioElement erzeugen
    const source = audioCtx.createMediaElementSource(obstacleHitSound);
    // Node mit Lautstärke verbinden
    const gainNode = audioCtx.createGain();
    // AudioNode mit Destination verbinden um abzuspielen
    source.connect(gainNode).connect(audioCtx.destination);
    });
});

function createGrid(svgElement, gridSize, gridColor, stroke_width){
    const realGridColor = gridColor;
    const svg = document.getElementById(svgElement);
    // Vertikale Linien
    for (let x = gridSize; x < width; x += gridSize) {
        const lineY = document.createElementNS(svgns, "line");
        lineY.setAttribute("x1", x);
        lineY.setAttribute("y1", 0);
        lineY.setAttribute("x2", x);
        lineY.setAttribute("y2", height);
        //! Verändert abwechselnd die Dicke der Grids
        if(x % 2 != 0){
            stroke_width=stroke_width-0.1;
            gridColor = realGridColor;
        }
        else{
            stroke_width=stroke_width+0.1;
            gridColor = "#b9b9b9";
        }
        lineY.setAttribute("stroke", gridColor);
        lineY.setAttribute("stroke-width", stroke_width);
        svg.appendChild(lineY);
        svg.insertBefore(lineY, svg.firstChild);
    }
    stroke_width = stroke_width+0.1

    // Horizontale Linien
    for (let y = gridSize; y < height; y += gridSize) {
        const lineX = document.createElementNS(svgns, "line");
        lineX.setAttribute("x1", 0);
        lineX.setAttribute("y1", y);
        lineX.setAttribute("x2", width);
        lineX.setAttribute("y2", y);
        //! Verändert abwechselnd die Dicke der Grids
        if(y % 2 != 0){
            stroke_width=stroke_width-0.1;
            gridColor = realGridColor;
        }
        else{
            stroke_width=stroke_width+0.1;
            gridColor = "#b9b9b9";
        }
        lineX.setAttribute("stroke", gridColor);
        lineX.setAttribute("stroke-width", stroke_width);
        svg.appendChild(lineX);
        svg.insertBefore(lineX, svg.firstChild);
    }
}

function createAxis(svgElement, axisThickness){
    const svg = document.getElementById(svgElement);
    const lineX = document.createElementNS(svgns, "line");

    //x-Achse
    lineX.setAttribute("id", "xAxis");
    lineX.setAttribute("x1", 10);
    lineX.setAttribute("y1", 250);
    lineX.setAttribute("x2", width*0.98);
    lineX.setAttribute("y2", 250);
    lineX.setAttribute("stroke", "#231F20");
    lineX.setAttribute("stroke-width", axisThickness);
    lineX.setAttribute("stroke-linecap", "round");
    lineX.setAttribute("marker-end", "url(#arrow)");
    svg.appendChild(lineX);

    //y-Achse
    const lineY = document.createElementNS(svgns, "line");
    lineY.setAttribute("id", "yAxis");
    lineY.setAttribute("x1", 250);
    lineY.setAttribute("y1", 10);
    lineY.setAttribute("x2", 250);
    lineY.setAttribute("y2", height*0.98);
    lineY.setAttribute("stroke", "#231F20");
    lineY.setAttribute("stroke-width", axisThickness);
    lineY.setAttribute("stroke-linecap", "round");
    lineY.setAttribute("marker-start", "url(#arrow)");
    svg.appendChild(lineY);
}

function createAxisLabels(svgElement, axisStrokeThickness){
    const svg = document.getElementById(svgElement);

    //Striche auf der X-Achse
    for(let i = 0; i <= (width/50)-2; i++){
        const strokeX = document.createElementNS(svgns, "line");
        strokeX.setAttribute("x1", 50 + i * 50);
        strokeX.setAttribute("x2", 50 + i * 50);
        strokeX.setAttribute("y1", 245);
        strokeX.setAttribute("y2", 255);
        strokeX.setAttribute("stroke", "black");
        strokeX.setAttribute("stroke-width", axisStrokeThickness);
        strokeX.setAttribute("stroke-linecap", "round");
        svg.appendChild(strokeX);
    }

    //Striche auf der Y-Achse
    for(let i = 0; i <= (height/50)-2; i++){
        const strokeY = document.createElementNS(svgns, "line");
        strokeY.setAttribute("x1", 245);
        strokeY.setAttribute("x2", 255);
        strokeY.setAttribute("y1", 50 + i * 50);
        strokeY.setAttribute("y2", 50 + i * 50);
        strokeY.setAttribute("stroke", "black");
        strokeY.setAttribute("stroke-width", axisStrokeThickness);
        strokeY.setAttribute("stroke-linecap", "round");
        svg.appendChild(strokeY);
    }
}

function createAxisNumbers(svgElement, font_size, font_family){
    const svg = document.getElementById(svgElement);
    const zero = document.createElementNS(svgns, "text");
    zero.setAttribute("id", "numZero")
    zero.setAttribute("x", 243);
    zero.setAttribute("y", 268.5);
    zero.setAttribute("font-size", font_size);
    zero.setAttribute("font-family", font_family)
    zero.setAttribute("text-anchor", "end");
    zero.textContent = 0;
    svg.appendChild(zero);

    // Beschriftungen für die X-Achse
    for (let i = 0; i <= (width/100)-1; i++) {
        const label = document.createElementNS(svgns, "text");
        label.setAttribute("x", 55 + i * 100);
        label.setAttribute("y", 272);
        label.setAttribute("font-size", font_size);
        label.setAttribute("font-family", font_family)
        label.setAttribute("text-anchor", "end");
        if(2-i != 0){
            label.textContent = -4 + 2*i;
        }
        svg.appendChild(label);
    }

    const xLabel = document.createElementNS(svgns, "text");
    xLabel.setAttribute("x", width*0.98);
    xLabel.setAttribute("y", 272);
    xLabel.setAttribute("font-size", font_size*0.9);
    xLabel.setAttribute("font-family", font_family);
    xLabel.setAttribute("text-anchor", "end");
    xLabel.setAttribute("fill", "#666666");
    xLabel.textContent = "x";
    svg.appendChild(xLabel);

    const yLabel = document.createElementNS(svgns, "text");
    yLabel.setAttribute("x", 242);
    yLabel.setAttribute("y", 20);
    yLabel.setAttribute("font-size", font_size*0.9);
    yLabel.setAttribute("font-family", font_family);
    yLabel.setAttribute("text-anchor", "end");
    yLabel.setAttribute("fill", "#666666");
    yLabel.textContent = "f(x)";
    svg.appendChild(yLabel);

    // Beschriftungen für die Y-Achse
    for (let i = 0; i <= (height/100)-1; i++) {
        const label = document.createElementNS(svgns, "text");
        label.setAttribute("x", 242);
        label.setAttribute("y", 55 + i * 100);
        label.setAttribute("font-size", font_size);
        label.setAttribute("font-family", font_family)
        label.setAttribute("text-anchor", "end");
        if(2-i != 0){
            label.textContent = 4 - 2*i;
        }
        svg.appendChild(label);
    }
}

function createPlayer(svgElement, posX, posY){
    const svg = document.getElementById(svgElement);

    const playerC = document.createElementNS(svgns, "circle");
    playerC.setAttribute("id", "playerC");
    playerC.setAttribute("cx", posX);
    playerC.setAttribute("cy", posY);
    playerC.setAttribute("r", "11.5");
    playerC.setAttribute("fill", "#45c46f");
    playerC.setAttribute("fill-opacity", "0.3");
    playerC.setAttribute("stroke", "#32c763");
    playerC.setAttribute("stroke-width", "2");

    const playerD = document.createElementNS(svgns, "circle");
    playerD.setAttribute("id", "playerD");
    playerD.setAttribute("cx", posX);
    playerD.setAttribute("cy", posY);
    playerD.setAttribute("r", "2");
    playerD.setAttribute("fill", "#32c763");

    // Fügen Sie Ihr SVG-Element zum Container hinzu
    svg.appendChild(playerC);
    svg.appendChild(playerD);
    const referenceElement = document.getElementById("numZero");
    const playerCId = document.getElementById("playerC");
    const playerDId = document.getElementById("playerD");
    svg.insertBefore(playerCId,referenceElement);
    svg.insertBefore(playerDId,referenceElement);
}

function createTargetRect(svgElement, posX, posY, color, width, height){
    const svg = document.getElementById(svgElement);
    const targetR = document.createElementNS(svgns, "rect");
    targetR.setAttribute("id", "targetRect");
    targetR.setAttribute("x", posX+2);
    targetR.setAttribute("y", posY+2);
    targetR.setAttribute("width", width-4);
    targetR.setAttribute("height", height-4);
    targetR.setAttribute("fill", color);
    targetR.setAttribute("fill-opacity", "0.3");
    targetR.setAttribute("stroke", color);
    targetR.setAttribute("stroke-width", "2.1");
    svg.appendChild(targetR);
}

function createTargetDot(svgElement, posX, posY, radius, color){
    const svg = document.getElementById(svgElement);
    const targetD = document.createElementNS(svgns, "circle");
    targetD.setAttribute("id", "targetDot");
    targetD.setAttribute("cx", posX);
    targetD.setAttribute("cy", posY);
    targetD.setAttribute("r", radius);
    targetD.setAttribute("fill", color);
    svg.appendChild(targetD);
}

function createObstacle(svgElement, posX, posY, width, height){
    const svg = document.getElementById(svgElement);
    const obstacleRect = document.createElementNS(svgns, "rect");
    obstacleRect.setAttribute("id", "obstacleId");
    obstacleRect.setAttribute("x", posX);
    obstacleRect.setAttribute("y", posY);
    obstacleRect.setAttribute("width", width);
    obstacleRect.setAttribute("height", height);
    obstacleRect.setAttribute("fill", "#F5B700");
    obstacleRect.setAttribute("fill-opacity", "0.4");
    obstacleRect.setAttribute("stroke", "#F5B700"); //#F5B700, #FF7D31
    obstacleRect.setAttribute("stroke-width", "2");
    svg.appendChild(obstacleRect);
    const referenceElement = document.getElementById("numZero");
    const obstacleId = document.getElementById("obstacleId");
    svg.insertBefore(obstacleId,referenceElement);

    const obstacleLine = document.createElementNS(svgns, "line");
    obstacleLine.setAttribute("id", "obstacleLineId");
    obstacleLine.setAttribute("x1", posX);
    obstacleLine.setAttribute("y1", posY+height);
    obstacleLine.setAttribute("x2", posX+width);
    obstacleLine.setAttribute("y2", posY);
    obstacleLine.setAttribute("stroke", "#F5B700"); //#F5B700, #FF7D31
    obstacleLine.setAttribute("stroke-width", "2");
    svg.appendChild(obstacleLine);
    const obstacleLineId = document.getElementById("obstacleLineId");
    svg.insertBefore(obstacleLineId,referenceElement);
}

function createHitText(svgElement, posX, posY, text, color, fontSize){
    const svg = document.getElementById(svgElement);
    const targetHT = document.createElementNS(svgns, "text");
    targetHT.setAttribute("id", "targetHitText");
    targetHT.setAttribute("x", posX);
    targetHT.setAttribute("y", posY);
    targetHT.setAttribute("font-size", fontSize);
    targetHT.setAttribute("font-family", "'Inclusive Sans', sans-serif");
    //targetHT.setAttribute("style", "font-weight:bold;");
    targetHT.setAttribute("text-anchor", "middle");
    targetHT.setAttribute("fill", color);
    targetHT.textContent = text; 
    svg.appendChild(targetHT);
    targetHT.classList.add('burstAnimation2');
    targetHT.addEventListener('animationend', () => {
        targetHT.remove();
    });
}

function drawPoints(coordinates){
    const pointsGroup = svgGraph.append("g");
    pointsGroup
        .selectAll("circle")
        .data(coordinates)
        .enter()
        .append("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
      .attr("r", 1.25) // Radius der Punkte
      .attr("fill", "red"); // Farbe der Punkte
}

function toggleOnOff(){
    isOn = !isOn;
}

const svgGraph = d3.select("#coordinate_system"); // d3.select für die SVG-Auswahl
const lineGroup = svgGraph.append("g"); // Leere Gruppe für die Linie
const minX = -5;
const maxX = 5;
const minY = -5;
const maxY = 5;
let step = 0.02;
let animationSpeed = 10;
let xCoord = 0;
let isOn = false;
let isDrawing = false;

const xScale = d3.scaleLinear()
    .domain([minX, maxX])
    .range([0, 500]);
const yScale = d3.scaleLinear()
    .domain([minY, maxY])
    .range([500, 0]);

const pathGenerator = d3.line()
.x(d => (d.x))
.y(d => (d.y));

function changeGraphLength(){
    let lenght;
    if (isOn) {
        lenght = -5 - ((playerTopLeftPosX - 250) / 50);
    } else {
        lenght = 0;
    }
    return lenght;
}

let interval
function generateCoordinates(func){
    const coordinates = [];
    const alphaCoordinates = [];
    //! falls ich den gesamten Graphen sehen will, dann muss ich nur 'x = -5-((playerTopLeftPosX -250)/50)' eingeben und von mir aus 'x = 0'.
    xCoord = changeGraphLength();
    let ll = 10.01-(playerTopLeftPosX/50);
    interval = d3.interval(function () {
        if(xCoord <= ll){
            const y = func(xCoord);
            isDrawing = true;
            coordinates.push({x: xScale(xCoord + ((playerTopLeftPosX -250) / 50)), y: yScale(y - ((playerTopLeftPosY -250) / 50))});
            alphaCoordinates.push({x: (xCoord+((playerTopLeftPosX -250)/50)), y: (y-((playerTopLeftPosY -250)/50))});
            let pixelY = yScale(y - ((playerTopLeftPosY -250) / 50));
            if(isLinearFunction && pixelY>0 && pixelY<510){
                let f1 = func(xCoord+1e-5);
                let f2 = func(xCoord-1e-5);
                let derivative = (f2 - f1) / (2 * 1e-5);
                xCoord += 1/(11+Math.abs(14*derivative));
            }
            else{
                step = calculateStep(xCoord);
                xCoord += step;
            }
            updateLine(coordinates);
            checkTargetHit();
            checkObstacleHit();
            //drawPoints(coordinates); //! Punkte zeichnen
        } 
        else{
            interval.stop(); // Animation beenden, wenn x den maximalen Wert erreicht
            isDrawing = false;
            document.getElementById("generate-button").blur();
            //Falls der Target getroffen wurde wird automatisch das nächste Level geladen
            if(wasTargetHit){
                currentLevelNumber++;
                loadLevel(currentLevelNumber);
                wasTargetHit = false;
            }
        }
    }, animationSpeed); // Intervall in Millisekunden
    //console.log(coordinates);
    //console.log(alphaCoordinates);
}

function calculateStep(x){
        const f1 = f(x + 1e-1);
        const f2 = f(x - 1e-1);
        const derivative = (f1 - f2) / (2 * 1e-5);
        // Schrittweite invers proportional zur Steigung
        step = 0.1 / (2.5+Math.abs(1e-10*derivative));
        return step;
}

function updateLine(data){
    const path = lineGroup.selectAll("path").data([data]);
    // Falls noch kein Pfad vorhanden ist, erstelle einen
    path
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .merge(path)
        .attr("d", pathGenerator);
    const svg = document.getElementById("coordinate_system");
    svg.insertBefore(lineGroup.node(), svg.childNodes[38]); //nach den 38 Elementen (die Grids und ihre Striche) wird der Graph eingefügt
} 

let gTP = true;
function goesThroughPlayer(func){
    let y = func(0)+playerBotLeftPosAY;
    if(y === playerBotLeftPosAY)
        gTP = true;
    else{
        gTP = false;
    }
}

function isConstant(expr){
    // Überprüfen, ob der Ausdruck eine Zahl ist
    if (expr.isConstantNode) {
        return true;
    }

    // Überprüfen, ob der Ausdruck eine Konstante ist
    if (expr.isSymbolNode && expr.name !== 'x') {
        return true;
    }

    // Überprüfen, ob der Ausdruck ein OperatorNode ist, dessen Operatoren und Argumente alle konstant sind
    if (expr.isOperatorNode) {
        return expr.args.every(isConstant);
    }

    return false;
}

function isItLinearFunction(functionTerm) {
    try {
        functionTerm = functionTerm.replace('**', '^');
        const derivative = math.derivative(functionTerm, 'x');
        const simplifiedDerivative = math.simplify(derivative);
        return isConstant(simplifiedDerivative);
    } catch (error) {
        console.error("Fehler bei der Ableitung: " + error);
        return false;
    }
}

let term;
let isLinearFunction;
let replacedTerm;
let func;

function updateTerm() {
    term = document.getElementById("function-input").value;
    replacedTerm = term.replace(/\^/g, "**").replace(/•/g, "*"); // Replace "^" with "**" & "•" with "*"
    isLinearFunction = isItLinearFunction(replacedTerm);
    func = new Function('x', 'return ' + replacedTerm);
}

function f(x){
    if(!isDrawing){
        updateTerm();
    }
    try {
        const result = func(x);
        return result;
    } catch (error) {
        console.error("Fehler bei der Funktionsevaluation: " + error);
        createHitText("coordinate_system", 375, 220, "Kann ich nicht zeichnen (ಥ﹏ಥ)", "#000000", 14);
        //return 0;
    }
}

function drawAgainOnClick(){
    goesThroughPlayer(f);
    if(!gTP && currentLevelNumber<40){
        createHitText("coordinate_system", 375, 220, "Kann ich nicht zeichnen (ಥ﹏ಥ)", "#000000", 14);
    }
    if(currentLevelNumber>39)
        gTP = true;
    if(!isDrawing && gTP){
        generateCoordinates(f);
        lineGroup.node().parentNode.appendChild(lineGroup.node());
    }
}

function isTargetHit(graphX, graphY, targetX, targetY, targetWidth, targetHeight){
    return (
        graphX >= targetX - targetWidth &&
        graphX <= targetX + targetWidth &&
        graphY <= targetY + targetHeight &&
        graphY >= targetY - targetHeight
    );
}

let wasTargetHit = false;
function checkTargetHit(){
    const graphX = xScale(xCoord + ((playerTopLeftPosX - 250) / 50)); // Aktuelle x-Koordinate deines Graphen
    const graphY = yScale(f(xCoord) - ((playerTopLeftPosY - 250) / 50)); // Aktuelle y-Koordinate deines Graphen
    const targetRHit = isTargetHit(graphX, graphY, targetRTopLeftPosX, targetRTopLeftPosY, targetRWidth, targetRHeight);
    const targetDHit = isTargetHit(graphX, graphY, targetD1PosX, targetD1PosY, 1.7, 1.7); // Radius des Ziel-Punkts: 1.7  
    //console.log("targetD x: "+targetDPosX+"; targetD y: "+targetDPosY);
    //console.log("graphX: "+graphX+"; graphY: "+graphY);
    //console.log("checkX: "+ (targetDPosX - 1)+" & "+(targetDPosX+1) +"; checkY: "+ (targetDPosY + 1)+" & "+(targetDPosY - 1));
    if (targetRHit || targetDHit) {
        console.log("Target getroffen!");
        wasTargetHit = true;
        if (targetRHit) {
            removeTargetRect();
            //targetHitSound.play();
        }
        if (targetDHit) {
            removeTargetDot();
            //targetHitSound.play();
            createHitText("coordinate_system", targetD1PosX+15, targetD1PosY+20, "✓", "#32c763", 21);
            document.getElementById(`level-button ${currentLevelNumber}`).style.backgroundColor = "#45C46F";
            levels[currentLevelNumber-1].inputText = document.getElementById("function-input").value;
        }
    }
}

function isObstacle(graphX, graphY, obstacleX, obstacleY, obstacleHitBoxWidth, obstacleHitBoxHeight){
    return(
        graphX >= obstacleX &&
        graphX <= obstacleX + obstacleHitBoxWidth &&
        graphY >= obstacleY &&
        graphY <= obstacleY + obstacleHitBoxHeight
    );
}

function checkObstacleHit(){
    const graphX = xScale(xCoord + ((playerTopLeftPosX - 250) / 50)); // Aktuelle x-Koordinate deines Graphen
    const graphY = yScale(f(xCoord) - ((playerTopLeftPosY - 250) / 50)); // Aktuelle y-Koordinate deines Graphen
    const obstacleHit = isObstacle(graphX, graphY, obstaclePosX, obstaclePosY, obstacleWidth, obstacleHeight);
    if(obstacleHit){
        console.log("Obstacle getroffen!");
        //obstacleHitSound.play();
        interval.stop();
        createHitText("coordinate_system", obstaclePosX+obstacleWidth/2, obstaclePosY+1.75*obstacleHeight, "❌", "#F52C14", 20);
        isDrawing = false;
        document.getElementById("generate-button").blur();
        clearGraph(1500);
    }
}

function removePlayer(){
    const playerC = document.getElementById("playerC");
    const playerD = document.getElementById("playerD");
    if(playerC && playerD){
        playerC.remove();
        playerD.remove();
    }
}

function removeTargetRect(){
    const targetRect = document.getElementById("targetRect"); // Ersetze "targetRect" durch die tatsächliche ID deines Rechteckziels
    if (targetRect){
        targetRect.classList.add('burstAnimation');
        //targetRect.remove();
    }
}

function removeTargetDot(){
    const targetDot = document.getElementById("targetDot");
    if(targetDot)
        targetDot.classList.add('burstAnimation');
}

function removeTargetDot2(){
    const targetDot = document.getElementById("targetDot");
    if(targetDot)
        targetDot.remove();
}

function removeObstacle(){
    const obstacleRect = document.getElementById("obstacleId");
    const obstacleLine = document.getElementById("obstacleLineId");
    if(obstacleRect && obstacleLine){
        obstacleRect.remove();
        obstacleLine.remove();
    }
}

function clearGraph(duration){
    //lineGroup.selectAll("path").remove();
    lineGroup
    .transition() // Starten Sie eine Übergangsanimation
    .duration(duration) // Die Dauer der Animation in Millisekunden
    .style("opacity", 0) // Ändern Sie die Opazität auf 0
    .on("end", function() { // Fügen Sie einen "end"-Event-Handler hinzu
        lineGroup.selectAll("path").remove(); // Entfernen Sie die lineGroup, wenn die Animation endet
        lineGroup.style("opacity", 1); // Setzen Sie die Opazität zurück auf 1
    });
}

//Mittelpunkt: x/y: 262.5 // x/y: -0.25 //radius ursprünglich = 12.25
let playerRadius = 12.5;
let playerBotLeftPosAX = 0;
let playerBotLeftPosAY = 0;
let playerMidPosX = (playerBotLeftPosAX+0.25)*50+250; 
let playerMidPosY = (-playerBotLeftPosAY+0.25)*50+250;
let playerTopLeftPosX = playerMidPosX-playerRadius;
let playerTopLeftPosY = playerMidPosY-playerRadius;

const playerCoordinateText = `Spielerkoordinaten: P( / | / )`;
document.getElementById('textForPlayerCoordinates').textContent = playerCoordinateText;

const targetCoordinateText = `Zielkoordinaten: T( / | / )`;
document.getElementById('textForTargetCoordinates').textContent = targetCoordinateText;

let targetRBotLeftPosAX;
let targetRBotLeftPosAY;
let targetRTopLeftPosX = targetRBotLeftPosAX*50+250;
let targetRTopLeftPosY = (-targetRBotLeftPosAY-0.5)*50+250;
let targetRWidth = 25;
let targetRHeight = 25;

let targetD1PosAX;
let targetD1PosAY;
let targetD1PosX;
let targetD1PosY;

let targetD2PosAX;
let targetD2PosAY;
let targetD2PosX;
let targetD2PosY;

let obstaclePosAX;
let obstaclePosAY;
let obstaclePosX;
let obstaclePosY;
let obstacleWidth;
let obstacleHeight;

const levels = [
    // {
    //     "level": 0,
    //     "target1Coordinates": {"x": 0, "y": 0},
    //     //"target2Coordinates": {"x": 0, "y": 0},
    //     "obstacleSize": {"w": 0, "h": 0},
    //     "playerCoordinates": {"x": 0, "y": 0},
    //     "inputText": ""
    // },
    {
        "level": 1,
        "target1Coordinates": {"x": 2, "y": 2},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 2,
        "target1Coordinates": {"x": 2, "y": -2},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 3,
        "target1Coordinates": {"x": 2, "y": 4},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 4,
        "target1Coordinates": {"x": 3, "y": 4},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 5,
        "target1Coordinates": {"x": 4, "y": 1},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 6,
        "target1Coordinates": {"x": 1, "y": 4.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 7,
        "target1Coordinates": {"x": 3, "y": 4},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 8,
        "target1Coordinates": {"x": 3, "y": 4.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 9,
        "target1Coordinates": {"x": 2.5, "y": 3.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 10,
        "target1Coordinates": {"x": 3, "y": -2},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 11,
        "target1Coordinates": {"x": 1, "y": -3.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 12,
        "target1Coordinates": {"x": 4, "y": -2.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 13,
        "target1Coordinates": {"x": 2, "y": -1.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 14,
        "target1Coordinates": {"x": 3, "y": -2.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 15,
        "target1Coordinates": {"x": 1.5, "y": -4.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 16,
        "target1Coordinates": {"x": 3.5, "y": -1.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 17,
        "target1Coordinates": {"x": 2.5, "y": -3.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 18,
        "target1Coordinates": {"x": 2.5, "y": -1.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 19,
        "target1Coordinates": {"x": 4.5, "y": -1.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 20,
        "target1Coordinates": {"x": -1, "y": -3},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 21,
        "target1Coordinates": {"x": -3.5, "y": -2.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 22,
        "target1Coordinates": {"x": -3.3, "y": -4.1},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 23,
        "target1Coordinates": {"x": -1.2, "y": -3.6},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 24,
        "target1Coordinates": {"x": -3.4, "y": -0.6},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 25,
        "target1Coordinates": {"x": -2.2, "y": 4},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 26,
        "target1Coordinates": {"x": -1.9, "y": 2.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 27,
        "target1Coordinates": {"x": -3.7, "y": 4},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 28,
        "target1Coordinates": {"x": -3, "y": 1.4},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 29,
        "target1Coordinates": {"x": -1, "y": 3.2},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 30,
        "target1Coordinates": {"x": 1.2, "y": 3.5},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 31,
        "target1Coordinates": {"x": -1.8, "y": 3.1},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 32,
        "target1Coordinates": {"x": 3.6, "y": -3.1},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 33,
        "target1Coordinates": {"x": -1.9, "y": -2.1},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 34,
        "target1Coordinates": {"x": -3.2, "y": 2.9},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 0},
        "inputText": ""
    },
    {
        "level": 35,
        "target1Coordinates": {"x": -3.2, "y": 2.9},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": 1},
        "inputText": ""
    },
    {
        "level": 36,
        "target1Coordinates": {"x": -2.8, "y": -4.1},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 1, "y": 0},
        "inputText": ""
    },
    {
        "level": 37,
        "target1Coordinates": {"x": 2.6, "y": 3.1},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 1, "y": 1},
        "inputText": ""
    },
    {
        "level": 38,
        "target1Coordinates": {"x": 1.7, "y": -2.6},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": -1, "y": 0},
        "inputText": ""
    },
    {
        "level": 39,
        "target1Coordinates": {"x": -2.4, "y": 1.3},
        //"target2Coordinates": {"x": 0, "y": 0},
        "obstacleSize": {"w": 0, "h": 0},
        "playerCoordinates": {"x": 0, "y": -1},
        "inputText": ""
    }
];
function getRandomDecimal() {
    let num = Math.random() * 8 - 4; // generiert eine zufällige Dezimalzahl zwischen -5 und 5
    return Math.round(num * 10) / 10; // rundet die Zahl auf eine Dezimalstelle
}
function generateLevels(numLevels){
    for(let i=0; i<numLevels;i++){
        let t1x = getRandomDecimal();
        let t1y = getRandomDecimal();
        let px = Math.floor(Math.random() * 9) - 4;
        let py = Math.floor(Math.random() * 9) - 4;
        let disTPX = Math.abs(t1x-px);
        let disTPY = Math.abs(t1y-py);
        if(disTPX>0.6 && disTPY>0.6){
            let level = {
                "level": levels.length+1,
                "target1Coordinates": {"x": t1x, "y": t1y},
                "obstacleSize": {"w": 6, "h": 6},
                "playerCoordinates": {"x": px, "y": py},
                "inputText": ""
            };
            levels.push(level);
        }
        else
            i--;
    }
}

generateLevels(51);

function createLevelButton(level) {
    const button = document.createElement("button");
    button.textContent = `Level ${level.level}`;
    button.setAttribute("class", "level-button");
    button.setAttribute("id", `level-button ${level.level}`);
    button.addEventListener("click", () => loadLevel(level.level));
    return button;
}

function displayLevelList() {
    const levelList = document.getElementById("level-list");
    levels.forEach(level => {
        const button = createLevelButton(level);
        levelList.appendChild(button);
    });
}

function helpButtonClick(){
    const textContainer1 = document.getElementById('help-text-container-1');
    const textContainer2 = document.getElementById('help-text-container-2');
    const textSolution = document.getElementById('help-text-container-2-placeholder');
    const button = document.getElementById('help-button');
    const helpContainer1 = document.querySelector('.help-container');
    helpContainer1.classList.toggle('active');
    if (textContainer1.style.width === '0px') {
        textContainer1.style.width = '375px';
        textContainer1.style.opacity = '1';
        if(currentLevelNumber>39){
            textContainer2.style.width = '275px';
            textContainer2.style.opacity = '1';
            textSolution.style.width = '100px'
            textSolution.style.opacity = '1';
        }
        button.style.animation = 'button-click-animation 0.6s forwards';
        button.style.backgroundColor = 'rgb(50, 52, 58)';

    } else {
        textContainer2.style.width = '0px';
        textContainer1.style.width = '0px';
        textContainer1.style.opacity = '0';
        textContainer2.style.opacity = '0';
        textSolution.style.width = '0px';
        textSolution.style.opacity = '0';
        button.style.animation = 'button-unclick-animation 0.6s forwards';
        button.style.backgroundColor = 'rgb(75, 77, 84)';
    }
}
document.getElementById('help-text-2').addEventListener('click', function() {
    if (this.style.filter === 'none') {
        this.style.filter = 'blur(6px)';
    } else {
        this.style.filter = 'none';
        document.getElementById("function-input").value = solutionText; //document.getElementById("help-text-2").innerText.replace(/f\(x\) = /, "")
        if(targetD1PosAX<playerBotLeftPosAX){
            isOn = true;
            changeGraphLength();
            document.getElementById("graphLenghtButton").checked = true;
        }
        else{
            isOn = false;
            changeGraphLength();
            document.getElementById("graphLenghtButton").checked = false;
        }
    }
});

let solutionText;
function findLevelSolution(){
    let relativeTargetDistanceX = (targetD1PosAX-playerBotLeftPosAX).toFixed(1);
    let relativeTargetDistanceY = (targetD1PosAY-playerBotLeftPosAY).toFixed(1);
    const help2 = document.getElementById("help-text-2");
    m = (relativeTargetDistanceY)/(relativeTargetDistanceX);
    if(Number.isInteger(m)){
        const text = `\\(f(x)=${m}\\cdot x\\)`;
        help2.innerText = text; //`f(x) = ${m}*x`
        solutionText = `${m}•x`;
    }
    else{
        const text = `\\(f(x)=\\frac{${relativeTargetDistanceY}}{${relativeTargetDistanceX}}\\cdot x\\)`;
        help2.innerText = text; //`f(x) = ${relativeTargetDistanceY}/${relativeTargetDistanceX}*x`
        solutionText = `${relativeTargetDistanceY}/${relativeTargetDistanceX}•x`;
    }
}

function updateHelpText() {
    const helpTextElement = document.getElementById("help-text-1");
    const slope = `\\[m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}.\\]`;
    const generalFunctionTerm = `\\[f(x)=m\\cdot x+b\\]`
    helpTextElement.innerHTML = `Wenn es schwierig ist, das Ziel mit den Koordinaten T(${targetD1PosAX} | ${targetD1PosAY}) zu treffen, hilft dir die Steigungsberechnung. Verwende dafür die Formel: ${slope} Hierbei repräsentieren die Differenzen der Koordinaten die Entfernung des Ziels zu deinem Spieler.<br>Beachte, dass eine positive Steigung bedeutet, dass die Funktion ansteigt, während eine negative Steigung auf einen Abstieg hindeutet. Mit Hilfe dieser Steigung kannst du das Ziel mithilfe des allgemeinen Funktionsterms ${generalFunctionTerm} präzise treffen.`;
    MathJax.typesetPromise();
}

let currentLevelNumber;
function loadLevel(levelNumber) {
    const textContainer1 = document.getElementById('help-text-container-1');
    const textContainer2 = document.getElementById('help-text-container-2');
    const textSolution = document.getElementById('help-text-container-2-placeholder');
    const button = document.getElementById('help-button');
    const helpContainer1 = document.querySelector('.help-container');
    const levelInfo = levels.find(level => level.level === levelNumber);
    const helpText2 = document.getElementById('help-text-2');
    currentLevelNumber = levelNumber;
    if(levelInfo){
        const t1x = levelInfo.target1Coordinates.x;
        const t1y = levelInfo.target1Coordinates.y;
        const ow = levelInfo.obstacleSize.w;
        const oh = levelInfo.obstacleSize.h;
        const px = levelInfo.playerCoordinates.x;
        const py = levelInfo.playerCoordinates.y;

        targetD1PosAX = t1x;
        targetD1PosAY = t1y;
        targetD1PosX = targetD1PosAX*50+250;
        targetD1PosY = -targetD1PosAY*50+250;

        // targetD2PosAX = t2x;
        // targetD2PosAY = t2y;
        // targetD2PosX = targetD2PosAX*50+250;
        // targetD2PosY = -targetD2PosAY*50+250;

        obstaclePosAX = t1x-1;
        obstaclePosAY = t1y;
        obstaclePosX = (obstaclePosAX*50+250)-(ow/2);
        obstaclePosY = (-obstaclePosAY*50+250)-(oh/2);
        obstacleWidth = ow;
        obstacleHeight = oh;

        playerBotLeftPosAX = px;
        playerBotLeftPosAY = py;
        playerMidPosX = (playerBotLeftPosAX+0.25)*50+250; 
        playerMidPosY = (-playerBotLeftPosAY+0.25)*50+250;
        playerTopLeftPosX = playerMidPosX-playerRadius;
        playerTopLeftPosY = playerMidPosY-playerRadius;

        const targetCoordinateText = `Zielkoordinaten: T(${t1x} | ${t1y})`;
        document.getElementById('textForTargetCoordinates').textContent = targetCoordinateText;

        const playerCoordinateText = `Spielerkoordinaten: P(${px} | ${py})`;
        document.getElementById('textForPlayerCoordinates').textContent = playerCoordinateText;

        const levelText = document.getElementById('level-text');
        levelText.textContent = "Level: " + levelNumber;
        levelText.classList.remove('slide-in');
        setTimeout(function() {
            levelText.classList.add('slide-in');
        }, 10);

        removePlayer();
        removeTargetDot2();
        removeObstacle();
        clearGraph(1250);
        document.getElementById("function-input").value = levelInfo.inputText;

        console.log("lvl: "+levelNumber);

        if(levelNumber>39){
            findLevelSolution();
        }

        if(textContainer1.style.width != '0px'){
            helpContainer1.classList.toggle('active');
            textContainer1.style.width = '0px';
            textContainer1.style.opacity = '0';
            textContainer2.style.width = '0px';
            helpText2.style.filter = 'blur(6px)';
            textSolution.style.width = '0px';
            textSolution.style.opacity = '0';
            button.style.animation = 'button-unclick-animation 0.6s forwards';
            button.style.backgroundColor = 'rgb(75, 77, 84)';
        }

        updateHelpText();

        createPlayer("coordinate_system", playerTopLeftPosX, playerTopLeftPosY);
        if(ow!=0 || oh!=0)
            createObstacle("coordinate_system", obstaclePosX, obstaclePosY, obstacleWidth, obstacleHeight)
        if(t1x != 0 && t1y != 0)
            createTargetDot("coordinate_system", targetD1PosX, targetD1PosY, 3, "#FF5535"); //#FF5535 heller;  #F7664B dunkler
    }
}
createGrid("coordinate_system", 25, "lightgray", 1.75);
createAxisLabels("coordinate_system", 1.75);
createAxisNumbers("coordinate_system", 15.5, "'Inclusive Sans', sans-serif");
createAxis("coordinate_system", 2);

displayLevelList();
window.onload = function(){
    loadLevel(1);
}