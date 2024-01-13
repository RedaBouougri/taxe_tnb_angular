import { Component } from '@angular/core';
import { Terrain } from '../models/terrain';
import { TerrainService } from '../services/terrain.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrl: './terrain.component.css'
})
export class TerrainComponent {

  terrains!: Terrain[];
  newTerrain: Terrain = {
    nom: '', surface: 0, description: '',

  };

  updatingTerrain: Terrain = {
    nom: '', surface: 0, description: '',

  };
  showAddTerrainModal: boolean = false;


  constructor(private terrainService: TerrainService) { }

  ngOnInit() {
    this.getTerrains();
  }


  openAddTerrainModal(): void {
    this.showAddTerrainModal = true;
  }

  closeAddTerrainModal(): void {
    this.showAddTerrainModal = false;
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

  



}
