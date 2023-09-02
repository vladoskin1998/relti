import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs'

const __dirname = path.resolve()

class FileService {
    saveFile(image) {
        try {
            const fileName = uuid.v1() + '.png'
            const dir = path.join(__dirname,'images', fileName)
            image.mv(dir)
            return fileName
        } catch (error) {
            console.log(error.message)
        }
    }
    deleteFile(fileName) {
        const dir = path.join(__dirname,'images', fileName)
        fs.unlink(dir, (e) => console.log(e))
    }

}

export default new FileService()