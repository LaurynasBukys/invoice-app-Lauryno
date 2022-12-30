import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import itemGroupService from "../services/itemGroup.service";
import AuthService from "../services/auth.service";
import {t} from "i18next";

const ItemGroupList = () => {
    const [itemGroup, setItemGroup] = useState([]);
 
    const user = AuthService.getCurrentUser().roles;    

useEffect(() => {
    init();
},[])
    
const init = () => {
    itemGroupService
      .getAll()
      .then((response) => {
        console.log("Printing ItemGroups data", response.data);
        setItemGroup(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    itemGroupService
      .remove(id)
      .then((response) => {
        console.log("ItemGroup deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  }; 

  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h3>{t('itemGroupList')}</h3>
      <hr />
      <div>
      
      {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MANAGER")) &&
      
        <Link
          to="/itemGroup/add"
          className="btn btn-outline-primary btn-block btn-lg mb-2"
        >
          {t('addItemGroup')}
        </Link>}
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>{t('itemGroup')}</th>
              {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MANAGER")) &&
              <th>{t('actions')}</th>}
            </tr>
          </thead>
          <tbody >
          {itemGroup.map((itemGroup) => (
              <tr key={itemGroup.id} >
                <td>{itemGroup.pavadinimas}</td>
                {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MANAGER")) &&
                <td style={{textAlign:"center"}}>
                  <Link
                    to={`/itemGroup/edit/${itemGroup.id}`}
                    className="btn btn-outline-success mt-2 mr-2"
                  >
                    {t('btnEdit')}
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(itemGroup.id);
                    }}
                  >
                    {t('btnDelete')}
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


}

export default ItemGroupList;