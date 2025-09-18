// console.log('Client side javascript file is loaded!')


const button = document.querySelector('button')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const icon = document.querySelector('#img1')
const div1 = document.querySelector('#div1')

button.addEventListener('click', () => {
    const locate = search.value
    msg1.textContent = 'Loading.....'
    msg2.textContent = ''

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locate}&APPID=f9fb7fd69d0956edbb240180abdc359b`).then((response) => {
        response.json().then((data) => {
            const iconcode = data.weather[0].icon
            // console.log(data)
            const iconurl = `https://openweathermap.org/img/w/${iconcode}.png`
            icon.setAttribute("src", iconurl)
            icon.setAttribute("alt", "weather icon")
            icon.style.visibility = 'visible'
            div1.style.visibility = 'visible'

            if (locate.length < 1) {
                msg1.textContent = "please input a location"
            }
            // console.log(data)
            else if (data.message) {
                msg1.textContent = 'City not found. Please search for a valid location'
            }else {
                msg1.textContent = `Forcast : ${data.weather[0].description}`
                msg2.textContent = `Country : ${data.sys.country}`

            }
        })
    })
})
