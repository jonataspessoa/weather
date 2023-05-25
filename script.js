document.querySelector('.busca').addEventListener('submit', async (e) => {
	e.preventDefault();

	let input = document.querySelector('input').value;
	if(input !== '') {
		showWarning('Carregando...');

		let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e92fad311229a10c3b1062dc60ab8684&units=metric&lang=pt_br`;
		let req = await fetch(url)
		let json = await req.json();

		showWarning('');

		if(json.cod === 200 ){
			document.querySelector('.resultado').style.display = 'block';
			document.querySelector('.titulo').innerHTML = `${json.name}, ${json.sys.country}`;
			document.querySelector('.tempInfo').innerHTML = `${json.main.temp_max}<sup>ºC</sup>`;
			document.querySelector('.ventoInfo').innerHTML = `${json.wind.speed}<span>km/h</span>`;
			document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
			document.querySelector('.ventoPonto').style.transform = `rotate(${json.wind.deg-90}deg)`;

			input = document.querySelector('input').value = '';
		}

		} else {
			document.querySelector('.resultado').style.display = 'none';
			showWarning('Cidade não encontrada!');
			input = document.querySelector('input').value = '';
	}
})

function showWarning(msg) {
	document.querySelector('.aviso').innerHTML = msg;
}