export const getIncomingInvoices = async (token: string) => {
  const endpoint = `${process.env.API_URL}/invoices/incoming`;
  const options = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + token,
    }),
  };
  const response = await fetch(endpoint, options);

  if (response.status === 401) {
    return { error: true };
  }

  return response.json();
};
