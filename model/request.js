// const stitch = require("mongodb-stitch")

module.exports = {

    Request: class {

        constructor(author, title, content) {
            this._rId = -1
            this.author = author
            this.title = title
            this.content = content
            this.lat = 0
            this.lon = 0
            this._date = null
            this._time = null
            this._duration = null
            this.tags = []
            this._needed = 0
            this._current = 0
            this._ver = 0.5
        }

        get current() {
            return this._current
        }

        set current(value) {
            if (value > this.needed || value < 0) {
                return false
            } else {
                this._current = value
                return true
            }
        }

        get needed() {
            return this._needed
        }

        set needed(value) {
            if (value < 0) {
                return false
            } else if (value < this._current) {
                this._current = value
                // TODO this could be a really bad way to do it but whatever
            }
            this._needed = value
            return true


        }

        submit(collection) {
            return collection.insertOne(this)
        }

        toFormattedString() {
            return this.toString()
        }
    }
}