export const baseurl = "https://backtradeapp.com/api";

export const token = () => {
    const token = localStorage.getItem("authResponse");
    if (!token) {
        throw new Error("Token no encontrado");
    }

    return {
        headers: {
            tgwr_token: token,
        },
    };
};

