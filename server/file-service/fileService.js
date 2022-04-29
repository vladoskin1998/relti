import * as uuid from 'uuid';
import * as path from 'path';

class FileService{
    saveFile(image){
        try {
            const fileName = uuid.v1() + '.png'
            const dir = path.resolve('images', fileName)
            image.mv(dir)
            return fileName
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default new FileService()