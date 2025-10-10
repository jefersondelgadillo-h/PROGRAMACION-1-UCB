//Eelemento del DOM
const canvas = document.getElementById("matrixCanvas");
const fillButton = document.getElementById("fillBtn");
const clearButton = document.getElementById("clearBtn");

//Contexto de dibujo
const context = canvas.getContext ("2d");

//Instancia de la matriz
const matrix = new Matrix(5,5,0);

//Inicializa el canvas y dibuja la matriz 
function InitializeCanvas() {
    drawMatrix();
        window.addEventListener("resize", drawMatrix);
        fillButton.addEventListener("click", fillMatrix);
        clearButton.addEventListener("click", clearCanvas);
}

//Dibuja la matriz en el canvas
function drawMatrix () {
    const width= canvas.width = canvas.clientWidth;
    const heigth= canvas.heigth = canvas.clientHeight;
    const cellWidth= width/ matrix.cols;
    const cellHeight= heigth/matrix.rows; 

    context.clearRect (0,0,width,heigth);
    context.font= `${Math.min(cellWidth, cellHeight) / 3}px Arial`;
    context.textAlign= "center";
    context.textBaseline="middle";

    for (let row=0; row<matrix.rows;row++){
        for(let col= 0;col<matrix.cols;col++){
            const x = col*cellWidth;
            const y= row*cellHeight;
            const value = matrix.getValue(row,col);
            context.strokeRect(x,y,cellWidth,cellHeight);
            context.fillText(value, x + cellWidth/2,y + cellHeight/2);
        }
    }
}
//Llena la matriz con valores aleatorios y la dibuja
function fillMatrix(){
    matrix.fillRandom(0,9);
    drawMatrix();
}

//Limpia el canvas 
function clearCanvas (){
    context.clearRect(0,0,canvas.width, canvas.heigth);
}
//Ejecuta la inicializacion
InitializeCanvas();