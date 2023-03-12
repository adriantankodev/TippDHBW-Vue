import { authHeader } from "./auth";

const getCurrentMatchday = async () => {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`http://localhost:3000/api/match/currentmatchday`, requestOptions);
    const status = response.status;
    const json = await response.json();

    if(status === 200) {
        return json.currentMatchday;
    } else {
        return null;
    }
};

const getMatches = async (matchday) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`http://localhost:3000/api/match/2022/${matchday}`, requestOptions);
    const status = response.status;
    const json = await response.json();

    if(status === 200) {
        return json;
    } else {
        return null;
    }
};

const getTipps = async () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`http://localhost:3000/api/tipp`, requestOptions);
    const status = response.status;
    const json = await response.json();

    if(status === 200) {
        return json;
    } else {
        return [];
    }
}

const submitTipp = async (tipp) => {

    const bearerToken = authHeader().Authorization;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken
        },
        body: JSON.stringify(tipp)
    };

    console.log(tipp)

    let response = await fetch(`http://localhost:3000/api/tipp`, requestOptions);
    let status = response.status;

    if(status === 200) {
        return true;
    } else {
        return false;
    }

};

const getUsers = async () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`http://localhost:3000/api/user/all`, requestOptions);
    const status = response.status;
    const json = await response.json();

    if(status === 200) {
        return json;
    } else {
        return [];
    }
}

export {
    getCurrentMatchday,
    getMatches,
    submitTipp,
    getTipps,
    getUsers
}
