let storageArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
let memoryBacks = [
						'back1',
						'back2',
						'back3',
						'back4'
					]
let memoryFronts = {
					 "A": "Fronts/A.jpg",
					 "B": "Fronts/B.jpg",
					 "C": "Fronts/C.jpg",
					 "D": "Fronts/D.jpg",
					 "E": "Fronts/E.jpg",
					 "F": "Fronts/F.jpg",
					 "G": "Fronts/G.jpg",
					 "H": "Fronts/H.jpg",
					 "I": "Fronts/I.jpg",
					 "J": "Fronts/J.jpg",
					 "K": "Fronts/K.jpg",
					 "L": "Fronts/L.jpg"
					}

let memoryArray = [];
let memoryValues = [];
let memoryTileIds = [];
let tilesFlipped = 0;
let pickedBack = 3;
let counter = 0;


let userdata = [];
let data = window.location.search.substring(1).split('&');

while(Part = data.shift()) 
{
   	Part = Part.split('=');
   	userdata.push(decodeURIComponent(Part[1]));
}

let nickName = userdata[0];
let gameMode = userdata[1];



Array.prototype.memoryTileShuffle = function(){
    let i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function info(id){
	let element = document.getElementById(id);
	element.innerHTML = "";
	let div = document.createElement("div");
	div.innerHTML = nickName;
	element.appendChild(div);
	div = document.createElement("div");
	div.innerHTML = gameMode;
	element.appendChild(div);
}

function newBoard(){
	tilesFlipped = 0;
	memoryValues = [];
	memoryTileIds = [];
	let output = '';
	info('info');		

	document.getElementById('memory-board').style.transition = "width .2s linear 0s";
	switch (gameMode)
	{
		case 'Easy':
			document.getElementById('memory-board').style.width = "700px";
			memoryArray = storageArray.slice(0, 12);
			break;
		case 'Medium':
			document.getElementById('memory-board').style.width = "1000px";
			memoryArray = storageArray.slice(0, 18);
			break;
		case 'Hard':
			document.getElementById('memory-board').style.width = "1260px";
			memoryArray = storageArray.slice(0, 24);
			break;
	}

	setTimeout(function delay(){
		document.getElementById('memory-board').style.transition = "height .5s linear 0s";
		document.getElementById('memory-board').style.height = "645px";
	}
	, 200);

	setTimeout(function delay(){
	    memoryArray.memoryTileShuffle();
		for(let i = 0; i < memoryArray.length; i++){
			output += '<div id="tile_'+ i +'"style="background: url(Backs/' + memoryBacks[pickedBack] + '.png); no-repeat; background-size: cover;" onclick="memoryFlipTile(this,\'' + memoryArray[i] + '\')"></div>';
		}
		document.getElementById('memory-board').innerHTML = output;
		counter = 0;
	}
	, 700);
}

function changeToBack(tile){
	tile.style.background = 'url(Backs/' + memoryBacks[pickedBack] + '.png)';
	tile.style.backgroundRepeat = "no-repeat";
	tile.style.backgroundSize = 'cover';
}

function changeBack(tile, val){
	tile.style.background = 'url(' + memoryFronts[val] + ')';
	tile.style.backgroundRepeat = "no-repeat";
	tile.style.backgroundSize = 'cover';
}

function flip2Back(){
	let tile1 = document.getElementById(memoryTileIds[0]);
	let tile2 = document.getElementById(memoryTileIds[1]);
	tile1.style.transition = "transform .5s linear 0s";
	tile1.style.transform = "perspective(600px) rotateY(0deg)";
	setTimeout(changeToBack, 250, tile1);
	tile2.style.transition = "transform .5s linear 0s";
	tile2.style.transform = "perspective(600px) rotateY(0deg)";
	setTimeout(changeToBack, 250, tile2);

	memoryValues = [];
	memoryTileIds = [];
}

function clear(){
	document.getElementById('memory-board').innerHTML = "";
	newBoard();
}

function restart(){
	for (let i = 0; i < memoryArray.length; i++) {
		let tile = document.getElementById('tile_' + i);
		if (tile != null && tile.style.transform == "perspective(600px) rotateY(180deg)") {
			tile.style.transition = "transform .5s linear 0s";
			tile.style.transform = "perspective(600px) rotateY(0deg)";
			setTimeout(changeToBack, 250, tile);
		}
	}
	setTimeout(clear, 700);
}

function vanish(){
	let tile1 = document.getElementById(memoryTileIds[0]);
	let tile2 = document.getElementById(memoryTileIds[1]);

	tile1.style.transition = "opacity .5s linear 0s";
	tile1.style.opacity = "0";
	setTimeout(function delay(){
		tile2.style.transition = "opacity .5s linear 0s";
		tile2.style.opacity = "0";		
	}, 250);
	memoryValues = [];
	memoryTileIds = [];
}

function memoryFlipTile(tile, val){
	if(tile.style.transform != "perspective(600px) rotateY(180deg)" && memoryValues.length < 2){
		tile.style.transition = "transform .5s linear 0s";
		tile.style.transform = "perspective(600px) rotateY(180deg)";
		setTimeout(changeBack, 250, tile, val);

		if(memoryValues.length == 0){
			memoryValues.push(val);
			memoryTileIds.push(tile.id);
		} else if(memoryValues.length == 1){
			memoryValues.push(val);
			memoryTileIds.push(tile.id);
			if(memoryValues[0] == memoryValues[1]){
				tilesFlipped += 2;

				setTimeout(vanish(), 500);

				if(tilesFlipped == memoryArray.length){
					Victory(document.getElementById('memory-board'));
				}
			} else {
				setTimeout(flip2Back, 700);
			}
		}
	}
}

function _showSleeves(element){
	let output = '';
	for(let i = 0; i < memoryBacks.length; i++){
		output += '<div id="tile_'+ i +'"style="background: url(Backs/' + memoryBacks[i] + '.png); no-repeat; background-size: cover;" onclick="changeSleeve(\'' + i + '\')"></div>';
	}
	element.innerHTML = output;
}

function showSleeves(element){
	element.style.transition = "height .5s linear 0s";
	if (element.style.height == '200px') {
		element.innerHTML = "";
		element.style.border = "";
		element.style.borderRadius = "";
		element.style.padding = "";
		element.style.height = "0px";
	} else {
		element.style.height = "200px";
		element.style.border = "black 1px solid";
		element.style.borderRadius = "10px";
		element.style.padding = "5px";
		setTimeout(_showSleeves, 400, element);
	}
}

function changeSleeve(num){
	pickedBack = num;
	for (let i = 0; i < memoryArray.length; i++) {
		let tile = document.getElementById('tile_' + i);
		if (tile.style.transform != "perspective(600px) rotateY(180deg)") {
			tile.style.transition = "background .5s linear 0s";
			tile.style.background = 'url(Backs/' + memoryBacks[pickedBack] + '.png)';
			tile.style.backgroundRepeat = "no-repeat";
			tile.style.backgroundSize = 'cover';
		}
	}
}

function _timer(){
    document.getElementById('timer').innerHTML = counter + " sec";
    counter++;
    setTimeout(_timer, 1000);
}

function Victory(element){
	element.innerHTML = "";
	let div = document.createElement("h1");
	let victoryTime = counter;
	div.innerHTML = `${nickName} win! Victory obtained in: ${victoryTime} sec`;

	element.style.transition = "height .5s linear 0s";
	element.style.height = "45px";
	element.appendChild(div);
	
	setTimeout(function delay(){
		element.style.transition = "width .5s linear 0s";
		element.style.width = "860px"
	}
	, 500);
	for (let i = 1; i < 11; i++)
	{
		if (localStorage.getItem(`Player${i}Time${gameMode}`) == null || localStorage.getItem(`Player${i}Time${gameMode}`) > victoryTime) {
			localStorage.setItem(`Player${i}Nick${gameMode}`, nickName);
			localStorage.setItem(`Player${i}Time${gameMode}`, victoryTime);
			return;
		}
	}
}