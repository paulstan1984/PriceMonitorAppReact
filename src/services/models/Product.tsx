import { EditableObject } from "./EditableObject";

export interface Product extends EditableObject {
    id: number;
    name: string;
    lastPrice: number;
    avgPrice: number;
    created_at: Date;
    updated_at: Date;
}