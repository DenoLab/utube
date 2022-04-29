import React, {useState, useEffect} from 'react';
import './App.css';
import styled from 'styled-components';

const Header = styled.div`
    padding: 20px;
    input {
        width: 100%;
        height: 25px;
    }
`;

const VideoPlayed = styled.div`
    width: 50%;
    height: 400px;
`;

const Playlist = styled.div`
`;

const SearchResult = styled.div`
// display: flex;
// justify-content: center;
// flex-direction: column;
// align-items: center;
`;
const Items = styled.div`
display: flex;
flex-direction: column;
margin-left: 50px auto;
    button {
        display: flex;
        align-items: center;
        background: white;
        border: solid 1px white;
        padding: 10px;
        :hover {
            color: green;
            border: solid 1px green;
        }
    }
    
    p {
        padding-left: 20px;
    }
`;

function App() {
    const [searchKey, setSearchKey]=useState('');
    const [result, setResult] = useState('');
    // const [result, setResult] = useState({items:[]});
    const [loading, setLoading] = useState(false);
    const [lists, setLists] = useState('');
    const [video,setVideo] = useState('https://www.youtube.com/embed/1So7VBehCQg');
    const [input, setInput] = useState("Search here");

    const ApiKey ="&key=AIzaSyALkh3jg2EAfRx8hRGehrCZSyYmbO9zlpo";
    const ApiKey2 ="AIzaSyA-O0PnAoDduuz490vJ286BDvDLKt08fHE";
    const ApiKey3 = "AIzaSyAYrj_BQjiJwfo7JSR_eRMSbPAtX4Q57tE";
    const ApiKeyF = "AIzaSyCCk2nryBsrNgvp-Nhtel3Fh-nFpW4XDrE";
    const UtubeLink = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchKey}&maxResults=50${ApiKey}`
    
    const getInput = (e) => {
        const input = e.target.value;
        const newInput = input === "" ? "Search" : input;
        setInput(newInput);
    }

    const letSearch = (e) => {
        if (e.key === "Enter" || e.code === "NumpadEnter") {
            setSearchKey(input);
        }
    }
   
    const playVideo = (item) => {
        const linkVideo = "https://www.youtube.com/embed/"+item.id.videoId;
        console.log(linkVideo);
        setVideo(linkVideo);
    }

    useEffect(() => {
        setLoading(true);
        fetch(UtubeLink)
        .then(res => res.json())
        .then(posts => {
            setResult(posts);
            setLoading(false);
            setVideo("https://www.youtube.com/embed/"+posts.items[0].id.videoId);
        })
    },[UtubeLink]);

    
    const addPlayList = (e) => {
        const item = e.target.value;
        console.log(item);
        const newList = [...lists, item];
        setLists(newList);
    }
    console.log(lists);
    
    return (
        <div className="App">
            <Header>
                <h1>Find something in youtube</h1>
                <input type="text" name="themeSize" placeholder={input} onChange={getInput} onKeyPress={letSearch}></input>
            </Header>
            {searchKey && (<h1>Results for keyword "{searchKey}"</h1>)}
            {/* {result && <iframe className="player" type="text/html" width="800px" height="600px" src={"https://www.youtube.com/embed/"+result.items[0].id.videoId} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>} */}
            <>
            <VideoPlayed>
                {result && <iframe className="player" type="text/html" width="100%" height="100%" src={video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>}
            </VideoPlayed>
            <Playlist>
                {/* {lists.map(item => (
                    <Items>
                    <button value={"https://www.youtube.com/embed/" + item.id.videoId} type="button" onClick={playVideo} key={item.id.videoId} >
                        <img src={item.snippet.thumbnails.default.url}/>
                        <p>{item.snippet.title}</p>
                    </button>
                    </Items>
                ))} */}
            </Playlist>
            </>
            <SearchResult>
            {loading && (<div>Loading...</div>)}
            {result && (
            <>
                {result.items.map(item => (
                    <Items>
                    <button value={item} type="button" onClick={() => playVideo(item)} key={item.id.videoId} >
                        <img src={item.snippet.thumbnails.default.url}/>
                        <p>{item.snippet.title}</p>
                    </button>
                    <button value={item} type="button" style={{border: "solid 1px green", width:"20%"}} onClick={addPlayList}>Add to playlist</button>
                    </Items>
                ))}
            </>
            )}
            </SearchResult>
        </div>

    );
}

export default App;
