class Interface {

      constructor(){

            this.api = new API()
            this.markers = new L.layerGroup()
            this.map  = this.initializeMap()


      }
      /**
        * @description Initialize a map with the loaction and
        * the zoom then print on the DOM.
        * @return {object} map
        * @author Andres Acosta
      */
      initializeMap() {

            const map = L.map('mapa').setView([6.228458, -75.6091506],12)
            const linkMap = '<a href="http://openstreetmap.org">OpenStreetMap</a>'
            L.tileLayer(
                  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; ' + linkMap + ' Contributors',
                  maxZoom: 18,
            }).addTo(map)

            return map
      }
      /**
        * @description Get the points where they sell gasolina
        * throught a call to method getData() then invoke the fuction
        * to print them on teh DOM
        * @return {void}
        * @author Andres Acosta
      */
      showEstablishments() {
            this.api.getData()
                  .then(data =>{

                        const result = data.JSONResponse
                        /**
                         * Show pins on the map
                        */
                        this.showPins(result)
                  })
      }
      /**
        * @description Mark each point of sale of gasoline
        * provided in the parameters on the map.
        * @param {object} data contains the points to be marked
        * @return {void}
        * @author Andres Acosta
      */
      showPins(data) {
            this.markers.clearLayers()
            data.pop()

            const  customIcon = new L.Icon({
            iconUrl: 'images/icon.png',
            iconSize: [40, 40],
            iconAnchor: [25, 50]
            });+

            data.forEach(dataEach => {

                  const {any, latitude, longitude} = dataEach
                  const PopUpOptions = L.popup()
                  .setContent(`<p>Ciudad: ${dataEach.ciudad}</p>
                            <p></p><b>Adress:</b>$ ${dataEach.direccion}</p>
                            <p> <b>Ubicacion:</b>$ ${dataEach.ubicacion}</p>`)

                  const marker = new L.marker([
                        parseFloat(dataEach.coordenadas.latitude),
                        parseFloat(dataEach.coordenadas.longitude)
                  ],{icon: customIcon})
                  .bindPopup(PopUpOptions)

                  this.markers.addLayer(marker)
            })

            this.markers.addTo(this.map)

      }
      /**
        * Get suggest from REST AP
      */
      getSeuggest(search) {
            this.api.getData()
                .then(data => {
                      const result = data.JSONResponse
                      this.filterSuggest(result, search)
                })
      }

      /**
        * @description Make a comparison between a value of the object and
        * what the user writes in real time.
        * @param {object} results the response of API with the places where
        * they sell gasoline
        * @param {string} search waht the user is writing ritgh now
        * @return {void}
        * @author Andres Acosta
      */
      filterSuggest(results, search) {

            const filter = results.filter(toFilter => toFilter.ubicacion.indexOf(search) !== -1)

            this.showPins(filter)
      }





}
