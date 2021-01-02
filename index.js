const fetch = require('node-fetch')

module.exports = class qido {

    constructor(app) {
        this.basePath = 'https://qi.do'
        this.app = app
        this.token = null
    }

    request(endpoint = '', options = {}, token = null) {
        let url = this.basePath + endpoint
        options.headers = {'Content-Type': 'application/json'}
        if (!token) token = this.getToken()
        if (token) options.headers.authorization = 'Bearer ' + token
        return fetch(url, options).then(res => {
            if (res.ok) return res.json()
            throw res.statusText
        })
    }

    auth(user, pass) {
        let url = '/a/' + this.app + '/' + user + '/' + pass
        return this.request(url, {method: 'GET'})
    }

    create(path, object, token = null) {
        const options = {
            method: 'POST',
            body: JSON.stringify(object),
        }
        return this.request('/c/' + this.app + '/' + path, options, token)
    }

    read(path, token = null) {
        let url = '/r/' + this.app + '/' + path
        return this.request(url, {method: 'GET'}, token)
    }

    update(path, props, token = null) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(props),
        }
        return this.request('/u/' + this.app + '/' + path, options, token)
    }

    delete(path, token = null) {
        let url = '/d/' + this.app + '/' + path
        return this.request(url, {method: 'DELETE'}, token)
    }

    subscribe(subscription, token = null) {
        let url = '/x/' + this.app + '/p/s'
        let options = {
            method: 'POST',
            body: JSON.stringify(subscription)
        }
        return this.request(url, options, token)
    }

    broadcast(notification, audience = null, token = null) {
        let url = '/x/' + this.app + '/p/b'
        let options = {
            method: 'POST',
            body: JSON.stringify(notification)
        }
        if (audience) url = url + '?q=' + JSON.stringify(audience)
        return this.request(url, options, token)
    }

    getToken() {
        return this.token || localStorage.getItem('token') || sessionStorage.getItem('token')
    }
}
