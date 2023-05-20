export const doPayment = async (token: string, invoice: string, amount: string) => {
  const endpoint = `${process.env.API_URL}/payments/bolt11`;
  const options = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      invoice,
      amount: parseInt(amount),
    }),
  };

  const response = await fetch(endpoint, options);

  return response.json();
};
