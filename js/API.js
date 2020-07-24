class API {
      /**
        * @description Get JSON file from a page of goverment of colombia
        * that conatins the points where they sell gasoline and return it as a object.
        * @return JSONResponse the response of the call to API
        * @author Andres Acosta
      */
      async getData() {

            const data  = await fetch('https://www.datos.gov.co/resource/ittk-mcrf.json')

            const JSONResponse = await data.json()
            return {
                  JSONResponse
            }
      }
}
