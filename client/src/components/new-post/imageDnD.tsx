import React, { ReactElement, useCallback, useState, useMemo, useEffect } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

export default function ImageDND({droppedFiles, setDroppedFiles }: {droppedFiles:any, setDroppedFiles: (f:any) => void }): ReactElement {

    const handleFileDrop = useCallback(
        (item: any) => {

            if (item) {
                const files = item.files
            
                setDroppedFiles(files)
            }
        },
        [setDroppedFiles],
    )

    return (<DndProvider backend={HTML5Backend}>
        <TargetBox onDrop={handleFileDrop} />
        <FileList files={droppedFiles} />
    </DndProvider>
    )

}

export const FileList = ({ files }: { files: any }): ReactElement => {

    const fileList = useMemo(() => {
        const label = (file: any) =>
            `'${file.name}' of size '${file.size}' and type '${file.type}'`
        return files.map((file: any) => <div key={file.name}><SimCardDownloadIcon />{label(file)}</div>)
    }, [files])

    if (files.length === 0) {
        return <></>
    }

    return <div>{fileList}</div>
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
            canDrop(item: any) {
                //    console.log('canDrop', item.files, item.items)
                return true
            },
            collect: (monitor: any) => {
                const item = monitor.getItem()
                if (item) {
                    //    console.log('collect', item.files, item.items)
                }
                return {
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop(),
                }
            },
        }),
        [props],
    )
    const isActive = canDrop && isOver
    return (
        <div ref={drop} className="add__dndimg">
            {isActive ? <FileDownloadDoneIcon /> : <FileDownloadIcon />}
            <div>
                Download File
            </div>
        </div>
    )
}
