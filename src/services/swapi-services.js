export default class SwapiResorse {
	_swapi = 'https://swapi.dev/api/'
	_imageBase = 'https://starwars-visualguide.com/assets/img'

	getResourse = async (url) => {
		const res = await fetch(this._swapi + url)

		if (!res.ok) {
			throw new Error(`Cannot find url ${res.url}! Code ${res.status}`)
		}
		const body = await res.json()
		return body
	}

	getPerson = async (id) =>{
		const person = await this.getResourse(`people/${id}/`)
		return this._transformPeople(person)
	}
	getPlanet = async (id) => {
		const planet = await this.getResourse(`planets/${id}/`)
		return this._transformPlanet(planet)
	}
	getStarship = async (id) => {
  	const ship = await this.getResourse(`starships/${id}/`)
  	return this._transformShip(ship)
  }
  
	getAllPeople = async () => {
		const res = await this.getResourse('people/')
		return res.results.map( this._transformPeople )
	}
	getAllPlanets = async () => {
		const res = await this.getResourse('planets/')
		return res.results.map( this._transformPlanet )
	}
 	getAllStarships = async () => {
  	const res = await this.getResourse('starships/')
  	return res.results.map( this._transformShip )
  }

  getImagePerson = (id) => {
    return `${this._imageBase}/characters/${id}.jpg`
  }
  getImagePlanet = (id) => {
    return `${this._imageBase}/planets/${id}.jpg`
  }
  getImageStarship = (id) => {
    return `${this._imageBase}/starships/${id}.jpg`
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
            diameter: planet.diameter,
            climate: planet.climate
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
