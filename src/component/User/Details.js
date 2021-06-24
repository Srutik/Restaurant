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
            activeid: '',
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
            activeid: address.id,
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


    handleSubmit3(id, event, pk) {
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
        fetch('http://127.0.0.1:8000/api/address/put/' + id,
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
        const Currency = (props) => (
            <InputMask mask="$ 99.99" value={props.value} className="form-control" onChange={props.onChange}>
                {(inputProps) => <MaterialInput {...inputProps} prefix='$' type="tel" disableUnderline />}
            </InputMask>
        );

        const { companyTypeList } = this.state;
        const { selectedOption } = this.state;
        const companytypeoptions = companyTypeList.map(suggestion => (
            {
                value: suggestion.id,
                label: suggestion.company_name,
            }));

        const { addressTypeList } = this.state;
        const { selectedOption1 } = this.state;
        const addresstypeoptions = addressTypeList.map(suggestion => (
            {
                value: suggestion.id,
                label: suggestion.addresstype_name,
            }));

        return (

            <Row>
                <Col lg="10">
                    <Card>
                        <CardBody>
                            <Form action="#" onSubmit={this.handleSubmit} >
                                <FormGroup className="mb-0 forminput"  >
                                    <Row>
                                        <Col md="4">
                                            <Label>Company</Label>
                                            <Input type="text"
                                                placeholder="Company Name"
                                                id="example-text-input"
                                                onChange={(e) => this.setState({ Company: e.target.value })}
                                                name="c_name"
                                                value={this.state.Company} />
                                        </Col>

                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-0 forminput"  >
                                    <Row>
                                        <Col md="4">
                                            <Label>Company Type</Label>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleCompanyTypeChange}
                                                options={companytypeoptions}
                                                isSearchable={true}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-0 forminput" style={textInput}>
                                    <Row>
                                        <Col md="4">
                                            <Label>Phone1</Label>
                                            <Input
                                                type="text"
                                                placeholder="Phone"
                                                id="example-text-input"
                                                onChange={(e) => this.setState({ phone1: e.target.value })}
                                                name="phone1"
                                                value={this.state.phone1} />
                                        </Col>
                                        <Col md="4">
                                            <Label>Website</Label>
                                            <Input type="text"
                                                placeholder="Website"
                                                id="example-text-input"
                                                onChange={(e) => this.setState({ website: e.target.value })}
                                                name="website"
                                                value={this.state.website} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-0 forminput" style={textInput}>
                                    <Row>
                                        <Col md="4">
                                            <Label>Phone2</Label>
                                            <Input type="text"
                                                placeholder="Phone2"
                                                id="example-text-input"
                                                onChange={(e) => this.setState({ phone2: e.target.value })}
                                                name="phone2"
                                                value={this.state.phone2} />
                                        </Col>
                                        <Col md="4">
                                            <Label>Email</Label>
                                            <Input type="text"
                                                placeholder="Email"
                                                id="example-text-input"
                                                onChange={(e) => this.setState({ email: e.target.value })}
                                                name="email"
                                                value={this.state.email} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-0 forminput" style={textInput}>
                                    <Row>
                                        <Col md="4">
                                            <Label>Fax</Label>
                                            <Input type="text"
                                                placeholder="Fax"
                                                id="example-text-input"
                                                onChange={(e) => this.setState({ fax: e.target.value })}
                                                name="fax"
                                                value={this.state.fax} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                {/* </ValidatorForm> */}
                            </Form>
                            <ModalFooter>
                                {/* <Button type="button" color="danger" className="waves-effect waves-light" style={{ marginRight: '58%' }}>Delete</Button> */}
                                <Button type="submit" color="primary" className="waves-effect waves-light" onClick={this.handleSubmit}  >Save</Button>
                                {/* onSubmit={this.handleSubmit} by rutvik */}
                                <Button type="button" color="secondary" onClick={this.tog_nested} className="waves-effect">Next</Button>


                            </ModalFooter>
                            <Label style={{ marginTop: 10 }}>Address</Label>
                            {/* <MDBDataTable
                                        responsive
                                        striped
                                        data={data}
                                    /> */}
                            <Table variant="dark" striped bordered hover>

                                <tr>
                                    <th>Address type</th>
                                    <th>Address 1</th>
                                    <th>Address 2</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip</th>
                                    <th>Function</th>
                                </tr>
                                <tr>
                                    <th>
                                        {/* <input type="text" ref="txttype" placeholder="Enter Type" onChange={(e) => this.setState({address_type: e.target.value})} name="address_type"/> */}
                                        <Select

                                            value={selectedOption1}
                                            onChange={this.handleCompanyTypeChange1}
                                            options={addresstypeoptions}
                                            isSearchable={true}
                                        />
                                    </th>
                                    <th>
                                        <input type="text" ref="txtAdd1" placeholder="Enter Add1" onChange={(e) => this.setState({ address1: e.target.value })} name="address1" />
                                    </th>
                                    <th>
                                        <input type="text" ref="txtAdd2" placeholder="Enter Add2" onChange={(e) => this.setState({ address2: e.target.value })} name="address2" />
                                    </th>
                                    <th>
                                        <input type="text" ref="txtCity" placeholder="Enter City" onChange={(e) => this.setState({ city: e.target.value })} name="city" />
                                    </th>
                                    <th>
                                        <input type="text" ref="txtState" placeholder="Enter State" onChange={(e) => this.setState({ state: e.target.value })} name="state" />
                                    </th>
                                    <th>
                                        <input type="text" ref="txtZip" placeholder="Enter Zip" onChange={(e) => this.setState({ zip: e.target.value })} name="zip" />
                                    </th>
                                </tr>
                                <tbody>
                                    {this.state.Address.map((address, key) => {
                                        return <tr key={address.id}>
                                            <td>{address.address_type}</td>
                                            <td>{address.address1}</td>
                                            <td>{address.address2}</td>
                                            <td>{address.city}</td>
                                            <td>{address.state}</td>
                                            <td>{address.zip}</td>
                                            <td><IconButton aria-label="edit">
                                                <EditIcon onClick={() => this.tog_standard1(address)} color="primary" fontSize="small" />
                                            </IconButton>
                                                <Modal isOpen={this.state.modal_standard} toggle={this.tog_standard1} _id={this.state.activeid}>
                                                    <div className="modal-header">
                                                        <h5 className="modal-title mt-0" id="myModalLabel">Address</h5>
                                                        <button type="button" onClick={() => this.setState({ modal_standard: false })} className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <ModalBody style={{ 'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto' }}>

                                                        <Form action="#">
                                                            <FormGroup className="mb-0 forminput" style={textInput}>
                                                                <Row>
                                                                    <Col md="4">
                                                                        <Label>Address Type</Label>
                                                                        <Select

                                                                            value={selectedOption1}
                                                                            onChange={this.handleCompanyTypeChange1}
                                                                            options={addresstypeoptions}
                                                                            isSearchable={true}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="4">
                                                                        <Label>Address 1</Label>
                                                                        <Input type="text"
                                                                            id="example-text-input"
                                                                            onChange={(e) => this.setState({ address1: e.target.value })}
                                                                            name="fax"
                                                                            value={this.state.address1} />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="4">
                                                                        <Label>Address2</Label>
                                                                        <Input type="text"
                                                                            id="example-text-input"
                                                                            onChange={(e) => this.setState({ address2: e.target.value })}
                                                                            name="fax"
                                                                            value={this.state.address2} />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="4">
                                                                        <Label>City</Label>
                                                                        <Input type="text"
                                                                            id="example-text-input"
                                                                            onChange={(e) => this.setState({ city: e.target.value })}
                                                                            name="fax"
                                                                            value={this.state.city} />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="4">
                                                                        <Label>State</Label>
                                                                        <Input type="text"
                                                                            id="example-text-input"
                                                                            onChange={(e) => this.setState({ state: e.target.value })}
                                                                            name="fax"
                                                                            value={this.state.state} />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="4">
                                                                        <Label>Zip</Label>
                                                                        <Input type="text"
                                                                            id="example-text-input"
                                                                            onChange={(e) => this.setState({ zip: e.target.value })}
                                                                            name="fax"
                                                                            value={this.state.zip} />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Row>
                                                            <Col>
                                                                <Button type="reset" color="primary" style={{ marginRight: 2 }} onClick={() => this.handleSubmit3(this.props._id)}> Update </Button>
                                                                <Button type="reset" color="secondary" style={btn} onClick={this.tog_standard1}>Cancel</Button>
                                                            </Col>
                                                        </Row>
                                                    </ModalFooter>
                                                </Modal>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon color="secondary" fontSize="small" onClick={() => this.delete(address.id)} />
                                                </IconButton></td>

                                        </tr>
                                    })}


                                </tbody>
                                <ModalFooter>
                                    {/* <Button type="button" color="danger" className="waves-effect waves-light" style={{ marginRight: '58%' }}>Delete</Button> */}
                                    <Button type="submit" color="primary" className="waves-effect waves-light" onClick={this.handleSubmit1}  >Save</Button>
                                    {/* onSubmit={this.handleSubmit} by rutvik */}
                                    <Button type="button" color="secondary" onClick={this.tog_nested} className="waves-effect">Next</Button>


                                </ModalFooter>
                            </Table>
                        </CardBody>
                    </Card>

                </Col>
            </Row>


        )
    }
}
export default Details