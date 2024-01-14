import { Component } from '@angular/core';
import { Terrain } from '../models/terrain';
import { TerrainService } from '../services/terrain.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../models/category';
import { Redevable } from '../models/redevable';
import { RedevableService } from '../services/redevable.service';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrl: './terrain.component.css'
})
export class TerrainComponent {

  terrains!: Terrain[];
  categories: Category[]=[];
  redevables:Redevable[]=[];
  newTerrain: Terrain = {
    nom: '', surface: 0, description: '',

  };

  updatingTerrain: Terrain = {
    nom: '', surface: 0, description: '',
    
  };

  showAddTerrainModal: boolean = false;
  showUpdateTerrainModal: boolean = false;


  constructor(private terrainService: TerrainService,private redevableService :RedevableService,private categoryService:CategoryService) { }

  ngOnInit() {
    this.getTerrains();
    this.getCategories();
    this.getRedevables();
  }


  openAddTerrainModal(): void {
    this.showAddTerrainModal = true;
  }

  closeAddTerrainModal(): void {
    this.showAddTerrainModal = false;
  }

  openUpdateTerrainModal(terrain: Terrain): void {
    this.updatingTerrain = { ...terrain,
      category: this.categories.find(category => category.id === terrain.category?.id),
      redevable: this.redevables.find(redevable => redevable.id === terrain.redevable?.id) }; 
    
    this.showUpdateTerrainModal = true;
  }

  closeUpdateTerrainModal(): void {
    this.showUpdateTerrainModal = false;
   
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



  addTerrain(): void {
    this.terrainService.addTerrain(this.newTerrain).subscribe(
      (addedTerrain) => {
        this.getTerrains();
        this.closeAddTerrainModal();
      },
      (error) => {
        console.error('Error adding terrain:', error);
      }
    );
  }

  deleteTerrain(terrain: Terrain) {
    this.terrainService.deleteTerrain(terrain.id).subscribe(
      () => {
        this.getTerrains();
      },
      (error) => {
        console.error('Error deleting terrain:', error);
      }
    );
  }

  updateTerrain(): void {
    if (this.updatingTerrain) {
      this.terrainService.updateTerrain(this.updatingTerrain).subscribe(
        (updatedTerrain) => {
          this.getTerrains();
          this.closeUpdateTerrainModal();
        },
        (error) => {
          console.error('Error updating terrain:', error);
        }
      );
    }
  }




}
