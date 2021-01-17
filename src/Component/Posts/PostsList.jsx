import React, { Component } from 'react'
import Pagination from '../Common/Pagination/Pagination';
import { paginate } from '../utils/paginate';
import _ from 'lodash'
import http from "../../services/httpServices";
import SearchBox from '../Common/SearchBox/SearchBox';
import PostsTable from './PostsTable';
import  config  from "../../config.json";
import { toast } from "react-toastify";

class PostsList extends Component {
    perPage = 5
    state = { 
        posts:[],
        pageSize:this.perPage,
        currentPage:1,
        sortColumn:{path:'Title',order:'asc'},
        searchQuery:''
    }
  
    
    constructor(){
        super();
        this.handelDeleteClick = this.handelDeleteClick.bind(this);
        this.handelPageChange = this.handelPageChange.bind(this);
        this.handelSort = this.handelSort.bind(this);
        this.handelSearch = this.handelSearch.bind(this);
        this.handelSearchClear = this.handelSearchClear.bind(this);
    }
   
    async componentDidMount(){
        const {data:posts} = await http.get(config.postApiEndPoint);
        this.setState({posts})
    }
   
    handelSave = async ()=>{
        const newposts = {"title":"abc","body":"somebody"};
        const {data:post} = await http.post(config.postApiEndPoint,newposts)
    }

    handelUpdate =  async post => {
        post.title = "Updated";

        const posts = this.state.posts;
        const index = posts.indexOf(post);
        posts[index] = post;
        this.setState({posts})


        const {data} = await http.put(config.postApiEndPoint+"/"+post.id,post)
    }

    handelDeleteClick = async post => {
        const origialPosts = this.state.posts;
        const posts = this.state.posts.filter((obj)=>obj.id!=post.id);
        this.setState({ posts });

        try {
            await http.delete(config.postApiEndPoint+"/"+post.id); 

        } catch (error) {
            console.log(error);
            if(error.response && error.response.status == 404){
                toast.error("this post has already been deleted");
            }
            this.setState({posts:origialPosts});
        }
        
      
    }


    handelPageChange = page =>this.setState({currentPage:page})
    
    
    handelSort = sortColumn =>this.setState({sortColumn});

    handelSearch = query =>{
        this.setState({searchQuery:query,currentPage:1})
    }
    handelSearchClear = () => {
        this.setState({searchQuery:"",currentPage:1})
    }

    showingDetails(fromRecord,filteredCount,toRecord){
        if(filteredCount===0) return <p> No reords found to show</p>;
        return  <p> Showing {fromRecord} to {(filteredCount-toRecord)>=0?toRecord:filteredCount} of {filteredCount} records for posts</p>;
    }

    getPageData = ()=>{
        const {posts,currentPage,pageSize,sortColumn,searchQuery} = this.state;
       
        let filtered = posts; 
        if(searchQuery)
            filtered = posts.filter(m=>m.title.toLowerCase().includes(searchQuery.toLowerCase()));    
        
        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        const rows = paginate(sorted,currentPage,pageSize);
        
        const filteredCount = filtered.length;
        const fromRecord = filteredCount===0?0:currentPage===1?currentPage:(currentPage*pageSize)-(pageSize-1);
        const toRecord = filteredCount===0?0:fromRecord+(pageSize-1);
       
        return {fromRecord,toRecord,filteredCount,rows}
    }

   
    render() { 
        const {currentPage,pageSize,sortColumn} = this.state;
        const {fromRecord,toRecord,filteredCount,rows} = this.getPageData();
     
        return ( 
            <div>
               
                <div className="row">
                    <div className="col-md">
                        <div className="mb-3">
                         <h1 className="pull-left"> Posts List </h1>
                         <button type="button" onClick={this.handelSave} className="btn btn-primary pull-right mt-2" role="button">Add New Posts</button>
                        </div>
                        <div className="clearfix"></div>                      
                       { this.showingDetails(fromRecord,filteredCount,toRecord) }
                       <SearchBox value={this.state.searchQuery} onChange={this.handelSearch} onClear={this.handelSearchClear} />
                        <PostsTable
                            rows = {rows}
                            sortColumn={sortColumn}
                            onLiked={this.handelFavClick}
                            onDelete={this.handelDeleteClick}
                            onUpdate={this.handelUpdate}
                            onSort={this.handelSort}
                        />
                        <Pagination 
                        totalCount={filteredCount} 
                        perPage={pageSize}
                        currentPage = {currentPage}
                        onPageChange ={this.handelPageChange} 
                        />
                    </div>
                </div>
                
            </div>
            );
    }
}
 
export default PostsList;