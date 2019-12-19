import React from 'react';
import '../componentstyling/PlaylistMixGenerator.css'
import { Button} from 'react-bootstrap';

const PlaylistMixGenerator = props => {
    console.log("called from playlistmixgenerator");
    return (
        <div className='pmg-top-div'>
            <h1 className='pmg-title'> Playlist Mixer</h1> 
            <Button className='generate-button'> Generate </Button>
            <div className='pmg-top-item-list-div'>
                <div className='pmg-list-item-div'>
                     This is list item 1
                </div>
                <div className='pmg-list-item-div'>
                    This is list item 2
                </div>
                <div className='pmg-list-item-div'>
                     This is list item 3
                </div>
            </div>
        </div>
    );
}

export default PlaylistMixGenerator;