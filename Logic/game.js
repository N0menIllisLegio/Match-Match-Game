let storage_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
let memory_backs = [
						'back1',
						'back2',
						'back3',
						'back4'
					]
let memory_fronts = {
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

let memory_array = [];
let memory_values = [];
let memory_tile_ids = [];
let tiles_flipped = 0;
let picked_back = 3;
let counter = 0;


let UserData = [];
let Data = window.location.search.substring(1).split('&');
while(Part = Data.shift()) 
{
   	Part = Part.split('=');
   	UserData.push(decodeURIComponent(Part[1]));
}

let nickName = UserData[0];
let gameMode = UserData[1];



Array.prototype.memory_tile_shuffle = function(){
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
	tiles_flipped = 0;
	memory_values = [];
	memory_tile_ids = [];
	let output = '';
	info('info');		

	document.getElementById('memory-board').style.transition = "width .2s linear 0s";
	switch (gameMode)
	{
		case 'Easy':
			document.getElementById('memory-board').style.width = "700px";
			memory_array = storage_array.slice(0, 12);
			break;
		case 'Medium':
			document.getElementById('memory-board').style.width = "1000px";
			memory_array = storage_array.slice(0, 18);
			break;
		case 'Hard':
			document.getElementById('memory-board').style.width = "1260px";
			memory_array = storage_array.slice(0, 24);
			break;
	}

	setTimeout(function delay(){
		document.getElementById('memory-board').style.transition = "height .5s linear 0s";
		document.getElementById('memory-board').style.height = "645px";
	}
	, 200);

	setTimeout(function delay(){
	    memory_array.memory_tile_shuffle();
		for(let i = 0; i < memory_array.length; i++){
			output += '<div id="tile_'+ i +'"style="background: url(Backs/' + memory_backs[picked_back] + '.png); no-repeat; background-size: cover;" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
		}
		document.getElementById('memory-board').innerHTML = output;
		counter = 0;
	}
	, 700);
}

function changeToBack(tile){
	tile.style.background = 'url(Backs/' + memory_backs[picked_back] + '.png)';
	tile.style.backgroundRepeat = "no-repeat";
	tile.style.backgroundSize = 'cover';
}

function changeBack(tile, val){
	tile.style.background = 'url(' + memory_fronts[val] + ')';
	tile.style.backgroundRepeat = "no-repeat";
	tile.style.backgroundSize = 'cover';
}

function flip2Back(){
	let tile_1 = document.getElementById(memory_tile_ids[0]);
	let tile_2 = document.getElementById(memory_tile_ids[1]);
	tile_1.style.transition = "transform .5s linear 0s";
	tile_1.style.transform = "perspective(600px) rotateY(0deg)";
	setTimeout(changeToBack, 250, tile_1);
	tile_2.style.transition = "transform .5s linear 0s";
	tile_2.style.transform = "perspective(600px) rotateY(0deg)";
	setTimeout(changeToBack, 250, tile_2);

	memory_values = [];
	memory_tile_ids = [];
}

function clear(){
	document.getElementById('memory-board').innerHTML = "";
	newBoard();
}

function restart(){
	for (let i = 0; i < memory_array.length; i++) {
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
	let tile1 = document.getElementById(memory_tile_ids[0]);
	let tile2 = document.getElementById(memory_tile_ids[1]);

	tile1.style.transition = "opacity .5s linear 0s";
	tile1.style.opacity = "0";
	setTimeout(function delay(){
		tile2.style.transition = "opacity .5s linear 0s";
		tile2.style.opacity = "0";		
	}, 250);
	memory_values = [];
	memory_tile_ids = [];
}

function memoryFlipTile(tile, val){
	if(tile.style.transform != "perspective(600px) rotateY(180deg)" && memory_values.length < 2){
		tile.style.transition = "transform .5s linear 0s";
		tile.style.transform = "perspective(600px) rotateY(180deg)";
		setTimeout(changeBack, 250, tile, val);

		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;

				setTimeout(vanish(), 500);

				if(tiles_flipped == memory_array.length){
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
	for(let i = 0; i < memory_backs.length; i++){
		output += '<div id="tile_'+ i +'"style="background: url(Backs/' + memory_backs[i] + '.png); no-repeat; background-size: cover;" onclick="changeSleeve(\'' + i + '\')"></div>';
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
	picked_back = num;
	for (let i = 0; i < memory_array.length; i++) {
		let tile = document.getElementById('tile_' + i);
		if (tile.style.transform != "perspective(600px) rotateY(180deg)") {
			tile.style.transition = "background .5s linear 0s";
			tile.style.background = 'url(Backs/' + memory_backs[picked_back] + '.png)';
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