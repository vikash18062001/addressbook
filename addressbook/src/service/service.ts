import React, { Component } from "react";
import axios from 'axios';
import { Person } from "../model/Person";

const api = "https://localhost:7078";
class Service extends Component {

    static add = (person: Person) => {
        return axios.post(`${api}/api`, person)
    }

    static getAll = () => {
        return axios.get(`${api}/api`);
    }

    static get = (id: number) => {
        return axios.get(`${api}/api/${id}`);
    }

    static update = (person: Person) => {
        return axios.put(`${api}/api`, person);
    }

    static delete = (id: number) => {
        return axios.delete(`${api}/api/${id}`);
    }
}

export default Service;