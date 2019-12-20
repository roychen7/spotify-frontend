import React from 'react';
import { Button} from 'react-bootstrap';
import '../componentstyling/RecentSongs.css'


class RecentSongs extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handleButtonClick = (songId) => {
        // play song from song id
    }

    render() {
    const testList = [[0, 1], [2, 3], [4, 5], [6, 7]] 
        return (
            <div className='pmg-top-div'>
                <h1 className='pmg-title'> Recent Songs </h1> 
                <input id='input-bar' type="text"></input>
                <div className='pmg-top-item-list-div'>
                {testList.map(elt => (
                    <Button 
                        key={elt[1]} 
                        onClick={e => this.handleButtonClick(e, elt[1])}
                        className='recent-song'> {elt[0]} 
                    </Button>
                ))}
                </div>
            </div>
        )
    }    
}

export default RecentSongs;