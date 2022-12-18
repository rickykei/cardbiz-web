import React, { useState } from 'react';
 
import {
  Card,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  Button,CustomInput,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

const DataListView = ({ product, isSelect, collect, onCheckItem }) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);



  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${product.id}`} className="w-20 w-sm-100">
                <p className="list-item-heading mb-1 ">
                  {product.name_eng}
                </p>
              </NavLink>
              <p className="mb-1 text-small w-10 w-sm-100 ">
                {product.company_id.code}
              </p>
              <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {product.updatedAt}
              </p>
              <p className="w-15 w-sm-100">
                {product.status ? "Active" : "DeActive"}
              </p>
              <ButtonDropdown
                isOpen={dropdownSplitOpen}
                toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
              >
                <Button outline color="info" href={`./staff-profile/${product.id}`} >
                  <IntlMessages id="dropdowns.profile"  />
                </Button>
                <DropdownToggle caret outline color="info" />
                <DropdownMenu>
                 
                   
                  <DropdownItem href={`staff-edit/${product.id}`}>
                    <IntlMessages id="dropdowns.edit" />
                  </DropdownItem>
                  <DropdownItem href={`staff-del/${product.id}`}>
                    <IntlMessages id="dropdowns.delete" />
                  </DropdownItem>

                </DropdownMenu>
              </ButtonDropdown>


            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${product.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
