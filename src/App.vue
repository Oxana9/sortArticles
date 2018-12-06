<template>
  <div id="app">
	<h1>News feed REGRU</h1>
	<div id="main" v-cloak>
		<input type="text" v-model="searchString" placeholder="Enter the name of the news" />
		<div v-if="noArticles()">
			<p>No news is here :(</p>
		</div>
		<ul>
			<li v-for="article in filteredArticles">
				<h1>{{article.title[0]}}</h1>
				<div class="article" v-html="article.description[0]"> </div>
			</li>
		</ul>
	</div>
  </div>
</template>

<script>

import axios from 'axios'
import {parseString} from 'xml2js'

export default {
  name: 'app',
  data () {
	return {
		news: 'Interesting fresh news',
		info: null,
		searchString: ""
	}
	},
	computed: {
		filteredArticles: function () {
            var articles_array = this.info,
                searchString = this.searchString;
            if(!searchString){
                return articles_array;
            }
            searchString = searchString.trim().toLowerCase();

            articles_array = articles_array.filter(function(item){
                if((item.title[0].toLowerCase().indexOf(searchString) !== -1)||(item.description[0].toLowerCase().indexOf(searchString) !== -1)){
                    return item;
                }
            })
            return articles_array;
		}
	},
	mounted() {
		var self = this;
		axios.get('https://www.reg.ru/company/news/rss').then(response => {
			parseString(response.data, function(err, result){
				self.info = result.rss.channel["0"].item;
				console.log(result.rss.channel["0"].item["0"]);
			});
		}).catch(function(err){
				console.log("cant load", err);
			});
	},
	methods: {
		noArticles() {
			var r = !this.filteredArticles || this.filteredArticles.length==0;
			return r;
		}
	}
}
</script>



<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

[v-cloak] {
  display: none;
}

@media (min-width: 1024px) {
	.b-news-article__right{
		float: right;
	}
}

@media (min-width: 481px) and (max-width: 1024px) {
  .b-news-article__right {
	display: block;
	margin-left: auto;
    margin-right: auto
  }
}

@media (max-width: 480px) {
  .b-news-article__right {
	display: none;
  }
}

</style>
