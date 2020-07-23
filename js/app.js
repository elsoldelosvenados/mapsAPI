/**
  * Instance both class (UI and on its contructor the API class)
*/
const UI = new Interface()

document.addEventListener('DOMContentLoaded', () =>{

      UI.showEstablishments()
})

/**
  * Allow real time search
*/
const seeker = document.querySelector('#buscar input')

seeker.addEventListener('input', ()=>{

      if(seeker.value.length > 3){
            UI.getSeuggest(seeker.value)
      } else if (seeker.value.length === 0) {
            UI.showEstablishments()
      }
})
