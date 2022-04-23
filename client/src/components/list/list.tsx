import React, { ReactElement, useEffect, useState } from "react";
import ListItem from './listItem'
import { apiPost } from '../../api/api'
import { AxiosResponse } from 'axios'
import { PostItemInterface } from '../../types/types'
import PaginationItem from './paginationItem'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { useParams } from "react-router-dom";

export default function List(): ReactElement {

    const [posts, setPost] = useState<PostItemInterface[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const filter = useSelector((state: RootState) => state.ChangeFilter)

    let params = useParams()

    // console.log("location",location);
    console.log("params", params);

    useEffect(() => {
        apiPost.post('/get-post', {
            number: page,
            ...filter
        })
            .then((response: AxiosResponse<{ docs: PostItemInterface[], totalPages: number }>) => {
                setPost(response.data.docs);
                setTotalPages(response.data.totalPages)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [page, filter])

    return (
        <div className="list">
            {
                posts.map(it => <ListItem post={it} />)
            }
            <div className="list-pagination">
                <PaginationItem page={page} changePage={setPage} totalPages={totalPages} />
            </div>
        </div>
    );
}

