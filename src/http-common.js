import axios from "axios";
import { servicePath2 } from 'constants/defaultValues';
 
export default axios.create({
  baseURL: servicePath2,
  headers: {
    "Content-type": "application/json"
  }
});
