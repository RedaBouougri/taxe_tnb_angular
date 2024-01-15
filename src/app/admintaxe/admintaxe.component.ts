import { Component } from '@angular/core';
import { TaxeService } from '../services/taxe.service';
import { Taxe } from '../models/taxe';

@Component({
  selector: 'app-admintaxe',
  templateUrl: './admintaxe.component.html',
  styleUrl: './admintaxe.component.css'
})
export class AdmintaxeComponent {

  taxes: Taxe[] = [];

  constructor(private taxeService: TaxeService) { }

  ngOnInit(): void {
    this.loadTaxes();
  }

  loadTaxes(): void {
    this.taxeService.adminTaxes().subscribe(
      (data) => {
        this.taxes = data;
        console.log('Taxes:', this.taxes);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  accepterTaxe(newTaxe:Taxe): void {
    this.taxeService.accepterTaxe(newTaxe).subscribe(
      () => {
        console.log('taxe added successfully.');
        this.loadTaxes();
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }



}
