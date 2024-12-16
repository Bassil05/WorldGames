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
  vendors: { id: string, name: string }[] = [];
  mergedGameTemplates: any[] = [];
  filteredItems: any[] = [];
  searchTerm: string = '';

  chunkSize: number = 60;
  chunks: any[] = [];
  currentChunkIndex = 0;
  displayedItems: any[] = [];

  constructor(private apiService: ApiService, private vendorService: VendorService) {}
  ngOnInit(): void {
    this.apiData = this.apiService.getData();
    this.vendors = Object.entries(this.vendorService.getVendors()).map(([id, name]) => ({ id, name }));
    console.log(this.vendors)
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
    this.chunks = this.splitIntoChunks(this.filteredItems, this.chunkSize);
    this.displayedItems = this.chunks[this.currentChunkIndex];
    // console.log(this.mergedGameTemplates)
  }

  loadMoreItems() {
    this.currentChunkIndex++;
    if (this.currentChunkIndex < this.chunks.length) {
      this.displayedItems = [
        ...this.displayedItems,
        ...this.chunks[this.currentChunkIndex],
      ];
    } else {
      console.log('No more items to load.');
    }
  }

  splitIntoChunks(array: any[], chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  onSearch() {
    console.log(this.searchTerm)
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.mergedGameTemplates.filter((item) =>
      item.title?.toLowerCase().includes(term)
    );
    this.resetPagination();
  }

  resetPagination() {
    this.currentChunkIndex = 0;
    this.chunks = this.splitIntoChunks(this.filteredItems, this.chunkSize);
    this.displayedItems = this.chunks[this.currentChunkIndex] || [];
  }
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

    console.log('true')
  }
}