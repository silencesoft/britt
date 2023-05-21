export const createInvoice = async (token: string, amount: string, description: string) => {
  const endpoint = `${process.env.API_URL}/invoices`;
  const options = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      amount: parseInt(amount),
      description,
    }),
  };

  const response = await fetch(endpoint, options);

  return response.json();
};
