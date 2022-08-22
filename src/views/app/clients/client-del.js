
import { useHistory ,useParams } from "react-router-dom";
import axios from 'axios';
import { servicePath2 } from 'constants/defaultValues';


const DeleteClientModal = () => {
  const { id }= useParams();
  const apiUrl = `${servicePath2}/companies/${id}`;
 
   
     function fetchData() {
      axios
        .delete(apiUrl)
        .then((res) => {
          return res;
        })
       
         
    }
    fetchData();
   

 
const history = useHistory();
 
 history.goBack();
  
   
};
 
export default DeleteClientModal;
