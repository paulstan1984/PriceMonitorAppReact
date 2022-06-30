import { EditableObject } from "./EditableObject";

export interface Price extends EditableObject {
    id: number;
    product_id: number;
    product_name: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
}
