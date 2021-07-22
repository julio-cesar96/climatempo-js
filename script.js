document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    if (input !== '') {
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=4f47625751700cd6f5666a7b24733141&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let data = await results.json();

        if(data.cod === 200) {
            showInfo({
                name: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                tempIcon: data.weather[0].icon,
                windSpeed: data.wind.speed,
                windAngle: data.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta cidade.');
        }
    }
});

function showInfo(data) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${data.name}, ${data.country}`;
    document.querySelector('.tempInfo').innerHTML = `${data.temp} <sup>Cº</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${data.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${data.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${data.windAngle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}