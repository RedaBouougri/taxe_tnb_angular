import { Component, OnInit } from '@angular/core';
import { Taux } from '../models/taux';
import { TauxService } from '../services/taux.service'; 
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-taux',
  templateUrl: './taux.component.html',
  styleUrls: ['./taux.component.css']
})
export class TauxComponent implements OnInit {

  ltaux: Taux[] = [];
  categories: Category[] = [];

  showAddTauxModal: boolean = false;
  newTaux: Taux = {
    montant: 0,  annee: 0

  };

  showUpdateTauxModal: boolean = false;
  updateTaux: Taux = {
    montant: 0,  annee: 0

  };

  constructor(private tauxService: TauxService,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getTauxList();
    this.getCategories();
  }

  openAddTauxModal(): void {
    this.showAddTauxModal = true;
  }

  closeAddTauxModal(): void {
    this.showAddTauxModal = false;
  }

  openUpdateTerrainModal(taux: Taux): void {
    this.updateTaux = { ...taux,
      category: this.categories.find(category => category.id === taux.category?.id),
    }
    this.showUpdateTauxModal = true;
  
  }

  closeUpdateTauxModal(): void {
    this.showUpdateTauxModal = false;
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



  deleteTaux(id?: number): void {
    this.tauxService.deleteTaux(id).subscribe(
      () => {
        console.log(`Taux with ID ${id} deleted successfully.`);
        this.getTauxList();
      },
      (error) => {
        console.error(`Error deleting Taux with ID ${id}: ${error.message}`);
      }
    );
  }

  addTaux(): void {
    this.tauxService.addTaux(this.newTaux).subscribe(
      (addedTaux) => {
        this.showAddTauxModal = false;
        this.getTauxList();
      },
      (error) => {
        console.error(`Error adding Taux: ${error.message}`);
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

  onUpdateTaux(): void {
    this.tauxService.updateTaux(this.updateTaux).subscribe(
      (result) => {
        console.log(`Taux updated successfully: `, result);
        this.getTauxList();
        this.showUpdateTauxModal = false;

      },
      (error) => {
        console.error(`Error updating Taux: ${error}`);
      }
    );
  }

  
}
