const getUser = async (token) => {

    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    };

    const response = await fetch('http://localhost:3000/api/user/auth', requestOptions);

}