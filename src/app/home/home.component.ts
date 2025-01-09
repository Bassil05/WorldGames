import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorService } from '../service/vendor.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  schemas: [NO_ERRORS_SCHEMA],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apiData: any;
  vendors: { id: string, name: string, isChecked: boolean }[] = [];
  mergedGameTemplates: any[] = [];
  filteredItems: any[] = [];
  searchTerm: string = '';
  loadMoreAvailable: boolean = true;

  chunkSize: number = 60;
  currentChunkIndex = 0;
  displayedItems: any[] = [];

  constructor(private apiService: ApiService, private vendorService: VendorService) { }
  ngOnInit(): void {
    this.apiData = this.apiService.getData();
    this.vendors = Object.entries(this.vendorService.getVendors()).map(([id, name]) => ({ id, name, isChecked: false }));
    const titleMap = Object.fromEntries(
      this.apiData.GameTemplateNameTranslations.map((item: any) => [
        item.GameTemplateId,
        item.Value,
      ])
    );
    const imageMap = Object.fromEntries(
      this.apiData.GameTemplateImages.map((item: any) => [
        item.GameTemplateId,
        item.CdnUrl,
      ])
    );

    this.mergedGameTemplates = this.apiData.GameTemplates.map((template: any) => ({
      ...template,
      title: titleMap[template.ID] || null,
      cdnUrl: imageMap[template.ID] || null,
    })).sort((a: any, b: any) => a.DefaultOrdering - b.DefaultOrdering);

    this.filteredItems = [...this.mergedGameTemplates];
    this.setDisplayedItems()
    console.log(this.mergedGameTemplates)
  }

  setLoadMoreAvailable() {
    this.loadMoreAvailable = (this.currentChunkIndex + 1) * this.chunkSize < this.filteredItems.length
  }
  loadMoreItems() {
    if (this.loadMoreAvailable) {
      this.currentChunkIndex++
      this.setDisplayedItems()
    }
    else {
      console.log('No more items to load.');
    }
  }

  setDisplayedItems() {
    this.displayedItems = this.filteredItems.slice(0, (this.currentChunkIndex + 1) * this.chunkSize);
    this.setLoadMoreAvailable()
  }

  onSearch() {
    console.log(this.searchTerm);
    this.filterGamesByVendorsAndSearch();
  }

  resetPagination() {
    this.currentChunkIndex = 0;
    this.setDisplayedItems()
  }
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onVendorSelectChanged(vendor: any): void {
    vendor.isChecked = !vendor.isChecked;
    this.filterGamesByVendorsAndSearch();
  }

  filterGamesByVendorsAndSearch() {
    let selectedVendorsIds: Number[] = this.vendors.filter(item => item.isChecked)
      .map(item => Number(item.id));
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.mergedGameTemplates;

    if (selectedVendorsIds.length > 0) {
      this.filteredItems = this.filteredItems.filter(item => selectedVendorsIds.includes(item.GameVendorId));
    }

    if (term.length > 0) {
      this.filteredItems = this.filteredItems.filter(item => item.title?.toLowerCase().includes(term));
    }

    this.resetPagination();
  }
}