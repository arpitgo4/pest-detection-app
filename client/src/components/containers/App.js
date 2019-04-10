
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';

import styles from './App.style.css';

import { deleteJWToken, deleteAllState, } from '../../action-creators/auth';

import { removeTokenFromLS, removeUserFromLS } from '../../config/local-storage';

import { Layout, Icon, Slider, Input, Button, } from 'antd';
import Gallery from '../Gallery/Gallery';

import { pestActionCreators, } from '../../action-creators/index.action-creator';

const { Content, Sider, } = Layout;

class App extends Component {

    state = {
        filters: {
            pest_name: 'Test Pest',
            detection_ratio: [0.0, 1.0],
        },
    };

    componentWillMount() {
        const { token, logged_in_user } = this.props;

        if (!token) {
            browserHistory.replace('/');
            return;
        }
    }

    render() {
        const { pest_detections, createPestDetection, } = this.props;

        return (
            <Layout>
                <Sider width={300} style={{ margin: '24px 0', marginLeft: 12, padding: 24, background: '#fff' }}>
                    {this._renderFilterPanel.call(this)}
                </Sider>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    <div style={{ marginRight: 20 }}
                        styleName="logout-wrapper"
                        onClick={this.logoutHandler.bind(this)}
                        className="pull-right" >
                        <Icon type="logout" />
                        <span>
                            {'  '} Logout
                        </span>
                    </div>

                    <Gallery 
                        createPestDetection={createPestDetection}
                        pest_detections={pest_detections} />
                </Content>
            </Layout>
        );
    }

    _renderFilterPanel() {
        return (
            <div>

                <div style={{ margin: '10px 0' }}>
                    <h3>Filters:</h3>
                    <Input 
                        ref="pest_name"
                        placeholder="%Pest Name%" 
                        value={this.state.filters.pest_name}
                        onChange={(f_n => e => this._searchInputChange.bind(this)(e, f_n))('pest_name')} 
                        style={{ margin: '10px 0' }} />
                </div>
                <div>
                    <div>
                        <h4>Detection Ratio:</h4>
                        <Slider 
                            max={1.0} min={0.0}
                            range step={0.01} defaultValue={this.state.filters.detection_ratio} 
                            onChange={(f_n => e => this._searchInputChange(e, f_n))('detection_ratio')} />
                    </div>
                </div>

                <div>
                    <Button
                        style={{ margin: '10px 0' }} 
                        className="pull-right" 
                        type="primary" 
                        onClick={this._applyFilters.bind(this)}>
                        Apply    
                    </Button>
                </div>

            </div> 
        );
    }

    _applyFilters() {
        this._fetchPestDetections();
    }

    _fetchPestDetections() {
        const { getPestDetections, } = this.props;
        const { pest_name, detection_ratio, } = this.state.filters;

        console.log(this.state.filters);
        getPestDetections(pest_name, detection_ratio[0], detection_ratio[1]);
    }

    _searchInputChange(e, field_name) {
        if (field_name === 'detection_ratio') {
            this.setState({filters: {
                ...this.state.filters,
                [field_name]: e,
            }});
        }
        else {
            this.setState({ filters: {
                ...this.state.filters,
                [field_name]: e.target.value },
            });
        }
    }

    componentDidMount() {
        this._fetchPestDetections();
    }

    logoutHandler() {
        const { deleteJWToken, deleteAllState, } = this.props;

        removeTokenFromLS();
        removeUserFromLS();
        deleteAllState();
        browserHistory.replace('/');
    }
};

const mapStateToProps = (state, ownProps) => {
    const { logged_in_user, token } = state.auth;
    const { pest_detections, } = state;

    return {
        logged_in_user,
        token,
        pest_detections,
    };
};

const mapDispatchToProps = (dispatch) => {
    const { getPestDetections, createPestDetection, } = pestActionCreators; 

    return bindActionCreators({
        getPestDetections,
        createPestDetection,
        deleteJWToken,
        deleteAllState,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(App, styles));