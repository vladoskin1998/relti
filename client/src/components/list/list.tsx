import React, { ReactElement, useEffect, useState, useContext, useCallback } from "react";
import ListItem from './listItem'
import { api } from '../../api/api'
import { AxiosResponse } from 'axios'
import { PostItemInterface } from '../../types/types'
import PaginationItem from './paginationItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Context from '../../context/context';
import { useSearchParams } from "react-router-dom";

export default function List(): ReactElement {

    const [searchParams, setSearchParams] = useSearchParams({});
    const [posts, setPost] = useState<PostItemInterface[]>([])
    const [page, setPage] = useState(+searchParams.get("page") || 1)
    const [totalPages, setTotalPages] = useState(0)

    let { setLoader, getPosts } = useContext(Context)

    const filter = useSelector((state: RootState) => state.ChangeFilter)


    const getList = (num?: number) => {

        setLoader(true)

        if (num) { setPage(num) }

        api.post('/post/get-post', {
            number: num || page,
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

    getPosts.current = getList

    useEffect(() => {
        getList()
    }, [filter.street])

    const onChangePage = (num: number) => {
        setSearchParams({ page: `${num}` })
        getList(num)
        setPage(num)
    }

    return (
        <div className="list">
            {
                posts.map((it, index) => <ListItem post={it} key={index + it._id} getList={getList} />)
            }
            {posts.length
                ? <div className="list-pagination">
                    <PaginationItem page={page} changePage={onChangePage} totalPages={totalPages} />
                </div>
                : <></>
            }

        </div>
    );
}

