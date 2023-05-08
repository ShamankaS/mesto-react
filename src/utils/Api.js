class Api {
    constructor(data) {
        this._url = data.baseUrl;
        this._headers = data.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    async getUserInfo() {
        const res = await fetch(`${this._url}/users/me`, {
            headers: this._headers
        });
        return this._handleResponse(res);
    }

    async getInitialCards() {
        const res = await fetch(`${this._url}/cards`, {
            headers: this._headers
        });
        return this._handleResponse(res);
    }

    async setUserInfo(userInfo) {
        const res = await fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about
            })
        });
        return this._handleResponse(res);
    }

    async addNewCard(data) {
        const res = await fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        });
        return this._handleResponse(res);
    }

    async deleteCard(id) {
        const res = await fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        });
        return this._handleResponse(res);
    }

    async like(id) {
        const res = await fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        });
        return this._handleResponse(res);
    }

    async dislike(id) {
        const res = await fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        });
        return this._handleResponse(res);
    }

    changeLikeCardStatus(card, variable) {
        this._status = variable ? this.like(card._id) : this.dislike(card._id);
        return this._status;
    }

    async changeAvatar(data) {
        const res = await fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        });
        return this._handleResponse(res);
    }
};

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        authorization: "2d12bc16-8679-4620-86db-cdf1b3dc4893",
        "Content-Type": "application/json"
    }
});