import React, { useEffect, useState } from 'react';
import axios from "axios";
import clsx from 'clsx';
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { lighten, makeStyles } from '@material-ui/core/styles';
import RenderTableComponent from './RenderTableComponent';
import './Scroll.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

export default function InfiniteScrollComponents(props) {

    const classes = useStyles();
    const [responseData, setResponseData] = useState([]);
    const [isNext, setIsNext] = useState(false);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        console.log("Data");
        const getData = async () => {
    
        const response = await axios.get(`http://localhost:8190/products`, {
            params: {
                sortBy: "asc",
                fieldName: "id",
                pageNumber: 0,
                pageSize: 6
            
            }});
        setResponseData([...response.data.content]);
        console.log(responseData);
        setIsNext(true);
        setPageCount(pageCount + 1)
    }
        getData();
}, [pageCount]
    );

function fetchMoreData() {

    setPageCount(pageCount + 1);

}

return (
    <div className={classes.root}>
        <InfiniteScroll
            className='Scroll'
            dataLength={responseData.length}
            next={fetchMoreData}
            hasMore={isNext}
            scrollableTarget="scrollableDiv"
        >
            <RenderTableComponent responseData={responseData} getSelectedRecord={props.getSelectedRecord} />

        </InfiniteScroll>
    </div>
);
}

