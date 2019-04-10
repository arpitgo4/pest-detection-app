
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, } from 'redux';


class Gallery extends Component {

    render() {
        return (
            <div>Pest Detections</div>
        );
    }
}

const mapStateToProps = ({ pest_detections, }, ownProps) => {

    return {
        pest_detections,
    };

};

const mapDispatchToProps = dispatch => {
    
    return bindActionCreators({
        
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Gallery);