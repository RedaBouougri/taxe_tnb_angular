import { Component } from '@angular/core';
import { Taxe } from '../models/taxe';
import { TerrainService } from '../services/terrain.service';
import { RedevableService } from '../services/redevable.service';
import { CategoryService } from '../services/category.service';
import { TaxeService } from '../services/taxe.service';
import { Terrain } from '../models/terrain';
import { Category } from '../models/category';
import { Redevable } from '../models/redevable';
import { TauxService } from '../services/taux.service';
import { Taux } from '../models/taux';

@Component({
  selector: 'app-taxe',
  templateUrl: './taxe.component.html',
  styleUrl: './taxe.component.css'
})
export class TaxeComponent {

  constructor(private taxeService :TaxeService,private tauxService: TauxService,private terrainService: TerrainService,private redevableService :RedevableService,private categoryService:CategoryService) { }

  showAddTaxeModal: boolean = false;
  taxes: Taxe[] = [];
  terrains!: Terrain[];
  ltaux: Taux[] = [];
  categories: Category[]=[];
  redevables:Redevable[]=[];
  newTaxe: Taxe = {
    montantBase: 0,  description: '' , redevable: {
    
      cin: '',
      nom: '',
      prenom: '',
    }

  };

  ngOnInit() {
    this.loadTaxes();
    this.getTauxList();
    this.getTerrains();
    this.getCategories();
    this.getRedevables();
  }

  openAddTaxeModal(): void {
    this.showAddTaxeModal = true;
  }

  closeAddTaxeModal(): void {
    this.showAddTaxeModal = false;
  }


  loadTaxes(): void {
    this.taxeService.getTaxesList(localStorage.getItem("cin")||"").subscribe(
      (data) => {
        this.taxes = data;
        console.log('Taxes:', this.taxes);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  getTauxList(): void {
    this.tauxService.getTauxList().subscribe(
      (data) => {
        this.ltaux = data;
        console.log('Taux List:', this.ltaux);
      },
      (error) => {
        console.error('Error fetching Taux list:', error);
      }
    );
  }


  getTerrains() {
    this.terrainService.getTerrains().subscribe(
      (data) => {
        this.terrains = data;
      },
      (error) => {
        console.error('Error fetching terrains:', error);
      }
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getRedevables() {
    this.redevableService.getRedevables().subscribe(
      (data) => {
        this.redevables = data;
      },
      (error) => {
        console.error('Error fetching redevables:', error);
      }
    );
  }

  payerTaxe(): void {
   
      this.newTaxe.redevable.cin = localStorage.getItem('cin') || '';

    this.taxeService.payerTaxe(this.newTaxe)
      .subscribe(
        (result) => {
          this.showAddTaxeModal = false;

          console.log('Taxe added successfully:', result);
        },
        (error) => {
          this.showAddTaxeModal = false;

          console.error('Failed to add Taxe:', error);
        }
      );
  } 


}
