import React from 'react';
import '../componentstyling/PlaylistMixGenerator.css'
import { Button} from 'react-bootstrap';
import{ getRecent, getPlaylists } from '../utils/ApiCaller'


class PlaylistMixGenerator extends React.PureComponent {
    constructor(props) {
        super(props);
        this.currentlySelected = new Set();
        this.data = getPlaylists()
    }

    componentDidMount() {
        const data = this.data;
        for (let i = 0; i < data.length; i++) {
            this.currentlySelected.add(data[i][1]);
        }
        console.log(this.currentlySelected);
    } 

    handleButtonClick = (e, playlistId) => {
        if (this.currentlySelected.has(playlistId)) {
            console.log("removing playlist id: " + playlistId)
            this.currentlySelected.delete(playlistId);
            e.currentTarget.style.backgroundColor = "#282c34";
        } else {
            e.currentTarget.style.backgroundColor = "rgb(45, 94, 136";
            this.currentlySelected.add(playlistId);
        }
        console.log(this.currentlySelected);
    }

    render() {
        const data = this.data; 

        return (
            <div className='pmg-top-div'>
                <h1 className='pmg-title'> Playlist Mixer</h1> 
                <Button className='generate-button'> Generate </Button>
                <div className='pmg-top-item-list-div'>
                    {data.map(elt => (
                        <Button 
                            key={elt[1]} 
                            onClick={e => this.handleButtonClick(e, elt[1])}
                            className='pmg-list-item-button'> {elt[0]} 
                        </Button>
                    ))}               
                 </div>
            </div>
        );
    }
}
// const PlaylistMixGenerator = props => {
//     console.log("called from playlistmixgenerator");
//     const testList = [[1,2], [3,4], [5,6]];

//     return (
//         <div className='pmg-top-div'>
//             <h1 className='pmg-title'> Playlist Mixer</h1> 
//             <Button className='generate-button'> Generate </Button>
//             <div className='pmg-top-item-list-div'>
//                 <ListViewer listItems={testList} onButtonClick={(() => {
//                     handleButtonClick(testList[0][0])
//                 })}/>
//                 {/* <Button className='pmg-list-item-button'>
//                      This is list item 1
//                 </Button>
//                 <Button className='pmg-list-item-button'>
//                     This is list item 2
//                 </Button>
//                 <Button className='pmg-list-item-button'>
//                      This is list item 3
//                 </Button> */}
//             </div>
//         </div>
//     );
// }

export default PlaylistMixGenerator;