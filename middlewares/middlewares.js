class Middlewares {
    static parseData = (req, res, next) => {
        console.log(req,req)
        if (req.method === 'POST') {
            const formData = {}
            req.on('data', data => {

                // Decode and parse data
                const parsedData = decodeURIComponent(data).split('&')

                for (let data of parsedData) {

                    var decodedData = decodeURIComponent(
                        data.replace(/\+/g, '%20'))

                    const [key, value] =
                        decodedData.split('=')

                    // Accumulate submitted
                    // data in an object
                    formData[key] = value
                }

                // Attach form data in request object
                req.body = formData
                return next()
            })
        } else {
            return next()
        }
    }
}

module.exports = Middlewares;
