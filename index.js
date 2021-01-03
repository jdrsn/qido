const fetch = require('node-fetch')
const headers = {'Content-Type': 'application/json'}

module.exports = class qido {

    constructor(app) {
        this.basePath = 'https://qi.do'
        this.app = app
        this.token = null
    }

    request(endpoint = '', options = {}, token = null) {
        let url = this.basePath + endpoint
        if (!token) token = this.getToken()
        if (token) options.headers.authorization = 'Bearer ' + token
        return fetch(url, options).then(res => {
            if (res.ok) return res.json()
            throw res.statusText
        })
    }

    auth(user, pass) {
        let url = '/a/' + this.app + '/' + user + '/' + pass
        return this.request(url, {method: 'GET', headers: headers})
    }

    create(path, object, upload = false, token = null) {
        if (!upload) object = JSON.stringify(object)
        const options = {
            method: 'POST',
            body: object,
            headers: headers
        }
        if (upload) options.headers = {}
        return this.request('/c/' + this.app + '/' + path, options, token)
    }

    read(path, token = null) {
        let url = '/r/' + this.app + '/' + path
        return this.request(url, {method: 'GET', headers: headers}, token)
    }

    update(path, props, upload = false, token = null) {
        if (!upload) props = JSON.stringify(props)
        const options = {
            method: 'PUT',
            body: props,
            headers: headers
        }
        if (upload) options.headers = {}
        return this.request('/u/' + this.app + '/' + path, options, token)
    }

    delete(path, token = null) {
        let url = '/d/' + this.app + '/' + path
        return this.request(url, {method: 'DELETE', headers: headers}, token)
    }

    subscribe(subscription, token = null) {
        let url = '/x/' + this.app + '/p/s'
        let options = {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: headers
        }
        return this.request(url, options, token)
    }

    broadcast(notification, audience = null, token = null) {
        let url = '/x/' + this.app + '/p/b'
        let options = {
            method: 'POST',
            body: JSON.stringify(notification),
            headers: headers
        }
        if (audience) url = url + '?q=' + JSON.stringify(audience)
        return this.request(url, options, token)
    }

    getToken() {
        return this.token || localStorage.getItem('token') || sessionStorage.getItem('token')
    }
}
