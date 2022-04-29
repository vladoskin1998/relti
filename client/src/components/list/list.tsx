import React, { ReactElement, useEffect, useState, useContext } from "react";
import ListItem from './listItem'
import { api } from '../../api/api'
import { AxiosResponse } from 'axios'
import { PostItemInterface } from '../../types/types'
import PaginationItem from './paginationItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Context from '../../context/context';

export default function List(): ReactElement {

    const [posts, setPost] = useState<PostItemInterface[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const { setLoader } = useContext(Context)

    const filter = useSelector((state: RootState) => state.ChangeFilter)

    const getList = () => {
        setLoader(true)
        api.post('/post/get-post', {
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
    }

    useEffect(() => {
        getList()
    }, [page, filter])

    return (
        <div className="list">
            {
                posts.map((it, index) => <ListItem post={it} key={index + it._id} getList={getList} />)
            }
            <div className="list-pagination">
                <PaginationItem page={page} changePage={setPage} totalPages={totalPages} />
            </div>
        </div>
    );
}

