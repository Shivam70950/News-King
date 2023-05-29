import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from '../Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {
    // iss liye use kr rhe h constructor kyuki news component m hum http calls marege
    // agr fetch api use kr rhe ho toh iski need ni h ab
    static defaultProps = {
        country: "in",
        pageSize: "8",
        category: "general"

    }
    static propType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        // agr koi class k object initiate ho rha h tb constructor call hota h
        super(props); //super function jrur call hoga jb bhi constructor use kroge
        console.log("this is constructor from news component");
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            // loading false h lekin iskoo true krke add kr skte ho koi spinner ya kuch or
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-Newsking`;
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    // componentDidMount is a lifecycle method or ye render ke ru hone k baad run hota h
    async componentDidMount() {
        // console.log("componentDidmont");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=efd6b756d3034086a556a6634c7212e8&page=1&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // async function wait krega fecthurl promise k resolve hone k or finally data dega or data ko convert kr skte h text me ya json m 
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        //   totalResults iss url m present h 
        // The Fetch API provides an interface for fetching resources (including across the network). It is a more powerful and flexible replacement for XMLHttpRequest . Note: This feature is available in Web Workers.
        // this.setState({page:this.state.page=1})
        // by default constructor me page no 1 initaiate kr rkha h
        this.updateNews();
    }

    handlePreviousClick = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=efd6b756d3034086a556a6634c7212e8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // // this.setState({ articles: parsedData.articles })

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    handleNextClick = async () => {
        // Math.ceil use krte h jse 5.8 h toh ye usko  kr dga
        // Math.ceil(this.state.totalResults / 20==gives total no of pages
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        // }
        // else {

        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=efd6b756d3034086a556a6634c7212e8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     // console.log(parsedData);
        //     // this.setState({ articles: parsedData.articles })

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }

    fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        this.setState({ page: this.state.page + 1 })
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };
    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: "35px 0px",marginTop:'90px' }}>NewsKing - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row">
                            {/* agr loading true h toh kuch mt dikhao khali loading gif dikhao ni toh map wla portion dikhao */}
                            { this.state.articles.map((element) => {
                                return <div className="col-md-4 " key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>

        )
    }
}


export default News


//  {this.state.articles.map((element)=>{console.log(element)})}
//  map function is used for creation of the new array from the existing array
//  The Array.map() method creates a new array from the results of calling a function for every element */
//  this statement will return all objects present in the articles
//  col md-3 means medium devices m4 coloums le legi ,12 coloums ki crate hoti h 4 lelgi mtlb 4 coloums le legi or 4 row   */}
//  {/* slice kya krega chracters ko cut kr degaa slice(0,44) 0 start h or last chracter no 44 */}
// What is the async function?
// The word “async” before a function means one simple thing: a function always returns a promise. 
