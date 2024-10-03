export const getQueryParam = (param: any) => {
  if (typeof window === 'undefined') return null;

  const queryString = window.location.search;
  if (!queryString) return null;

  const urlParams = new URLSearchParams(queryString);
  if (!urlParams) return null;

  return urlParams.get(param);
};
