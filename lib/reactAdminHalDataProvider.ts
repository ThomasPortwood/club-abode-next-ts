// https://marmelab.com/react-admin/DataProviders.html
import {fetchUtils} from 'react-admin';
import {stringify} from "query-string";
import {buildAdminUrl} from "./url";

const baseUrl = process.env.NEXT_PUBLIC_HAL_ENDPOINT;

export default (token: string) => {

  const myFetchJson = (url: string, options: any = {}) => {
    if (!options.headers) {
      options.headers = new Headers({});
    }
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
  };

  return {

    getList: (resource: string, params: any = {}) => {
      console.log(`GET LIST ${resource}`);
      let url = buildAdminUrl(resource, params);
      return myFetchJson(url).then(({headers, json}: any) => {
        const total = json.page ? json.page.totalElements : json._embedded[resource].length;
        return {data: json._embedded[resource], total}
      });
    },

    getOne: (resource: string, params: any = {}) => {
      console.log(`GET ONE ${resource}`);
      let url = `${baseUrl}/${resource}/${params.id}`;
      return myFetchJson(url).then(({headers, json}: any) => {
        return {data: json}
      })
    },

    getMany: (resource: string, params: any) => {
      console.log(`GET MANY ${resource}`);
      const url = `${baseUrl}/${resource}`;
      return myFetchJson(url).then(({json}: any) => ({data: json._embedded[resource]}));
    },

    getManyReference: (resource: string, params: any) => {
      console.log(`GET MANY REF ${resource}`);
      const {page, perPage} = params.pagination;
      const {field, order} = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        page: page,
        size: perPage
      };
      const url = `${baseUrl}${params.target}?${stringify(query)}`;
      return myFetchJson(url).then(({json}: any) => ({data: json._embedded[resource]}));
    },

    create: (resource: string, params: any = {}) => {
      console.log(`CREATE ${resource}`);
      const url = `${baseUrl}/${resource}`;
      let body;
      if (resource === 'documents') {
        console.log(params);
        body = new FormData();
        body.append("file", params.data.file.rawFile);
        body.append("propertyId", params.data.propertyId);
        body.append("name", params.data.name);
        body.append("description", params.data.description);
      } else {
        body = JSON.stringify(params.data);
      }
      return myFetchJson(url, {method: "POST", body})
        .then(
          ({headers, json}: any) => ({data: json, id: json.id}),
          (error: any) => ({data: error}))
    },

    delete: (resource: string, params: any = {}) => {
      console.log(`DELETE ${resource}`);
      const url = `${baseUrl}/${resource}/${params.id}`;
      return myFetchJson(url, {method: "DELETE"}).then(() => {
        return {data: {}};
      })
    },

    deleteMany: (resource: string, params: any = {}) => {
      console.log(`DELETE MANY ${resource}`);
      return Promise.all(params.ids.map((id: bigint) => {
        const url = `${baseUrl}/${resource}/${id}`;
        return myFetchJson(url, {method: "DELETE"})
      })).then(() => {
        return {data: {}}
      });
    },

    update: (resource: string, params: any = {}) => {
      console.log(`UPDATE ${resource}`);
      const url = `${baseUrl}/${resource}/${params.id}`;
      return myFetchJson(url, {method: "PUT", body: JSON.stringify(params.data)})
        .then(({headers, json}: any) => {
          return {data: json, id: json.id};
        })
    },
  };
};
