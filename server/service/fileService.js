import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs'

class FileService {
    saveFile(image) {
        try {
            const fileName = uuid.v1() + '.png'
            const dir = path.resolve('images', fileName)
            image.mv(dir)
            return fileName
        } catch (error) {
            console.log(error.message)
        }
    }
    deleteFile(fileName) {
        const dir = path.resolve('images', fileName)
        fs.unlink(dir, (e) => console.log(e))
    }

}

export default new FileService()