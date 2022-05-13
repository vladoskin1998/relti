import React, { ReactElement, useCallback, useState, useMemo, useEffect } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function ImageDND({ droppedFiles, setDroppedFiles }: { droppedFiles: any, setDroppedFiles: (f: any) => void }): ReactElement {

    const handleFileDrop = useCallback(
        (item: any) => {
            if (item) {
                const files = item.files
                setDroppedFiles(files)
            }
        },
        [setDroppedFiles],
    )

    const deleteFile = (name: string) => {
        setDroppedFiles(
            droppedFiles.filter((file: any) => file.name !== name)
        )
    }

    const fileList = useMemo(() => {
        return droppedFiles.map((file: any) => <Box className='send__file' color="#1976d2" key={file.name}>
            <FilePresentIcon />
            {file.name.length > 15 ? `${file.name.substring(0, 20)}...` : file.name}
            <Button variant="text" color="error">
                <DeleteIcon onClick={() => deleteFile(file.name)} />
            </Button>
        </Box>
        )
    }, [droppedFiles])


    return (<DndProvider backend={HTML5Backend}>
        <TargetBox onDrop={handleFileDrop} />
        {
            droppedFiles.length
                ? <Box sx={{ paddingTop: "15px" }}>{fileList}</Box>
                : <></>
        }
    </DndProvider>
    )

}

export const TargetBox = (props: any): ReactElement => {

    const { onDrop } = props
    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: [NativeTypes.FILE],
            drop(item: any) {
                if (onDrop) {
                    onDrop(item)
                }
            },
            collect: (monitor: any) => {
                return {
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop(),
                }
            },
        }),
        [props],
    )
    const isActive = canDrop && isOver

    const addFile = (files: any) => {
        let arrFile = []
        for (let file of files) {
            arrFile.push(file)
        }
        onDrop({ files: arrFile })
    }


    return (
        <Box ref={drop} className="add__dndimg">
            <Box>
                <label htmlFor="myfile" className='add__dndimg-icon'>
                    {isActive ? <FileDownloadDoneIcon /> : <FileDownloadIcon />}
                </label>
                <input type="file" id="myfile" name="myfile" multiple
                    onChange={e => addFile(e.target.files)}
                />
            </Box>
            <Box>
                Download File - jpeg, jpg, png
            </Box>
        </Box>
    )
}
