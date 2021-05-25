import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, InputGroup, Label, Input, Button, Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import MaterialInput from '@material-ui/core/Input';
import { MDBDataTable } from 'mdbreact';
import { Table, Alert } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import api from '../api';

import axios from 'axios';
import Select from 'react-select';
const textInput = {
    marginTop: 10
}
const btn = {
    float: 'right',
    marginLeft: 5
}
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            yearDate: new Date(),
            modal_standard: false,
            nested_modal: false,
            Company: '',
            companyType: '',
            companyTypeList: [],
            selectedOption: '',
            phone1: '',
            phone2: '',
            website: '',
            email: '',
            fax: '',
            addressType: '',
            addressTypeList: [],
            selectedOption1: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            // fax1: '',
            // addressType1: '',
            // addressTypeList1: [],
            // selectedOption2: '',
            // address11: '',
            // address12: '',
            // city1: '',
            // state1: '',
            // zip1: '',
            activeid:'',
            Address: [],


        };
        this.handleYearChange = this.handleYearChange.bind(this);
        this.tog_standard = this.tog_standard.bind(this);
        this.tog_standard1 = this.tog_standard1.bind(this);
        this.tog_nested = this.tog_nested.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit3 = this.handleSubmit3.bind(this);

        this.delete = this.delete.bind(this);
        // this.handleSubmit2 = this.handleSubmit2.bind(this);

    }
    handleYearChange(date) {
        this.setState({ yearDate: date });
    }
    tog_standard() {
        this.setState(prevState => ({
            modal_standard: !prevState.modal_standard
        }));
    }
    tog_standard1(address) {
        this.setState(prevState => ({
            modal_standard: !prevState.modal_standard,
            activeid:address.id,
        }));
    }

    tog_nested() {
        this.setState(prevState => ({
            nested_modal: !prevState.nested_modal
        }));
    }
    show() {
        this.setState({ visible: true });
    }
    hide() {
        this.setState({ visible: false });
    }

    // handleSubmit(event) {
    //     console.log('Testing', this.state)
    //     const obj = {
    //         Company: this.state.Company,
    //         company_type: this.state.companyType,
    //         phone1: this.state.phone1,
    //         phone2: this.state.phone2,
    //         website: this.state.website,
    //         email: this.state.email,
    //         fax: this.state.fax,
    //     };
    //     console.log(obj);
    //     fetch('http://127.0.0.1:8000/company/', 
    //     {  
    //         method: 'POST',
    //         headers: {  
    //             'Accept': 'application/json',  
    //             'Content-Type': 'application/json',
    //         },   
    //         body: JSON.stringify(obj)
    //     })
    //     .then((Response) => Response.json())      
    //     .then((result) => {  
    //             console.log(result);   

    //         }) 
    // }


    handleSubmit1(event) {
        console.log('nothing', this.state)
        const obj1 = {
            address_type: this.state.addressType,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
        };
        console.log(obj1);
        fetch('http://127.0.0.1:8000/api/address/post',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj1)
            })
            .then((Response) => Response.json())
            .then((result) => {
                console.log(result);
            })
    }


    handleSubmit3(id,event,pk) {
        console.log('nothing', this.state)
        const obj1 = {
            address_type: this.state.addressType,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
        };
        console.log(obj1);
        fetch('http://127.0.0.1:8000/api/address/put/'+ id,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj1)
            })
            .then((Response) => Response.json())
            .then((result) => {
                console.log(result);
            })
    }
    // useEffect(event) {
    //     console.log('nothing', this.state)
    //     const obj1 = {
    //         address_type:this.state.addressType,
    //         address1:this.state.address1,
    //         address2:this.state.address2,
    //         city:this.state.city,
    //         state:this.state.state,
    //         zip:this.state.zip,
    //     };
    //     console.log(obj1);
    //     fetch('http://127.0.0.1:8000/api/address/delete/1', 
    //     {  
    //         method: 'DELETE',
    //         headers: {  
    //             'Accept': 'application/json',  
    //             'Content-Type': 'application/json',
    //         },   
    //         body: JSON.stringify(obj1)
    //     })
    //     .then((Response) => Response.json())      
    //     .then((result) => {  
    //     console.log(result);   
    //     })             
    //     } 
    delete(pk) {
        // // DELETE request using fetch inside useEffect React hook
        // fetch('http://127.0.0.1:8000/api/address/delete/${pk}', { method: 'DELETE' })
        //     // .then(() => setStatus('Delete successful'));

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
        // const movies = data.results;
        fetch('http://127.0.0.1:8000/api/address/delete/' + pk, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        //     .then(() => {
        //         this.setState({books: this.state.books.filter(book => book.id !== pk)})
        // });
    }

    componentDidMount() {
        // this.getCompanyList()
        this.getDataid()
        this.getData()
        this.getAddressList()
    }

    // getCompanyList() {
    //     fetch('http://127.0.0.1:8000/company_type/',
    //     {
    //         method:'GET',
    //         headers: {  
    //             'Accept': 'application/json',  
    //             'Content-Type': 'application/json',
    //         },   
    //     })
    //     .then((Response) => Response.json())
    //     .then((result) => {  
    //         console.log(result);   
    //         let selected = [];
    //         this.setState({companyTypeList: result});
    //         selected.push({ value:result[0].id, label:result[0].company_name});
    //         console.log(selected);
    //     }) 
    // }
    // handleCompanyTypeChange = selectedOption => {
    //     this.setState({ selectedOption });
    //     this.setState({companyType : selectedOption.value})
    //     console.log(`Option selected:`, selectedOption);
    // };

    getAddressList() {
        fetch('http://127.0.0.1:8000/api/address_type/get',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                let selected = [];
                this.setState({ addressTypeList: result });
                selected.push({ value: result[0].id, label: result[0].addresstype_name });
                console.log(selected);
            })
    }
    handleCompanyTypeChange1 = selectedOption1 => {
        this.setState({ selectedOption1 });
        this.setState({ addressType: selectedOption1.value })
        console.log(`Option selected:`, selectedOption1);
    };

    getData() {
        fetch('http://127.0.0.1:8000/api/address/get',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify()
            })
            .then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                this.setState({ Address: result })
            })
    }

    getDataid(pk) {
        fetch('http://127.0.0.1:8000/api/address/get/' + pk,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify()
            })
            .then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                this.setState({ Address: result })
            })
    }
    render() {
        return (

            <div></div>
            
        )
    }
}
export default Details