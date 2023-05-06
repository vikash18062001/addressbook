import React from "react";
import { Person } from "../../model/Person";
import Service from "../../service/service";
import "./Form.scss"

interface FormProps {
    toEdit: boolean;
    data: Person;
    isClose: any;
}

interface IFormState {
    name: string;
    email: string;
    mobile: string;
    landline: string;
    website: string;
    address: string;
    id: number;
    errors: {
        name: string;
        email: string;
        mobile: string;
        landline: string;
        website: string;
        address: string;
    };
    isSubmitted: boolean;
    isFormValid: boolean;
}

const initialState = {
    name: '',
    email: '',
    mobile: '',
    landline: '',
    website: '',
    address: '',
    id: 0,
    errors: {
        name: 'required',
        email: 'required',
        mobile: 'required',
        landline: 'required',
        website: 'required',
        address: 'required',
    },
    isSubmitted: false,
    isFormValid: false,
}

class Form extends React.Component<FormProps, IFormState> {
    constructor(props: any) {
        super(props);
        if (!this.props.toEdit) {
            this.state = initialState;
        } else {
            this.state = {
                name: this.props.data.name,
                email: this.props.data.email,
                mobile: this.props.data.mobile,
                landline: this.props.data.landline,
                website: this.props.data.website,
                address: this.props.data.address,
                id: this.props.data.id,
                errors: {
                    name: '',
                    email: '',
                    mobile: '',
                    landline: '',
                    website: '',
                    address: ''
                },
                isSubmitted: false,
                isFormValid: true,
            }
        }
    }

    handleChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as Pick<IFormState, keyof IFormState>);
        this.checkValidation(e);
    }

    checkValidation = (e: any) => {
        const { name, value } = e.target;
        const errors = { ...this.state.errors }

        switch (name) {
            case 'name':
                errors.name = value.length === 0 ? "required" : '';
                break;
            case 'email':
                errors.email = value.length === 0 ? 'required' : '';
                break;
            case 'mobile':
                errors.mobile = value.length === 0 ? 'requried' : '';
                break;
            case 'landline':
                errors.landline = value.length === 0 ? 'required' : '';
                break;
            case 'website':
                errors.website = value.length === 0 ? 'required' : '';
                break;
            case 'address':
                errors.address = value.length === 0 ? 'required' : '';
                break;
            default:
                break;
        }
        
        this.setState({ errors: errors } as Pick<IFormState, keyof IFormState>)
    }

    submitForm = (e: any) => {
        let flag = 0;
        e.preventDefault();
        this.setState({ isSubmitted: true });
        Object.values(this.state.errors).map((key, index) => {
            if (key.length > 0) {
                flag = 1;
            }
        })

        this.setState({ isFormValid: flag == 1 ? false : true }, () => {
            if (this.state.isFormValid) {
                if (!this.props.toEdit) {
                    Service.add(this.state)
                } else {
                    Service.update(this.state);
                }
                this.closeForm();
            }
        });
    }

    closeForm = () => {
        this.props.isClose();
    }

    render() {
        const { errors } = this.state;
        return (
            <section className="form-container">
                <div className="user-form">
                    <form action="">
                        <div className="close">
                            <button type="button" onClick={this.closeForm} className="close-btn">Close</button>
                        </div>
                        <div className="input-field">
                            <span>Name</span>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={this.handleChange}
                                className={this.state.isSubmitted && errors.name.length > 0 ? 'is-invalid-field' : ''}
                                value={this.state.name}
                            />
                            {this.state.isSubmitted && errors.name.length > 0 && <span className="is-invalid-text">required</span>}
                        </div>
                        <div className="input-field">
                            <span>Email</span>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={this.handleChange}
                                className={this.state.isSubmitted && errors.email.length > 0 ? 'is-invalid-field' : ''}
                                value={this.state.email} />
                            {this.state.isSubmitted && errors.email.length > 0 && <span className="is-invalid-text">required</span>}
                        </div>
                        <div className="contact-detail">
                            <div className="input-field">
                                <span>Mobile</span>
                                <input
                                    type="text"
                                    name="mobile"
                                    id="mobile"
                                    onChange={this.handleChange}
                                    value={this.state.mobile}
                                    className={this.state.isSubmitted && errors.mobile.length > 0 ? 'is-invalid-field' : ''}
                                />
                                {this.state.isSubmitted && errors.mobile.length > 0 && <span className="is-invalid-text">required</span>}
                            </div>
                            <div className="input-field">
                                <span>Landline</span>
                                <input
                                    type="text"
                                    name="landline"
                                    id="landline"
                                    onChange={this.handleChange}
                                    className={this.state.isSubmitted && errors.landline.length > 0 ? 'is-invalid-field' : ''}
                                    value={this.state.landline} />
                                {this.state.isSubmitted && errors.landline.length > 0 && <span className="is-invalid-text">required</span>}
                            </div>
                        </div>
                        <div className="input-field">
                            <span>Website</span>
                            <input
                                type="text"
                                name="website"
                                id="website"
                                onChange={this.handleChange}
                                className={this.state.isSubmitted && errors.website.length > 0 ? 'is-invalid-field' : ''}
                                value={this.state.website} />
                            {this.state.isSubmitted && errors.website.length > 0 && <span className="is-invalid-text">required</span>}

                        </div>
                        <div className="input-field">
                            <span>Address</span>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                onChange={this.handleChange}
                                className={this.state.isSubmitted && errors.address.length > 0 ? 'is-invalid-field address' : 'address'}
                                value={this.state.address} />
                            {this.state.isSubmitted && errors.address.length > 0 && <span className="is-invalid-text">required</span>}

                        </div>
                        <footer>
                            <button type="submit" className="add-btn" onClick={this.submitForm}>Add</button>
                        </footer>
                    </form>
                </div>
            </section>
        );
    }
}

export default Form;