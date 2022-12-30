import React from "react";
import {useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import itemService from "../services/item.service";
import itemGroupService from "../services/itemGroup.service";
import { t } from "i18next";
import Select from "react-select";

const AddItem = () => {
    const [pavadinimas, setItemName] = useState('');
    const [kodas, setItemCode] = useState('');
    const [aprasymas, setItemDescription] = useState('');
    const [grupe, setItemGroup] = useState([]);
   
    const [statusas, setItemStatus] = useState(t('enterItemStatus'));
    const [bazineKaina, setBazineKaina] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    const [grupeId, setItemGroups] = useState([]);

    const init = () => {
        itemGroupService
            .getAll()
            .then((response) => {
                console.log("Printing ItemGroup data", response.data);
                console.log("Gavau", response.data);
                setItemGroup(response.data);
                
            })
            .catch((error) => {
                console.log("Ups", error);
            });

        };

    const saveItem = (e) => {
        e.preventDefault();
        const item = {pavadinimas, kodas, aprasymas, grupeId, statusas, bazineKaina, id};
        
        if (id) {
            itemService.update(item)
                .then(response => {
                    console.log('Item data updated successfully', response.data);
                    console.log('Item data ', item);
                    navigate('/items'); 
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })}
         else {
            itemService.create(item)
                .then(response => {
                    console.log('Item added successfully',  response.data);
                    console.log('Item added ',  item);

                    navigate('/items');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })}  
        }

        
        useEffect(() => {
            init();

        if (id) {
          itemService.get(id)
            .then(item => {
                setItemName(item.data.pavadinimas);
                setItemCode(item.data.kodas);
                setItemDescription(item.data.aprasymas);
                setItemGroups(item.data.grupeId);
                setItemStatus(item.data.statusas);
                setBazineKaina(item.data.bazineKaina);     
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },);


    const activityOption = [
        { value: "Aktyvus", label: "Aktyvus"},
        { value: "Neaktyvus", label: "Neaktyvus"},
    ];

    return(
        <div className="container">
            <h3>{t('addItem')}</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="pavadinimas"
                        value={pavadinimas}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder={t('enterItemName')}
                     />
                </div>

                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="kodas"
                       value={kodas}
                       onChange={(e) => setItemCode(e.target.value)}
                       placeholder={t('enterItemCode')}
                    /> 
                </div>

                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="aprasymas"
                       value={aprasymas}
                       onChange={(e) => setItemDescription(e.target.value)}
                       placeholder={t('enterItemDescription')}
                    /> 
                </div>

                {/* <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="grupe"
                       value={grupe}
                       onChange={(e) => setItemGroup(e.target.value)}
                       placeholder={t('enterItemGroup')}
                    /> 
                </div> */}

                <div className="form-group">
                    <Select
                        placeholder={t('select')}
                        value={grupeId}
                        options={grupe}
                        getOptionLabel = {a => a.pavadinimas}
                        getOptionValue={a=>a}
                        className="col-4 px-0"
                        id="grupeId"
                        onChange={(e) => setItemGroups(e)}
                        >
                    </Select>    
                </div>

                <div className="form-group">
                    <Select 
                        className="col-4 px-0"
                        // id="statusas" 
                        placeholder={statusas}
                        options={activityOption}
                        onChange={(e) => setItemStatus(e.value)}>
                    </Select>
                </div>

                <div className="form-group">
                    <input
                       type="number" 
                       step="0.01"
                       className="form-control col-4"
                       id="bazineKaina"
                       value={bazineKaina}
                       onChange={(e) => setBazineKaina(e.target.value)}
                       placeholder={t('enterItemBasisPrice')}
                    /> 
                </div>
                <br />
                <hr/>
                <div>
                    <button onClick={(e) => saveItem(e)}
                    className="btn btn-outline-primary">{t('btnSave')}</button>
                    <button onClick={() => navigate('/items')} className="btn btn-outline-info ml-2">
                        {t('btnBack')}</button>
                </div>
            </form>
            <hr/>
            {/* <Link to="/items">Atgal į sąrašą</Link> */}
        </div>
    )
};

export default AddItem;
