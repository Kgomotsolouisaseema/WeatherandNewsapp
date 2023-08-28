import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";

const NewList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async() => {
      const response =await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=018ab5e1d2924cf788f6b9303706e653`);
      console.log(response);
      setArticles(response.data.articles)
    }
    getArticles()
  }, []);

  return( 
  <div>
    {articles.map(article =>{
      return(
        <NewsItem 
          title={article.title}
          description={article.description}
          url={article.url}
          urlToImage={article.urlToImage}/>
      )
    })}
  </div>
  );
};

export default NewList;
