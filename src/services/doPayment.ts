export const doPayment = async (token: string, invoice: string) => {
  const endpoint = `${process.env.API_URL}/payments/bolt11`;
  const options = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: JSON.stringify({
      amount: 0,
      invoice,
    }),
  };

  const response = await fetch(endpoint, options);

  return response.json();
};
