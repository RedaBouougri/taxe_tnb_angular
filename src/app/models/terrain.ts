import {Category } from '../models/category';
import {Redevable } from '../models/redevable';

export class Terrain {

    id?:number;
    surface!:number;
    nom!:String;
    description!:String;
    redevable?:Redevable;
    category?:Category;


}