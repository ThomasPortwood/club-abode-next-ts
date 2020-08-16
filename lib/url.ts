import {stringify} from "querystring";

const baseUrl = process.env.NEXT_PUBLIC_HAL_ENDPOINT;

export const buildAdminUrl = (resource: string, params: any = {}) => {

  let url = `${baseUrl}/${resource}`;

  let queryStrings = [];

  if (params.filter && params.filter.name) {
    url += `/search/findByNameContains`;
    queryStrings.push(stringify({input: params.filter.name}));
  }

  if (params.pagination) {
    const {page, perPage} = params.pagination;
    queryStrings.push(stringify({page: page-1, size: perPage}));
  }

  if (params.sort) {
    const {field, order} = params.sort;
    queryStrings.push(stringify({sort: `${field},${order}`}));
  }

  return `${url}?${queryStrings.join('&')}`;
};