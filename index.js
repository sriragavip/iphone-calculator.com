window.onload = function(){
let result = document.getElementById('result');
let ac = document.getElementById('ac');
let mp = document.getElementById('mp');
let perc = document.getElementById('perc');
let equal = document.getElementById('equal');
let numbers = document.getElementsByClassName('numbers');
let operators = document.getElementsByClassName('operators');
let ups = document.getElementsByClassName('ups');
let screen = {
	cur: result.textContent,
	history: Array(3),
	flag: false,
	operand1: '0',
	operand2: '',
	activeOperator: '',
	len(){
	return this.cur.match(/\d/g).length;
	},
	clear(){
		this.operand1 = '0';
		this.operand2 = '';
		this.activeOperator = ''
	},
	resetAll(){
		this.clear();
		this.cur = '0';
		this.flag = false;
		this.history = [];
	},
	calculate(){
		this.operand2 = this.operand2? this.operand2: this.operand1;
		return eval(`${this.operand1} ${this.activeOperator} ${this.operand2}`).toString()
	}
}
let res = screen.cur;
for (var operator of operators){
	operator.addEventListener('touchstart', bgClickForOperators);
	operator.addEventListener('touchend', changeToNormalForOperators);
	operator.addEventListener('click', operatorsFunction);
}
operator.removeEventListener('click', operatorsFunction);
operator.removeEventListener('touchstart', bgClickForOperators);
operator.removeEventListener('touchend', changeToNormalForOperators);
operator.addEventListener('touchstart', bgClickForEqual);
operator.addEventListener('touchend', changeToNormalForEqual);
for (let upbutton of ups){
upbutton.addEventListener('touchstart', bgClickForUps) //----
	upbutton.addEventListener('touchend', changeToNormalForUps) //----
}
for (let number of numbers){
	number.addEventListener('touchstart', bgClickForNumbers) //----
	number.addEventListener('touchend', changeToNormalForNumbers) //----
	number.addEventListener('click',display);
}
function display(e) {

	let len = screen.len();
	n = this.textContent;

	if (len < 9){

		if (res == '0'){

			if (n != '0'){
				ac.textContent = 'C';

				if (n != '.'){
				res = n;
				screen.cur = res
				result.textContent = res;
				screen.flag = false;
				}

				else{
					res += n;
					screen.flag = false;
				 	result.textContent = res;
				 	screen.cur = res;
				}
			}

			else {
				res = n;
				screen.cur = res
				result.textContent = res;
				//screen.flag = false;
			}
		}
		else{
			if (n == '.'){
				if (!(/[.]/.test(res))){
				   res += n;
				   result.textContent = res;
				   screen.flag = false;
				}
			}
			else{
				if (screen.flag){
					res = n;
					result.textContent = res;
					screen.flag = false;
				}
				else{
					res += n;
					if (/[.]/.test(res)){
			let pos = res.indexOf('.');
			let p1 = res.slice(0, pos);
			let p2 = res.slice(pos, res.length)
			let combined = Number(p1).toLocaleString('en', {maximumFractionDigits: 15}) + p2;
			result.textContent = combined;
					}
					else{
					result.textContent = Number(res).toLocaleString('en', {maximumFractionDigits: 15});
					}
				}
			}
			screen.cur = res;
			adjustDisplayLength(screen.len(), res);
		}
	}
}
equal.addEventListener("click", e => {
	let solution;
	if(screen.activeOperator){
		screen.operand2 = screen.cur;
		solution = screen.calculate();
		res = solution;
		screen.cur = solution;
		result.textContent = Number(solution).toLocaleString('en', {maximumFractionDigits: 15});
		adjustDisplayLength(screen.len(), res);
		screen.clear();
	}
})
function operatorsFunction(e){
	let o = this.textContent;

	if (o == '÷'){o = '/'}

	else if(o == '×'){o = '*'}

	else if (o == '–'){o = '-'}

	else{o = '+'}


	if (screen.activeOperator){

		screen.operand2 = screen.cur;

		let solution = screen.calculate();
		result.textContent = Number(solution).toLocaleString('en', {maximumFractionDigits: 15});

		screen.cur = solution;
		res = '0';
		screen.operand1 = solution;
		screen.operand2 = '';
		screen.flag = true;
		screen.activeOperator = o;
	}

	else{
		screen.activeOperator = o;
		screen.flag = true;
		screen.operand1 = screen.cur;
		screen.cur = '0';
		res = '0';
	}


}

//————————————————————————————————————————
		//background colors functions

function bgClickForOperators(){
		this.style.backgroundColor = '#e7e7e9';
		this.style.color = '#ff9f1a';

	}

function changeToNormalForOperators(){

	setTimeout(() => {
		this.style.backgroundColor = '#ff9f1a';
		this.style.color = '#fff';
		}, 150)
	}

function bgClickForNumbers(){
		this.style.backgroundColor = '#6932c8';

	}


function changeToNormalForNumbers(){

	setTimeout(() => {
		this.style.backgroundColor = '#343434';
		}, 120)
	}

function bgClickForUps(){
		this.style.backgroundColor = '#dfdfdd';
	}

function changeToNormalForUps(){

	setTimeout(() => {
		this.style.backgroundColor = '#adada8';
		}, 90)
	}

function bgClickForEqual(){
		this.style.backgroundColor = '#ccf118';
	}

function changeToNormalForEqual(){

	setTimeout(() => {
		this.style.backgroundColor = '#ff9f1a';
		}, 130)
	}

//————————————————————————————————————————		#for erasing function
ac.addEventListener("click", e =>{

	ac.textContent = 'AC';
	screen.resetAll();
	res = screen.cur;
	result.textContent = res;
	result.style.fontSize = "5.75rem";


});


//————————————————————————————————————————
		//minus--plus function

mp.addEventListener('click', e => {
	let len = screen.len();

	res *= -1;

	res = res.toString();
	screen.cur = res;

	result.textContent = res;
	adjustDisplayLength(screen.len(), res);

})
//————————————————————————————————————————
	//percentage button function

perc.addEventListener('click', e => {

	res /= 100;

		res = res.toString()
		screen.cur = res;
		result.textContent = res;
		adjustDisplayLength(screen.len(), res);
})
function adjustDisplayLength(len, res){
	if (count(res, "1") >= 9 ){
		result.style.fontSize = "5.75rem";
	}
	else if (count(res, "1") >= 8){
		result.style.fontSize = "5.4rem";
	}
	else if (count(res, "1") >= 4){
		result.style.fontSize = "4.7rem";
	}
	else {
	if (len > 15) {
		result.style.fontSize = "1.68rem";
		result.style.paddingRight ='2rem';
		}
	else if (len >= 10) {
		result.style.fontSize = "2.7rem";
		result.style.paddingRight ='2rem';
	}
	else if (len >= 9) {
		result.style.fontSize = "3.75rem";
		result.style.paddingRight ='2rem';
		}
	else if (len >= 8){
		result.style.fontSize = "4.3rem";
		}
	else if (len >= 7){
		result.style.fontSize = "4.75rem";
		}
	else {
		result.style.fontSize = "5.75rem";
		}
	}
}
function count(str, val){
	let c = 0;
	for (let i of str){
		if (i == val) c++;
	}
	return c;
}
};
