const endpoint = 'http://localhost:3000/api/v1'
const signupUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
// const postsUrl = `${endpoint}/posts`
const validateUrl = `${endpoint}/validate`

const jsonify = res => {
    if (res.ok)
        return res.json()
}
const handleServerError = response => console.error(response)

const constructHeaders = (moreHeaders = {}) => (
    {
        'Authorization': localStorage.getItem('token'),
        ...moreHeaders
    }
)

const signUp = (user) => fetch(signupUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
}).then(jsonify)
    .then(data => {
        localStorage.setItem('token', data.token)
        return data.user
    })
    .catch(handleServerError)


const logIn = (user) => fetch(loginUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
}).then(jsonify)

const validateUser = () => {
    if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

    return fetch(validateUrl, {
        headers: constructHeaders()
    }).then(jsonify)
        .then(data => {
            localStorage.setItem('token', data.token)
            return data.user
        })
        .catch(handleServerError)
}

const clearToken = () => localStorage.removeItem('token')

const getData = () => {
    fetch('http://localhost:3000/api/v1/orders')
    .then(resp => resp.json())
    .then(console.log)
}

export default {
    signUp,
    logIn,
    validateUser,
    clearToken,
    getData
}