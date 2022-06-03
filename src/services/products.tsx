import axios from "axios";
import { AppConfigs } from "../config";

class ProductsService {

    private static headers = {
        'Content-Type': 'application/json',
        'Authorization': ''
    }

    public static GetProducts(token: string) {
        ProductsService.headers.Authorization = token;

        return axios.post(AppConfigs.ApiURL + AppConfigs.ProductsRoute, {
            page: "1",
            order_by: "id",
            order_by_dir: "DESC"
        }, {
            headers: ProductsService.headers
        })
    }
}

export default ProductsService;