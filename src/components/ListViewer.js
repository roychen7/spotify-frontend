import React from 'react';
import { Button} from 'react-bootstrap';

class ListViewer extends React.PureComponent {
    constructor(props) {
        super(props);

        // for each button, if the hashed value is true then it is selected, else unselected
        if (this.props.type === 'mixer') {
            this.buttonHash = {};
        }
    }

    componentDidMount() {
        if (this.props.type === 'mixer') {
            const { listItems } = this.props;
            for (let i = 0; i < listItems.length; i++) {
                this.buttonHash[listItems[i][1]] = true;
            }
        }
    }

    handleButtonClick = (e, id) => {
        const { onButtonClick } = this.props;
        if (this.props.type === 'mixer') {
            if (this.buttonHash[id]) {
                e.currentTarget.style.backgroundColor = "#282c34";
                this.buttonHash[id] = false;
            } else {
                e.currentTarget.style.backgroundColor = "rgb(45, 94, 136";
                this.buttonHash[id] = true;
            }
        }
        onButtonClick(id);
    }

    render() {
        const { props: { listItems } } = this;

        return (
            listItems.map(elt => {
                return <Button key={elt[1]} 
                // onClick={(() => {onButtonClick(elt[1])})} 
                onClick={e => this.handleButtonClick(e, elt[1])}
                className='pmg-list-item-button'> {elt[0]} </Button>
            })
        )
    }
}

export default ListViewer;
