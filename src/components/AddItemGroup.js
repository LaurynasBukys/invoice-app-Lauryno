import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import itemGroupService from "../services/itemGroup.service";
import {t} from "i18next";

const AddItemGroup = () => {
    const [pavadinimas, setItemGroupName] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const saveItemGroup = (e) => {
        e.preventDefault();
        const itemGroup = {pavadinimas, id}

    if (id) {
        itemGroupService.update(itemGroup)
            .then(response => {
                console.log('Item group data updated successfully', response.data);
                navigate('/itemGroup'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })}
        else {
        itemGroupService.create(itemGroup)
            .then(response => {
                console.log('Item group added successfully',  response.data);
                navigate('/itemGroup');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })}  
    }

    useEffect(() => {
        if (id) {
          itemGroupService.get(id)
            .then(itemGroup => {
                setItemGroupName(itemGroup.data.pavadinimas);
                })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>{t('addItemGroup')}</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="pavadinimas"
                        value={pavadinimas}
                        onChange={(e) => setItemGroupName(e.target.value)}
                        placeholder={t('enterItemGroupName')}
                     />
                </div>

                <br />
                <hr/>
                <div>
                    <button onClick={(e) => saveItemGroup(e)}
                    className="btn btn-outline-primary">{t('btnSave')}</button>
                    <button onClick={() => navigate('/itemGroup')} className="btn btn-outline-info ml-2">
                        {t('btnBack')}</button>
                </div>
            </form>
            <hr/>
        </div>
    )
  }


export default AddItemGroup;