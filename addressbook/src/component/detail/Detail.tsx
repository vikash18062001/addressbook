import React from "react";
import "./Detail.scss";

interface DetailProps {
    data : any;
    toShow : any;
    deleteFunc : any;
}

interface DetailState {

}

class Detail extends React.Component<DetailProps, DetailState> {
    // state = { :  }

    handleEdit = ()=>{
        this.props.toShow(this.props.data);
    }

    handleDelete = ()=>{
        this.props.deleteFunc();
    }

    render() {
        return (
            <section className="detail-componet">
                <div>
                    <div className="headers">
                        <header className="user-name">{this.props.data.name}</header>
                        <div className="buttons">
                                <button type="button" className="edit-btn" onClick={this.handleEdit}>EDIT</button>
                                <button type="button" className="delete-btn" onClick={this.handleDelete}>DELETE</button>
                        </div>
                    </div>
                    <p>Email: {this.props.data.email}</p>
                    <div className="phone">
                        <span>Mobile: {this.props.data.mobile}</span>
                        <span>LandLine: {this.props.data.landline}</span>
                    </div>
                    <div className="url">
                        <p>Website: {this.props.data.website}</p>
                    </div>
                    <div className="address">
                        <p>Address: {this.props.data.address}</p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Detail;