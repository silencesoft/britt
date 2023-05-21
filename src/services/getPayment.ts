export const getPayment = async (token: string, invoice: string, abortController: AbortController) => {
  const endpoint = `${process.env.API_URL}/invoices/${invoice}`;
  const options = {
    signal: abortController.signal,
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
    }),
  };
  const response = await fetch(endpoint, options);

  return response.json();
};
