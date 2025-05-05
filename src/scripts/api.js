const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: '1960d23e-dc31-4ba9-b94c-f41fd45d9a4f',
    'Content-Type': 'application/json'
  }
}

const hendleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserDataApi = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(hendleResponse);
}

export const updateProfileApi = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(hendleResponse);
}

export const getInitialCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(hendleResponse);
}

export const postCardApi = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(hendleResponse);
}

export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(hendleResponse);
}

export const toggleLikeApi = (cardId, isLiked) => {
  let method = isLiked ? 'DELETE' : 'PUT';

  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  })
  .then(hendleResponse);
}

export const updateAvatarApi = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(hendleResponse);
}