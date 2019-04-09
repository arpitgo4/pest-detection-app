

import formatcoords from 'formatcoords';

import { IInspectionModel } from 'Models';
import { parseDateToTimeStamp } from './utils';
import { FileObject } from 'Interfaces';

import { SERVER_DOMAIN, } from './constants';

/**
 * Inspection utility methods
 */


/**
 * all pre-processing for the inspection object, before
 * saving in DB.
 */
export const preprocessInspection = (inspection: IInspectionModel, image_file?: FileObject): Promise<IInspectionModel> => {
    return new Promise(resolve => {
        const inspection_obj = inspection.inspection;

        const { date, time, } = inspection_obj;
        const datetime_string = `${date} ${time}`;

        inspection_obj.timestamp = parseDateToTimeStamp(datetime_string);

        const { site, facility } = inspection;
        site.lat_long = formatcoords(site.lat, site.long).format();
        facility.lat_long = formatcoords(facility.lat, facility.long).format();

        if (image_file)
            inspection.inspection.image_url = `${SERVER_DOMAIN}/${image_file.path}`;

        return resolve(inspection);
    });
};