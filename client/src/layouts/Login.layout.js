
import React, { Component } from 'react';
import { browserHistory, Link, } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchJWToken } from '../action-creators/auth';
import { ROUTES, } from '../config/constants';

class LoginLayout extends Component {

  render() {
    const { is_loading } = this.props;

    return (
      <div>
        <div className="row">
          <p style={{ marginTop: 150, fontSize: 30 }} className="text-center">
            Pest Detection App
          </p>
        </div>

        <div className="container-fluid" style={{ position: 'absolute', top: '30%', transform: 'translate(0, 0%)' }}>
        <div className="row">
        <div className="col-sm-6 col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div style={styles['panel-heading']}>
              <strong> Sign in to continue</strong>
            </div>
            <div className="panel-body">
              <div>
                <fieldset>
                  <div className="row">
                    <div className="center-block">
                      <img style={styles['profile-img']}
                        src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt=""></img>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-earphone"></i>
                          </span> 
                          <input 
                            className="form-control" 
                            ref="mobile" placeholder="Mobile Number" 
                            type="text"></input>
                        </div>
                      </div>
                      <div className="form-group">
                        <button onClick={this.loginHandler.bind(this)}
                          className="btn btn-lg btn-primary btn-block">
                          { is_loading ? <i className="fa fa-spinner fa-pulse"></i> : null }
                          &nbsp;&nbsp;
                          Sign in
                        </button>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div style={styles['panel-footer']}>
              Don't have an account! <Link to="/register"> Sign Up Here</Link>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }

    loginHandler() {
      const { fetchJWToken } = this.props;
      const { mobile, } = this.refs;
      
      fetchJWToken(mobile.value)
      .then(() => browserHistory.push(ROUTES.PEST_DETECTION_GALLERY));
    }
}

const styles = {
  'panel-heading': {
    padding: '15px 15px',
    textAlign: 'center'
  },
  'panel-footer': {
    padding: '1px 15px',
    color: '#A0A0A0',
    textAlign: 'center'
  },
  'profile-img': {
    width: '96px',
    height: '96px',
    margin: '0 auto 10px',
    display: 'block',
    MozBorderRadius: '50%',
    WebkitBorderRadius: '50%',
    borderRadius: '50%'
  }
};

const mapStateToProps = ({ auth }) => {
  const { misc } = auth;
  return {
    is_loading: misc.is_loading
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchJWToken
  }, dispatch);
};

      
export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout);