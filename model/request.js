class Request {

    constructor(author, title, content, lat, lon, tags) {
        this.author = author
        this.title = title
        this.content = content
        this.lat = lat
        this.lon = lon
        this.tags = tags
    }

    submit() {
        // send data to mongo
    }

    addTime() {
        //
    }

    addLocation() {
        // GIS
    }

    addResponse(user) {

    }



}