

const getCountyInfo = countryName => {
    axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {

            const countryDetails = response.data
            countryDetails.forEach(country => {
                const countryBox = document.createElement('div')
                document.querySelector('#countries').appendChild(countryBox)
                const countryOfficialName = country.name.official
                const countryCommonName = country.name.common
                const countryFlag = country.flags.png
                const countryBorders = document.createElement('ul')
                countryBox.innerHTML = `
                <hr>
                <h1>Official Name: ${countryOfficialName}</h1>
                <h1>Common Name: ${countryCommonName}</h1>
                <img src="${countryFlag}" alt="">
                <h2>Borders with:</h2>
                `
                countryBox.appendChild(countryBorders)
                country.borders?.forEach(bor => {
                    let borderCode = bor
                    axios
                        .get(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                        .then(response => {
                            const borDetails = response.data
                            let borName = document.createElement('li')
                            let borData = borDetails[0].name.common
                            borName.innerHTML = `${borData}`
                            countryBorders.appendChild(borName)
                            borName.addEventListener('click', () => {
                                document.querySelector('#countries').innerHTML=''
                                getCountyInfo(`${borData}`)
                            })


                        })
                });
            })
        })
}

const countryBtn = document.querySelector('#get-country-btn')
countryBtn.addEventListener('click', () => {
    const userInput = document.querySelector('#country-name-input').value
    document.querySelector('#countries').innerHTML = ''
    getCountyInfo(userInput)

})