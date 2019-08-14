import * as json2csv from 'json2csv';
import * as uuid from 'uuid';
import * as fs from 'fs';

const fields = [
    '_id',
    'hat',
    'title',
    'text',
    'author',
    'img',
    'publishDate',
    'link',
    'active'
];
const options = { fields }

class ExportFiles {

    toCsv (characters) {
        try {
 
            const csv = json2csv.parse(characters, options);
            const filename = uuid.v4() + ".csv"
            fs.writeFile('./exports-files/' + filename, csv, (err) => {
                if (err) throw err;
                console.log('file saved successfully');
            });
 
            return filename;
 
        } catch (err) {
            console.error(err);
        }
    }
}

export default new ExportFiles();
