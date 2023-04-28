import { timeStamp } from "console";
import React, { Component } from "react";
import { Person } from "../../model/Person";
import Service from "../../service/service";
import Detail from "../detail/Detail";
import Form from "../form/Form";
import List from "../list/List";
import "./Home.scss";

interface HomeProps {

}

interface HomeState {
    showData: Person;
    showEditFormData: Person;
    showEditForm: boolean;
    showForm: boolean;
    requestComplete : boolean;
    allPersonData : any
}

class Home extends Component<HomeProps, HomeState> {
    // state = { :  }
    person: Person = {} as Person;
    constructor(props: any) {
        super(props)
        this.state = {
            showData: this.person,
            showForm: false,
            showEditForm: false,
            showEditFormData: this.person,
            requestComplete : false,
            allPersonData : []
        }
    }

    componentDidMount() {
        Service.getAll().then((response)=>{
            this.setState({allPersonData:response.data})
        })
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
        this.setState({ showEditForm: false, showForm: false },()=>{
            Service.getAll().then((response)=>{
                this.setState({allPersonData:response.data,showData:this.person})
            })
        });
    }

    handleDelete = () => {
        Service.delete(this.state.showData.id).then((response)=>{
            Service.getAll().then((response)=>{
                this.setState({allPersonData:response.data,showData:this.person})
            })
        });
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
                        <img src="../../../public/blog-icon.png" alt="not loading" />
                    </nav>
                    <div className="detail-container">
                        <div className="left-side">
                            <h3>CONTACTS</h3>
                            {this.state.allPersonData.map((data: Person) => {
                                return (
                                    <div onClick={() => this.showDetail(data)}>
                                        <List data={data}></List>
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

export default Home;