const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const historyBtn = document.querySelector(".history");
const stopwatch = document.querySelector(".stopwatch");
const time = document.querySelector(".time");
const timeList = document.querySelector(".time-list");

const infoBtn = document.querySelector(".info");
const modalShadow = document.querySelector(".modal-shadow");
const closeModalBtn = document.querySelector(".close");
let countTime;
let minutes = 0;
let seconds = 0;
let timesArray = [];

const handleStart = () => {
	clearInterval(countTime);

	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++;
			stopwatch.textContent = `${minutes}:0${seconds}`;
			console.log(seconds);
		} else if (seconds >= 9 && seconds < 59) {
			seconds++;
			stopwatch.textContent = `${minutes}:${seconds}`;
		} else {
			minutes++;
			seconds = 0;
			stopwatch.textContent = `${minutes}:0`;
		}
	}, 100);
};

const handlePause = () => {
	clearInterval(countTime);
};

const handleStop = () => {
	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`;

	if (stopwatch.textContent !== `0:00`) {
		time.style.visibility = "visible";
		timesArray.push(stopwatch.textContent);
		console.log(timesArray);
	}

	clearSuff();
};

const handleReset = () => {
	time.style.visibility = "hidden";
	timesArray = [];
	clearSuff();
};

const clearSuff = () => {
	clearInterval(countTime);
	stopwatch.textContent = `0:00`;
	timeList.textContent = "";
	minutes = 0;
	seconds = 0;
};

const handleHistory = () => {
	timeList.textContent = "";
	let num = 1;

	timesArray.forEach((time) => {
		const newTime = document.createElement("li");
		newTime.innerHTML = `Pomiar nr ${num}:<span>${time}</span>`;

		timeList.appendChild(newTime);
		num++;
	});
};
const handleModal = () => {
	if (!(modalShadow.style.display === "block")) {
		modalShadow.style.display = "block";
	} else {
		modalShadow.style.display = "none";
	}
	modalShadow.classList.toggle("modal-animation");
};
const handleModalCloseAnimation = () => {
	modalShadow.classList.add("modal-animation-close");
	setTimeout(function () {
		modalShadow.classList.remove("modal-animation-close", "modal-animation");
		modalShadow.style.display = "none";
	}, 500);
};

startBtn.addEventListener("click", handleStart);
pauseBtn.addEventListener("click", handlePause);
stopBtn.addEventListener("click", handleStop);
resetBtn.addEventListener("click", handleReset);
historyBtn.addEventListener("click", handleHistory);
infoBtn.addEventListener("click", handleModal);
closeModalBtn.addEventListener("click", handleModalCloseAnimation);
window.addEventListener("click", (e) => (e.target === modalShadow ? handleModalCloseAnimation() : false));
