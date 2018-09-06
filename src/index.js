import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

// when we import a file that we created we need to explicitly
// define the path for the the file.
// but if the file is in the pakage we install we dont need
// to like react, react-dom.
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDFGW6Uvbd2XpnquYdioU7Gx8rUFjN3fd8';

class App extends Component	{
	constructor(props)	{
		super(props);

		this.state = { 
			videos: [], 
			selectedVideo: null 
		};

		YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
		this.videoSearch('surfboards');
	}

/*{
    						if (event.key === 'Enter') {
    							this.setState({term});
								this.props.onSearchTermChange(term);
    						}*/

	videoSearch(term)	{
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render()	{

		const videoSearch = _.debounce((term) => {this.videoSearch(term) } , 500)

		return (
			<div>
				<SearchBar onSearchTermChange = {videoSearch} />
				<VideoDetail video = {this.state.selectedVideo} />
				<VideoList 
					onVideoSelect = {selectedVideo => this.setState({selectedVideo})	}
					videos = {this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'))