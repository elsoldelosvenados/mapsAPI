class API {
      async getData() {

            const data  = await fetch('https://www.datos.gov.co/resource/ittk-mcrf.json')

            const JSONResponse = await data.json()
            return {
                  JSONResponse
            }
      }
}
