import React, { Component } from 'react';
import {connect} from 'react-redux';
import {openElementWidget, closeElementWidget, enableElement} from '../../services/widgets/actions';
import {addColumnIndex} from '../../services/content/actions';
import ElementContainer from '../elements/elementContainer';

class NewColumn extends Component {

    state = {
        elementAdded: false,
        element: {}
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.element && nextProps.element.columnIndex === this.props.columnIndex) {
            this.setState({
                elementAdded: true,
                element: nextProps.element
            })
        }
    }

    dropElement = (e) => {
        
        if(!e.dataTransfer.types.includes('element')) {
            return;
        }
        this.props.addColumnIndex(this.props.columnIndex);

        var element = JSON.parse(e.dataTransfer.getData("element"));
        element['columnIndex'] = this.props.columnIndex;

        this.setState({
            elementAdded: true,
            element: element
        });
        
        this.props.closeElementWidget();
    }
    dragOver = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="hl_page-creator--column" onDrop={(e)=>this.dropElement(e)} onDragOver={(e)=>this.dragOver(e)}>
                <ElementContainer 
                    columnIndex={this.props.columnIndex}
                    element={this.state.element}
                />
                     
                {
                    this.state.elementAdded===false?<div className="new-element-blank">
                        <span className="btn btn-light6 btn-slim" onClick={()=>{this.props.openElementWidget(); this.props.addColumnIndex(this.props.columnIndex); this.props.enableElement()}}>Add New Element</span>
                    </div>:null
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    element: state.data.element
});
export default connect(
    mapStateToProps, 
    {openElementWidget, addColumnIndex, closeElementWidget, enableElement}
)(NewColumn);