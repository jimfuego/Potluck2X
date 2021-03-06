import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

export default class RSVPwItems extends Component {
  constructor(props) {
    super(props);
    this.selecteditem = "";
    this.amount = 0;
    this.state = {
      list: this.props.theevent.list,
      objid: this.props.theevent._id
    };
  }

  onSubmit() {
    let data = { list: this.state.list, itemname: this.selecteditem.value, itemquantity: this.amount.value, theid: this.state.objid };
    Meteor.call("events.rsvp", data, (err, res) => {
      if (err) {
        alert("There was error inserting check the console");
        console.log(err);
        return;
      }
      console.log(res);
    });
  }

  renderTheSelection() {
    return this.state.list.map((eve, i) => (
      <option key={this.state.list[i]} value={this.state.list[i]}>
        {this.state.list[i]}
      </option>
    ));
  }

  render() {
    return (
      <div className="form-group">
        <form
          className="form-signin"
          noValidate
          onSubmit={this.onSubmit.bind(this)}
        >
          <label htmlFor="optionsselect">Items to Bring:</label>
          <select 
            className="form-control" 
            id="optionsselect"
            ref={input => (this.selecteditem = input)}>
            {this.renderTheSelection()}
          </select>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            min="0"
            ref={input => (this.amount = input)}
          />
          <div className="make-center">
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              type="submit"
              className="btn btn-lg btn-primary btn-block text-uppercase"
            >
              Im In!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

RSVPwItems.propTypes = {
  theevent: PropTypes.object.isRequired

};