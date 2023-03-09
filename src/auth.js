const authHeader = () => {
    let user = JSON.parse(localStorage.getItem('token'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}

const register = async (username, email, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    };

    const response = await fetch(`http://localhost:3000/api/user/register`, requestOptions);
    const status = response.status;
    const json = await response.json();
    console.log(json)

    if(status === 200 && json.token) {
        
        localStorage.setItem('token', JSON.stringify(json.token));

        let redirect = new URLSearchParams(window.location.search).get('redirect');
        if (!redirect) {
            redirect = '/';
        }

        return { 'msg': 'Registration successful', 'redirect': redirect };
    } else {
        return { 'msg': json.msg, 'redirect': null };
    }

}

const login = async (email, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    const response = await fetch(`http://localhost:3000/api/user/login`, requestOptions);
    const status = response.status;
    const json = await response.json();

    if(status === 200 && json.token) {

        localStorage.setItem('token', JSON.stringify(json.token));

        let redirect = new URLSearchParams(window.location.search).get('redirect');
        if (!redirect) {
            redirect = '/';
        }

        return { 'msg': 'Login successful', 'redirect': redirect };
    } else {
        return { 'msg': json.msg, 'redirect': null };
    }
}

const validateToken = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    };

    const response = await fetch(`http://localhost:3000/api/user/auth`, requestOptions);

    let json;
    try {
        json = await response.json();
    } catch (e) {
        return console.log(e)
    }

    return json;
}

export {
    authHeader,
    validateToken,
    register,
    login
}