const client = require('@qido/client')
const qido = new client('app')
qido.auth('u@u.uu', 'uuuuuu').then(res => {
    let token = res.data.token
    qido.create('array', {test: "lulu", hey: false}, token).then(data => console.log(data))
    qido.create('array/objId', {test: "lulu", hey: false}, token).then(data => console.log(data))
    qido.read('array', token).then(data => console.log(data))
    qido.read('array/objId', token).then(data => console.log(data))
    qido.update('array/objId', {test: "lili", hey: true}, token).then(data => console.log(data))
    qido.delete('array/objId', token).then(data => console.log(data))
})
