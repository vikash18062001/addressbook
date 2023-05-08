import React, { Component } from "react";
import { connect } from "react-redux";
import { Person } from "../../model/Person";
import Detail from "../detail/Detail";
import Form from "../form/Form";
import List from "../list/List";
import { addPerson, deletePerson, getAllPerson, updatePerson } from "../store/action/person";

import "./Home.scss";

interface HomeProps {
    personState: any;
    addPerson: typeof addPerson;
    getAllPerson: typeof getAllPerson;
    deletePerson: typeof deletePerson;
}

interface HomeState {
    showData: Person;
    showEditFormData: Person;
    showEditForm: boolean;
    showForm: boolean;
}

class Home extends Component<HomeProps, HomeState> {
    person: Person = {} as Person;
    constructor(props: any) {
        super(props)
        this.state = {
            showData: this.person,
            showForm: false,
            showEditForm: false,
            showEditFormData: this.person,
        }
    }

    componentDidMount() {
        this.props.getAllPerson();
    }

    showDetail = (data: any) => {
        this.setState({ showData: data })
    }

    showForm = (e: any) => {
        e.preventDefault();
        this.setState({ showForm: true })
    }

    showFormForEdit = (data: Person) => {
        this.setState({ showEditForm: true, showEditFormData: data });
    }

    closeForm = () => {
        this.setState({ showEditForm: false, showForm: false, showData: {} as Person });
    }

    handleDelete = () => {
        this.props.deletePerson(this.state.showData.id);
        this.setState({ showData: this.person })
    }

    render() {
        return (
            <>
                <section>
                    <header className="heading">
                        Address Book
                    </header>
                    <nav>
                        <div>
                            <a href="" className="nav-item">Home</a>
                            <a href="" className="nav-item" onClick={this.showForm}>+Add</a>
                        </div>
                        <img src={require("../../assets/blog-icon.png")} alt="not loading" />
                    </nav>
                    <div className="detail-container">
                        <div className="left-side">
                            <h3>CONTACTS</h3>
                            {this.props.personState.persons && this.props.personState.persons.map((data: Person) => {
                                return (
                                    <div onClick={() => this.showDetail(data)}>
                                        <React.Fragment key={data.id} >
                                            <List data={data}></List>
                                        </React.Fragment>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="right-side">
                            {this.state.showData.name !== undefined && <Detail data={this.state.showData} toShow={this.showFormForEdit} deleteFunc={this.handleDelete}></Detail>}
                        </div>
                    </div>
                </section>
                {(this.state.showForm || this.state.showEditForm) && <Form toEdit={this.state.showEditForm ? true : false}
                    data={this.state.showEditForm ? this.state.showEditFormData : this.state.showData} isClose={this.closeForm}></Form>}
            </>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        personState: state.person
    }
}

export default connect(mapStateToProps, { addPerson, getAllPerson, deletePerson, updatePerson })(Home);


