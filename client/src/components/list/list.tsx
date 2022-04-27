import React, { ReactElement, useEffect, useState, useContext } from "react";
import ListItem from './listItem'
import { apiPost } from '../../api/api'
import { AxiosResponse } from 'axios'
import { PostItemInterface } from '../../types/types'
import PaginationItem from './paginationItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import LoaderContext from '../../context/loaderContext';

export default function List(): ReactElement {

    const [posts, setPost] = useState<PostItemInterface[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    
    const { setLoader } = useContext(LoaderContext)

    const filter = useSelector((state: RootState) => state.ChangeFilter)


    useEffect(() => {
        setLoader(true)
        apiPost.post('/get-post', {
            number: page,
            ...filter
        })
            .then((response: AxiosResponse<{ docs: PostItemInterface[], totalPages: number }>) => {
                setPost(response.data.docs);
                setTotalPages(response.data.totalPages)
                setLoader(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoader(false)
            });
    }, [page, filter])

    return (
        <div className="list">
            {
                posts.map((it, index) => <ListItem post={it} key={index} />)
            }
            <div className="list-pagination">
                <PaginationItem page={page} changePage={setPage} totalPages={totalPages} />
            </div>
        </div>
    );
}

