const compose = (...func) => (wrap) => {
	return func.reduceRight((prevFunc, f) => f(prevFunc), wrap)
}

export default compose