export default class SwapiResorse {
	_swapi = 'https://swapi.co/api/'

	getResorse = async (url) => {
		const res = await fetch(this._swapi + url)

		if (!res.ok) {
			throw new Error(`Cannot find url ${res.url}! Code ${res.status}`)
		}
		const body = await res.json()
		return body
	}

	async getPerson(id){
		const person = await this.getResorse(`people/${id}/`)
		return this._transformPeople(person)
	}
	async getAllPeople(){
		const res = await this.getResorse('people/')
		return res.results.map( this._transformPeople )
	}

	async getPlanet(id){
		const planet = await this.getResorse(`planets/${id}/`)
		return this._transformPlanet(planet)
	}
	async getAllPlanets(){
		const res = await this.getResorse('planets/')
		return res.results.map( this._transformPlanet )
	}

	async getStarship(id){
    	const ship = await this.getResource(`/starships/${id}/`)
    	return this._transformShip(ship)
  	}
 	async getAllStarships(){
    	const res = await this.getResource('starships/')
    	return res.results.map( this._transformShip )
  	}

  	_extractId = (item) => {
  		const re = /\/([0-9]*)\/$/
  		const id = item.url.match(re)[1]
  		
  		return id
  	}

  	_transformPlanet = (planet) => {
  		const id = this._extractId(planet);
  		return {
            id,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
  		}
  	}

  	_transformShip = (ship) => {
  		const id = this._extractId(ship);
  		return {
  			id,
  			name: ship.name,
  			model: ship.model,
  			manufacturer: ship.manufacturer,
  			cost_in_credits: ship.cost_in_credits,
  			length: ship.length
  		}
  	}

  	_transformPeople = (person) => {
  		const id = this._extractId(person);
  		return {
  			id,
  			name: person.name,
  			height: person.height,
  			mass: person.mass,
  			hairColor: person.hair_color,
  			skinColor: person.skin_color,
  			eyeColor: person.eye_color,
  			birthYear: person.birth_year,
  			gender: person.gender
  		}
  	}
}