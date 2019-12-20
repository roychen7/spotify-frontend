import React from 'react';
import '../componentstyling/PlaylistMixGenerator.css'
import { Button} from 'react-bootstrap';
import ListViewer from './ListViewer'

class PlaylistMixGenerator extends React.PureComponent {
    constructor(props) {
        super(props);

        // TODO: propertly initialize currentlySelected
        this.currentlySelected = new Set();
    }

    handleButtonClick = (playlistId) => {
        console.log("current playlist id is: " + playlistId);
        console.log(playlistId in this.currentlySelected);
        if (this.currentlySelected.has(playlistId)) {
            console.log("removing playlist id: " + playlistId)
            this.currentlySelected.delete(playlistId);
        } else {
            this.currentlySelected.add(playlistId);
        }
        console.log(this.currentlySelected);
    }

    render() {
        const testList = [[0, 1], [2, 3], [4, 5], [6, 7]]
        return (
            <div className='pmg-top-div'>
                <h1 className='pmg-title'> Playlist Mixer</h1> 
                <Button className='generate-button'> Generate </Button>
                <div className='pmg-top-item-list-div'>
                    <ListViewer type='mixer' listItems={testList} onButtonClick={this.handleButtonClick}/>
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

function handleButtonClick(elt) {
    console.log("hello world from button click" + elt)
}

export default PlaylistMixGenerator;