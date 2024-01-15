import {Category } from '../models/category';
import {Redevable } from '../models/redevable';
import { Taux } from './taux';
import { Terrain } from './terrain';

export class Taxe {

    id?:number;
    tnbAnnee?:number;
    montantBase?:number;
    description?:String;
    redevable!:Redevable;
    category?:Category;
    terain?:Terrain;
    taux?:Taux;


}