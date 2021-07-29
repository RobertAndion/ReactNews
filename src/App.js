import React, { useState, useEffect } from 'react';
import './App.css';
import './article.css'
const config = require('./config.json');

function App() {
  const [mainPageNews, setMainPageNews] = useState();

  useEffect(() => {
    const fetchTopHeadlinesUS = () => {
      return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + config.apiKey).then(res => {
        return res.json();
      });
    };

    const hydrateResponse = () => {
      return fetchTopHeadlinesUS().then(data => { // Will add error handling.
        if (!data) {
          console.log('No response.');
        }
        else if (data.status !== 'ok') {
          console.log("Error fetching from the api, status: " + data.status);
        }
        return data;
      });
    }
    hydrateResponse().then(feedData => {
      setMainPageNews(feedData);
      console.log(feedData);
    });
  }, []);



  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Open Source News</h2>
      <div id='newsContainer'>
        {mainPageNews && <div id="mainContainer">
          {
            Object.keys(mainPageNews.articles).map(articleObject => (
              <React.Fragment key={articleObject}>
                <div id="newsStory">
                  <div id="titleContainer"><b>{mainPageNews.articles[articleObject].title}</b></div>
                  <div id='imageContainer'><a href src={mainPageNews.articles[articleObject].urlToImage}><img style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%', minWidth: '100%', alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }} src={mainPageNews.articles[articleObject].urlToImage} alt={mainPageNews.articles[articleObject].title}></img></a></div>
                  <div id="descriptionContainer">{mainPageNews.articles[articleObject].description}</div>
                </div>
                <br />
              </React.Fragment>
            ))
          }
        </div>}
      </div>
    </div>
  );
}

export default App;