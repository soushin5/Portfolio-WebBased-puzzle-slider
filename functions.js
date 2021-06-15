//this function stops the start button from creating multiple versions of the game.
//instead it just restarts the existing game
function puzzleExists(){
	var exists = document.getElementById('puzzle').firstChild;
	if(exists){
		while(puzzle.hasChildNodes()){
			puzzle.removeChild(puzzle.firstChild);
		}
		createPuzzle();
	}
	else {
		createPuzzle();
	}	
}
//just for UI sake
function chngBtnText(){
	var btn = document.getElementById('btn');
	btn.innerHTML = "<button onclick='puzzleExists()'>Restart Game</button>";
}
//call multiple functions on one click
function multi(){
	puzzleExists();
	chngBtnText();
}
//you can make it pic from several differnt image folders easily if we're going to add that extra feature\
//i'm designing this for 500x500px images
function createPuzzle() {
    var tile;
	var puzzle = document.getElementById('puzzle');
    for (var i = 1; i <= 16; i++) {
		tile = document.createElement("img");
        /*ID will be for css, identifying the white tile, and could be used to check if you've won by making sure its in order
          class will hold cell position for javascript
          with the way i'm classing, it will be important to createPuzzle, then shuffle it, I think you'd have to do that anyways though
          for shuffle its important to keep image names with IDs, swap tiles 
		  by switching ID, class, and image name. check out the clickTile method.
		*/
        tile.setAttribute("id", "tile" + i);
        if (i < 5) {
            tile.setAttribute("class", "cell1" + i);
        } else if (i < 9) {
            tile.setAttribute("class", "cell2" + (i-4));
        } else if (i < 13) {
            tile.setAttribute("class", "cell3" + (i-8));
        } else if (i < 17) {
            tile.setAttribute("class", "cell4" + (i-12));
        }
        tile.setAttribute("src", "testimg/tile" + i + ".png");
        tile.addEventListener("click", clickTile);
		puzzle.appendChild(tile);
    }
}

function clickTile() {
    //gets the position(class) of tile16(the white tile), and then if it touching the white tile it switches src and ID
    //you can't click on white tile
    if (this.id == "tile16") {
        return;
    }
    //this gets the row and column by number of the white tile, also gets src and id
    var whiteTilePos = document.getElementById("tile16").className;
    var whiteTileArray = whiteTilePos.split("");
    var whiteTileRow = whiteTileArray[4];
    var whiteTileCol = whiteTileArray[5];
    var whiteTileID = "tile16";
    var whiteTileSrc = document.getElementById("tile16").getAttribute('src');

    //this gets the row and column by number of the clicked tile, also gets src and id
    var currentTilePos = this.className;
    var currentTileArray = currentTilePos.split("");
    var currentTileRow = currentTileArray[4];
    var currentTileCol = currentTileArray[5];
    var currentTileID = this.id;
    var currentTileSrc = this.getAttribute('src');

    //to switch its neccessary for EITHER the row to be the same and column be 1 different, OR the column to be the same and the row 1 different.
    var isOneOff;
    if (currentTileRow == whiteTileRow) {
        isOneOff = (((whiteTileCol - currentTileCol) == 1) || ((whiteTileCol - currentTileCol) == -1));
        if (isOneOff) {
            //switch src
            this.setAttribute('src', whiteTileSrc);
            document.getElementById(whiteTileID).setAttribute('src', currentTileSrc);
            //switch ID
            document.getElementById(whiteTileID).setAttribute("id", currentTileID);
            this.setAttribute("id", whiteTileID);
        } else {
            return;
        }
    } else if (currentTileCol == whiteTileCol) {
        isOneOff = (((whiteTileRow - currentTileRow) == 1) || ((whiteTileRow - currentTileRow) == -1));
        if (isOneOff) {
            //switch src
            this.setAttribute('src', whiteTileSrc);
            document.getElementById(whiteTileID).setAttribute('src', currentTileSrc);
            //switch ID
            document.getElementById(whiteTileID).setAttribute("id", currentTileID);
            this.setAttribute("id", whiteTileID);
        } else {
            return;
        }
    } else {
        return;
    }
}

//swap Tiles by switching Id's and Src's
function swapTiles(tile1,tile2) {
   //switch ID's
   var tempId = document.getElementById(tile1).id;
   document.getElementById(tile1).id = document.getElementById(tile2).id;
   document.getElementById(tile2).id = tempId;
   //switch SRC's
   var tempSrc = document.getElementById(tile1).src;
   document.getElementById(tile1).src = document.getElementById(tile2).src;
   document.getElementById(tile2).src = tempSrc;
}

function shuffle() {
//Use nested loops to access each cell of the 4x4 grid
   for (var row=1;row<=4;row++) { //For each row of the 4x4 grid
      for (var column=1;column<=4;column++) { //For each column in this row
	     var row2=Math.floor(Math.random()*4 + 1); //Pick a random row from 1 to 4
         var column2=Math.floor(Math.random()*4 + 1); //Pick a random column from 1 to 4
		 var tile1 = row+column;
		 var tile2 = row+column+row2+column2;
		 //will never switch the white tile
		 if(tile2 == 16){
			 tile2 = 1;
			 swapTiles("tile"+tile1,"tile"+tile2); //Swap
		 }
		 else{
			 swapTiles("tile"+tile1,"tile"+tile2); //Swap
		 }
	  } 
   }
}

