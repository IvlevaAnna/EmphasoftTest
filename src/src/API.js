export const getToken = (username, password) => {
    return fetch('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                username: username,
                password: password
            }
        )
    })
        .then(result => result.json())
}

export const getData = (token) => {
    return fetch('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
        method: 'GET',
        headers: {
            "Authorization": `Token ${token}`
        }
    })
        .then(result => result.json())
}
