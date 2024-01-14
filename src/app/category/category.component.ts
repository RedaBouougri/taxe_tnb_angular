import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service'; // Adjust the path based on your actual service location

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  showAddCategoryModal: boolean = false;
  newCategory: Category = {
    label: '',  description: ''

  };
  showUpdateCategoryModal: boolean = false;
  selectedCategory: Category = {
    label: '',
    description: ''
  };


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  openAddCategoryModal(): void {
    this.showAddCategoryModal = true;
  }

  closeAddCategoryModal(): void {
    this.showAddCategoryModal = false;
  }

  openUpdateCategoryModal(category: Category): void {
    this.selectedCategory = { ...category }; 
    this.showUpdateCategoryModal = true;
  }

  closeUpdateCategoryModal(): void {
    this.showUpdateCategoryModal = false;
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.selectedCategory).subscribe(
      () => {
        console.log('Category updated successfully.');
        this.loadCategories();
        this.closeUpdateCategoryModal();
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log('Categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  deleteCategory(categoryId?: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        console.log('Category deleted successfully.');
        this.loadCategories();
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }

  addCategory(): void {
    this.categoryService.addCategory(this.newCategory).subscribe(
      () => {
        console.log('Category added successfully.');
        this.loadCategories();
        this.closeAddCategoryModal();
        this.newCategory = { label: '', description: '' };
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }
}
