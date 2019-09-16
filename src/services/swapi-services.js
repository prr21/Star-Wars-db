class SwapiResorse {
	_swapi = 'https://swapi.co/api/'

	getResorse = async (url) => {
		const res = await fetch(this._swapi + url)
		
		if (!res.ok) {
			throw new Error('Something wrong! Code ' + res.status)
		}
		const body = await res.json()
		return body
	}

	getPerson = (id) => {
		return this.getResorse(`people/${id}/`)
	}

	async getAllPeople(){
		const res = await this.getResorse('people/')
		return res.results
	}
	getPlanet = (id) => {
		return this.getResorse(`planet/${id}/`)
	}

	async getAllPlanets(){
		const res = await this.getResorse('planet/')
		return res.results
	}
}

const swapi = new SwapiResorse()