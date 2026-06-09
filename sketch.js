async function getData(){
    fetch('./Data.json')
        .then( response => response.json()) 
        .then(data => drawDiagrams(data))
}

function drawDiagrams(data){
    var diagramRow = document.getElementsByName("diagramRow")[0];
    var diagramArea = document.getElementById("diagramArea");
    
    diagramArea.appendChild(
        createNewRow(
            diagramRow, 
            "data", 
            "dataClean", 
            "dataNoise"
        )
    );
    
    diagramArea.appendChild(
        createNewRow(
            diagramRow, 
            "predNoNoise", 
            "predNoNoiseTrain", 
            "predNoNoiseTest"
        )
    );

    diagramArea.appendChild(
        createNewRow(
            diagramRow, 
            "predNoiseBest", 
            "predNoiseBestTrain", 
            "predNoiseBestTest"
        )
    );

    diagramArea.appendChild(
        createNewRow(
            diagramRow, 
            "predNoiseOver", 
            "predNoiseOverTrain", 
            "predNoiseOverTest"
        )
    );

    //Datensätze ohne Rauschen links
    drawDiagram(
        data.clean.train.originalPoints,
        data.clean.test.originalPoints,
        "Training",  
        "Test",
        document.getElementById("dataClean")
    )
    document.getElementById("dataCleanTitel").innerText = 
        "100 Datensätze ohne Rauschen";
    document.getElementById("dataCleanHeadline").innerHTML = 
        "<h5>Trainings- und Testdatensätze</h5>";

    //Datensätze mit Rauschen rechts
    drawDiagram(
        data.noise.best.train.originalPoints,
        data.noise.best.test.originalPoints,
        "Training",  
        "Test",
        document.getElementById("dataNoise")
    )
    document.getElementById("dataNoiseTitel").innerText = 
        "100 Datensätze mit Rauschen";
    document.getElementById("dataNoiseHeadline").innerHTML = 
        "<h5>Trainings- und Testdatensätze</h5>";

    //Ohne Rauschen Training
    drawDiagram(
        data.clean.train.originalPoints,
        data.clean.train.predictedPoints,
        "Original",  
        "Vorhersage",
        document.getElementById("predNoNoiseTrain")
    )
    document.getElementById("predNoNoiseTrainTitel").innerText = 
        "Ohne Rauschen, MSE = " + data.clean.train.MSE;
    document.getElementById("predNoNoiseTrainHeadline").innerHTML = 
        "<h5>Vorhersagen auf Trainingsdaten</h5>";

    //Ohne Rauschen Test
    drawDiagram(
        data.clean.test.originalPoints,
        data.clean.test.predictedPoints,
        "Original",  
        "Vorhersage",
        document.getElementById("predNoNoiseTest")
    )
    document.getElementById("predNoNoiseTestTitel").innerText = 
        "Ohne Rauschen, MSE = " + data.clean.test.MSE;
    document.getElementById("predNoNoiseTestHeadline").innerHTML = 
        "<h5>Vorhersagen auf Testdaten</h5>";

    //Mit Rauschen bestfit Training
    drawDiagram(
        data.noise.best.train.originalPoints,
        data.noise.best.train.predictedPoints,
        "Original",  
        "Vorhersage",
        document.getElementById("predNoiseBestTrain")
    )
    document.getElementById("predNoiseBestTrainTitel").innerText = 
        "Mit Rauschen, MSE = " + data.noise.best.train.MSE;
    document.getElementById("predNoiseBestTrainHeadline").innerHTML = 
        "<h5>Vorhersagen auf Trainingsdaten des besten Modells</h5>";

    //Mit Rauschen bestfit Test
    drawDiagram(
        data.noise.best.test.originalPoints,
        data.noise.best.test.predictedPoints,
        "Original",  
        "Vorhersage",
        document.getElementById("predNoiseBestTest")
    )
    document.getElementById("predNoiseBestTestTitel").innerText = 
        "Mit Rauschen, MSE = " + data.noise.best.test.MSE;
    document.getElementById("predNoiseBestTestHeadline").innerHTML = 
        "<h5>Vorhersagen auf Testdaten des besten Modells</h5>";

    //Mit Rauschen overfit Training
    drawDiagram(
        data.noise.over.train.originalPoints,
        data.noise.over.train.predictedPoints,
        "Original",  
        "Vorhersage",
        document.getElementById("predNoiseOverTrain")
    )
    document.getElementById("predNoiseOverTrainTitel").innerText = 
        "Mit Rauschen, MSE = " + data.noise.over.train.MSE;
    document.getElementById("predNoiseOverTrainHeadline").innerHTML = 
        "<h5>Vorhersagen auf Trainingsdaten des Overfit Modells</h5>";
    
    //Mit Rauschen overfit Test
    drawDiagram(
        data.noise.over.test.originalPoints,
        data.noise.over.test.predictedPoints,
        "Original",  
        "Vorhersage",
        document.getElementById("predNoiseOverTest")
    )
    document.getElementById("predNoiseOverTestTitel").innerText = 
        "Mit Rauschen, MSE = " + data.noise.over.test.MSE;
    document.getElementById("predNoiseOverTestHeadline").innerHTML = 
        "<h5>Vorhersagen auf Testdaten des Overfit Modells</h5>";
    
    diagramArea.removeChild(diagramRow);
}

function createNewRow(rowToCopy, rowId, col1Id, col2Id){
    var newRow = rowToCopy.cloneNode(true);
    newRow.id = rowId;
    var newCols = newRow.children;
    newCols[0].children[0].id = col1Id + "Headline";
    newCols[0].children[1].id = col1Id;
    newCols[0].children[2].id = col1Id + "Titel";
    newCols[1].children[0].id =col2Id + "Headline";
    newCols[1].children[1].id =col2Id;
    newCols[1].children[2].id =col2Id + "Titel";
    return newRow;
}

function drawDiagram(series1, series2, seriesTag1, seriesTag2, drawArea){
    tfvis.render.scatterplot(
        {drawArea: drawArea},
        {values: [series1, series2], series: [seriesTag1, seriesTag2]},
        {
        xLabel: 'x',
        yLabel: 'y',
        height: 300,        
        width: 500
        }
    );
}

getData();
