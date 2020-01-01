import React from 'react';
import { Button} from 'react-bootstrap';
import '../componentstyling/RecentSongs.css'
import getRecent from '../utils/ApiCaller'


class RecentSongs extends React.PureComponent {
    constructor(props) {
        super(props);
        this.data = getRecent()
    }

    render() {
        const data = this.data
        return (
            <div className='pmg-top-div'>
                <h1 className='pmg-title'> Recent Songs </h1> 
                <input id='input-bar' type="text"></input>
                <div className='pmg-top-item-list-div'>
                {data.map(elt => (
                    <Button 
                        key={elt[1]} 
                        className='recent-song'> {elt[0]} 
                    </Button>
                ))}
                </div>
            </div>
        )
    }    
}

export default RecentSongs;