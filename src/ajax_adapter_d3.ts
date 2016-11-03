/**
 * Created by Samuel Gratzl on 04.08.2014.
 */
import {IAjaxAdapter, encodeParams} from 'phovea_core/src/ajax';
import * as d3 from 'd3';

/**
 * D3 implementation of the ajax adapter
 */
class D3Adapter implements IAjaxAdapter {

  send(url: string, data: any = {}, method = 'get', expectedDataType = 'json'): Promise<any> {
    return new Promise((resolve, reject) => {
      if (method === 'get' || method === 'head') {
        data = encodeParams(data); //encode in url
        if (data) {
          url += (/\?/.test(url) ? '&' : '?') + data;
        }
        data = null;
      }
      var xhr = d3.xhr(url);
      if (!(data instanceof FormData)) {
        xhr.header('Content-Type','application/x-www-form-urlencoded');
      }
      xhr.send(method, data instanceof FormData ? data: encodeParams(data), (error, _raw) => {
        if (error) {
          reject(error);
        } else {
          resolve(parse(_raw, expectedDataType));
        }
      });
    });
  }
}

export function create() {
  return new D3Adapter();
}

function parse(_raw: XMLHttpRequest, dataType = 'json') {
  if (dataType === 'json') {
    return JSON.parse(_raw.responseText);
  }
  return _raw.responseText;
}

