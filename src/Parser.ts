/**
 * Created by Samuel Gratzl on 24.10.2015.
 */
import {csv, text as d3text} from 'd3';
import {IAnyMatrix} from 'phovea_core/src/matrix';
import {asMatrix, IAsMatrixOptions} from 'phovea_core/src/matrix';
import {ITable} from 'phovea_core/src/table';
import {asTable as parseObjects, IAsTableOptions} from 'phovea_core/src/table';


export class Parser {
  static parseRemoteMatrix(url: string, options: IAsMatrixOptions = {}): Promise<IAnyMatrix> {
    return new Promise((resolve, reject) => {
      d3text(url, (error: string, data: any) => {
        if (error) {
          reject(error);
        }
        const rows = csv.parseRows(data);
        resolve(asMatrix(rows, options));
      });
    });
  }

  static parseRemoteTable(url: string, options: IAsTableOptions = {}): Promise<ITable> {
    return new Promise((resolve, reject) => {
      csv(url, (error: string, data: any) => {
        if (error) {
          reject(error);
        }
        resolve(parseObjects(data, options));
      });
    });
  }
}