import React from 'react';
import { Row } from 'reactstrap';
 
import Pagination from './Pagination';
import DataListView from './DataListView';
 
function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
 
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  sentNotificationEmailSingle,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map((product) => {
        
        return (
          <DataListView
            key={product.id}
            product={product}
            isSelect={selectedItems.includes(product.id)}
            onCheckItem={onCheckItem}
            sentNotificationEmailSingle={sentNotificationEmailSingle}
            collect={collect}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      
    </Row>
  );
};

export default React.memo(ListPageListing);
