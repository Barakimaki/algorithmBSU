const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
let mas = [];
let count = 0;
let timer;

canvas.onclick = function(event){
	let x = event.offsetX;
	let y = event.offsetY;
	x = Math.floor(x/50);
	y = Math.floor(y/50);
	mas[y][x]=1;
	drawField();
}

function goLife(){
	const n = 20, m = 20;
	for (let i=0; i<m; i++){
		mas[i]=[];
		for (let j=0; j<n; j++){
			mas[i][j]=0;
		}
	}
}
goLife();

function drawField(){
	ctx.clearRect(0, 0, 1000, 1000);
	for (let i=0; i<20; i++){
		for (let j=0; j<20; j++){
			if (mas[i][j]===1){
				ctx.fillStyle = `rgb(156, 185, 12)`;
				ctx.fillRect(j*50, i*50, 50, 50);
			}
		}
	}
}

function startLife(){
	const mas2 = [];
	for (let i=0; i<20; i++){
		mas2[i]=[];
		for (let j=0; j<20; j++){
			let neighbors = 0;
			if (mas[fpm(i)-1][j]===1) neighbors++;
			if (mas[i][fpp(j)+1]===1) neighbors++;
			if (mas[fpp(i)+1][j]===1) neighbors++;
			if (mas[i][fpm(j)-1]===1) neighbors++;
			if (mas[fpm(i)-1][fpp(j)+1]===1) neighbors++;
			if (mas[fpp(i)+1][fpp(j)+1]===1) neighbors++;
			if (mas[fpp(i)+1][fpm(j)-1]===1) neighbors++;
			if (mas[fpm(i)-1][fpm(j)-1]===1) neighbors++;
			if((neighbors===2 || neighbors===3) && mas[i][j]===1){
				mas2[i][j] = 1
			}else if(neighbors===3 && mas[i][j]===0) {
				mas2[i][j] = 1
			} else {
				mas2[i][j] = 0
			}
		}
	}
	mas = mas2;
	drawField();
	count++;
	document.getElementById('count').innerHTML = count;
	timer = setTimeout(startLife, 500);
}

function fpm(i){
	if(i===0) return 20;
	else return i;
}
function fpp(i){
	if(i===19) return -1;
	else return i;
}

document.getElementById('start').onclick = startLife;