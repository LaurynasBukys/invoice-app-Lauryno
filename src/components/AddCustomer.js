import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import customerService from "../services/customer.service";
import { t } from "i18next";
import Select from "react-select"

const AddCustomer = () => {
  const [vardas, setFirstName] = useState('');
    const [pavarde, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tipas, setType] = useState(t('select'));
    const [adresas, setAddress] = useState('');
    const [telNumeris, setPhone] = useState('');
    const [klientoStatusas, setCustomerStatus] = useState(t('select'));
    const navigate = useNavigate();
    const {id} = useParams();
    
    const activityOption = [
        { value: "Aktyvus", label: "Aktyvus"},
        { value: "Neaktyvus", label: "Neaktyvus"},
    ];
 
    const clientType = [
        { value: "Fizinis", label: "Fizinis"},
        { value: "Juridinis", label: "Juridinis"},
    ];

    const customer = {vardas, pavarde, email, tipas, adresas, telNumeris, klientoStatusas, id};
    const saveCustomer = (e) => {
        e.preventDefault();
        console.log(customer);
        
        if (id) {
            // update record
            customerService.update(customer)
                .then(response => {
                    console.log('Employee data updated successfully', response.data);
                    navigate('/customers'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            customerService.create(customer)
            .then(response => {
                console.log('Employee added successfully',  response.data);
                navigate('/customers');
            })
            .catch(error => {
                console.log('Something went wrong customer not created', error);
            })
        }
    }

    

    useEffect(() => {
        console.log(customer)
        if (id) {
          customerService.get(id)
                .then(customer => {
                    setFirstName(customer.data.vardas);
                    setLastName(customer.data.pavarde);
                    setEmail(customer.data.email);
                    setType(customer.data.tipas);
                    setAddress(customer.data.adresas);
                    setPhone(customer.data.telNumeris);
                    setCustomerStatus(customer.data.klientoStatusas);
                    
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>{t('addCustomer')}</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="vardas"
                        value={vardas}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={t('enterCustomerName')}
                     />

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="pavarde"
                       value={pavarde}
                       onChange={(e) => setLastName(e.target.value)}
                       placeholder={t('enterCustomerLastName')}
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder={t('enterCustomerEmail')}
                    /> 

                </div>
                <div className="form-group">
                    <Select
                       getLabel = {a => a.value }
                       getOptionValue={a => a} 
                       id="customer"
                       placeholder={tipas}
                       className="col-4 px-0" 
                       options={clientType}
                       onChange={(e) => setType(e.value)}
                    /> 
                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="adresas"
                       value={adresas}
                       onChange={(e) => setAddress(e.target.value)}
                       placeholder={t('enterCustomerAddress')}
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="telNumeris"
                       value={telNumeris}
                       onChange={(e) => setPhone(e.target.value)}
                       placeholder={t('enterCustomerPhone')}
                    /> 

                </div>
                <div className="form-group">
                    <Select 
                        getLabel = {a => a.value }
                        getOptionValue={a => a} 
                        id="customer"
                        value={klientoStatusas}
                        placeholder={klientoStatusas}
                        className="col-4 px-0" 
                        options={activityOption}
                        onChange={(e) => setCustomerStatus(e.value)}
                    >
                    </Select>   
                </div>
                <br />
            <hr/>
                <div>
                    <button onClick={(e) => saveCustomer(e)}
                    className="btn btn-outline-primary">{t('btnSave')}</button>
                    <button onClick={() => navigate('/customers')} className="btn btn-outline-info ml-2">
                        {t('btnBack')}</button>
                </div>
            </form>
            <hr/>
            {/* <Link to="/customers">Atgal į sąrašą</Link> */}
        </div>
    )
};

export default AddCustomer;
