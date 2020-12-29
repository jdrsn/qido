const fetch = require('node-fetch')
const headers = {'Content-Type': 'application/json'}

module.exports = class qido {

    constructor(app) {
        this.app = app
        this.basePath = 'https://qi.do'
    }

    request(endpoint = '', options = {}) {
        let url = this.basePath + endpoint

        return fetch(url, options).then(r => {
            if (r.ok) {
                return r.json()
            }
            return r
        })
    }

    auth(user, pass) {
        let url = '/a/' + this.app + '/' + user + '/' + pass
        let config = {
            method: 'GET',
            headers: headers
        }
        return this.request(url, config)
    }

    create(path, body, token = '') {
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        }
        options.headers.authorization = 'Bearer ' + token
        return this.request('/c/' + this.app + '/' + path, options)
    }

    read(path, token = '') {
        let url = '/r/' + this.app + '/' + path
        let options = {
            method: 'GET',
            headers: headers
        }
        options.headers.authorization = 'Bearer ' + token
        return this.request(url, options)
    }

    update(path, body, token = '') {
        const options = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: headers
        }
        options.headers.authorization = 'Bearer ' + token
        return this.request('/u/' + this.app + '/' + path, options)
    }

    delete(path, token = '') {
        let url = '/d/' + this.app + '/' + path
        let options = {
            method: 'DELETE',
            headers: headers
        }
        options.headers.authorization = 'Bearer ' + token
        return this.request(url, options)
    }
}
