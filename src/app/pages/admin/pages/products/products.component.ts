import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../domain/product';
import { Enum } from '../../../../domain/enum';
import { startCase, toNumber } from 'lodash';
import { FileService } from '../../../../services/file.service';
import { environment } from '../../../../../environments/environment';
import { StaticFiles } from '../../../../core/enums/staticFiles';
import { formatSize } from '../../utils/products/formatSize';
import { PRIMENG_MODULES } from '../../../../shared/primeng/primeng-modules';
import { PrimeNG } from 'primeng/config';
import { Table } from 'primeng/table';
import { FileSelectEvent, FileUploadEvent } from 'primeng/fileupload';
import { Column } from '../../utils/products/column.interface';
import { ExportColumn } from '../../utils/products/export-column.interface';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton';
import { ProductService } from '../../../home/products/services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, PRIMENG_MODULES, SkeletonComponent],
  providers: [MessageService, ConfirmationService, ProductService, FileService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  files = [];

  totalSize: number = 0;

  totalSizePercent: number = 0;

  uploadedFiles: any[] = [];

  productDialog: boolean = false;

  isProductEdit = false;

  products!: Product[];

  product!: Product;

  categories: Enum[] = [];

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  isLoading = true;

  skeletonCols = [
    'Sku',
    'Bar Code',
    'Name',
    'Image',
    'Price',
    'Category',
    'Quantity',
  ];

  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private cd = inject(ChangeDetectorRef);
  private config = inject(PrimeNG);
  fileService = inject(FileService);

  ngOnInit(): void {
    this.loadDemoData();
    this.loadCategories();
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  exportCSV(m: MouseEvent) {
    // TODO: RECHECK
    this.dt.exportCSV();
  }

  importCSV(e: FileSelectEvent) {
    // One file uploaded at a time
    const csvFile = e.files[0];
console.log("ddddddddd");

    if (!csvFile) {
      return;
    }

    this.productService.importProducts(csvFile).subscribe({
      complete: () => {
        this.loadDemoData();
        
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Import',
          life: 3000,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Failed to import the selected file!',
          life: 3000,
        });
      },
    });
  }

  loadDemoData() {
    this.productService.getProductsData().subscribe({
      next: data => {
        this.products = data;
        this.cd.markForCheck();
      },
      error: () => console.log('error here'),
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];

    this.cols = [
      { field: 'sku', header: 'Sku' },
      { field: 'barCode', header: 'Bar Code' },
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'price', header: 'Price' },
      { field: 'categoryId', header: 'Category ID' },
      { field: 'quantity', header: 'Quantity' },
    ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: data => {
        this.categories = data.map(category => ({
          ...category,
          name: startCase(category.name),
        }));
      },
      complete: () => (this.isLoading = false),
    });
  }

  getCategoryName(categoryId: number): string | undefined {
    return this.categories.find(c => c.id === categoryId)?.name;
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
    this.isProductEdit = false;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
    this.isProductEdit = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ids = this.selectedProducts?.map(product => product.id!);

        if (!ids) {
          return;
        }

        this.productService.deleteProducts(ids).subscribe({
          next: () => {
            this.products = this.products.filter(
              val => !this.selectedProducts?.includes(val)
            );
            this.selectedProducts = null;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Products Deleted',
              life: 3000,
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: 'Failed to delete selected products!',
              life: 3000,
            });
          },
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.isProductEdit = false;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id!).subscribe({
          next: () => {
            this.products = this.products.filter(val => val.id !== product.id);
            this.product = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Deleted',
              life: 3000,
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'danger',
              summary: 'Failure',
              detail: 'Failed to delete product!',
              life: 3000,
            });
          },
        });
      },
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'danger';
    }
  }

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  saveProduct() {
    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.product.imageFiles = this.files;
        this.productService.editProduct(this.product).subscribe({
          next: () => {
            this.submitted = true;

            this.productDialog = false; // TODO: FALSE
            this.loadDemoData();

            this.product = {};

            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Updated',
              life: 3000,
            });
          },
        });
      } else {
        //this.product.id = this.createId();
        //this.product.image = 'product-placeholder.svg';
        this.product.imageFiles = this.files;
        this.productService.addProduct(this.product).subscribe({
          next: () => {
            this.products.push(this.product);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Created',
              life: 3000,
            });

            this.productDialog = false; // TODO: FALSE
            console.log('after save:', this.product.imageFiles?.at(0)?.bytes);
            this.loadDemoData();

            this.product = {};
          },
        });
      }

      //this.products = [...this.products];
    }
  }

  choose(event: any, callback: any) {
    callback();
  }

  onRemoveTemplatingFile(
    event: any,
    file: any,
    removeFileCallback: any,
    index: any
  ) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: any) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
      life: 3000,
    });
  }

  onSelectedFiles(event: any) {
    this.files = event.currentFiles;
    console.log('files: ', this.files);
    this.files.forEach(file => {
      this.totalSize += parseInt(this.formatSize(1)); // TODO: RECHECK !!!
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: any) {
    callback();
  }

  getProductImage(product: Product) {
    if (!product.imageFiles || product.imageFiles.length == 0)
      return environment.baseUrl + StaticFiles.NotFound;

    return 'data:image/png;base64,' + product.imageFiles[0].bytes;
  }

  deleteImage(productId: string, fileId: string) {
    this.fileService.deleteFile(fileId).subscribe({
      next: () => {
        const prodToModify = this.products.find(f => f.id === productId);

        const sourceImages = this.product.imageFiles ?? [];

        prodToModify!.imageFiles = sourceImages.filter(
          image => image.id !== fileId
        );

        this.product.imageFiles = this.product.imageFiles!.filter(
          image => image.id !== fileId
        );

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'File deleted',
          life: 3000,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Can't delete file!",
          life: 3000,
        });
      },
    });
  }

  formatSize(bytes: any) {
    return formatSize(bytes, this.config.translation.fileSizeTypes);
  }
}
