export const getProfile = async (token: string) => {
  const endpoint = `${process.env.API_URL}/user/me`;
  const options = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
    }),
  };
  const response = await fetch(endpoint, options);

  return response.json();
};
