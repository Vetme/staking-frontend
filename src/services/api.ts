export const BaseURL = import.meta.env.MODE
    == "production"
    ? "https://kyc-api.vetmeblock.com/api/v1"
    : "http://localhost:8080/api/v1";



export const createStake = async (data: any) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    return await fetch(BaseURL + '/stake', options);
}


export const getStake = async (account: string | undefined) => {
    if (!account) return;
    return await fetch(BaseURL + '/stake/' + account).then((res) => res.json());
}

export const getStakes = async () => {
    return await fetch(BaseURL + '/stake');
}

export const createWithdraw = async (data: any) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    return await fetch(BaseURL + '/stake/withdraw', options);
}


export const createReward = async (data: any) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    return await fetch(BaseURL + '/stake/reward', options);
}
