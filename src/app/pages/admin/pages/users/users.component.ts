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
import { ProductService } from '../../../../services/product.service';
import { Enum } from '../../../../domain/enum';
import { startCase } from 'lodash';
import { FileService } from '../../../../services/file.service';
import { environment } from '../../../../../environments/environment';
import { StaticFiles } from '../../../../core/enums/staticFiles';
import { formatSize } from '../../utils/products/formatSize';
import { PRIMENG_MODULES } from '../../../../shared/primeng/primeng-modules';
import { PrimeNG } from 'primeng/config';
import { Table } from 'primeng/table';
import { FileUploadEvent } from 'primeng/fileupload';
import { Column } from '../../utils/products/column.interface';
import { ExportColumn } from '../../utils/products/export-column.interface';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../user.interface';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, PRIMENG_MODULES],
  templateUrl: './users.component.html',
  providers: [MessageService, ConfirmationService, UserService, FileService],
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  files: any;

  totalSize: number = 0;

  totalSizePercent: number = 0;

  uploadedFiles: any[] = [];

  productDialog: boolean = false;

  isProductEdit = false;

  users!: User[];

  user!: User;

  categories: Enum[] = [];

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private cd = inject(ChangeDetectorRef);
  private config = inject(PrimeNG);
  fileService = inject(FileService);

  ngOnInit(): void {
    this.loadDemoData();
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  exportCSV(m: MouseEvent) {
    // TODO: RECHECK
    this.dt.exportCSV();
  }

  loadDemoData() {
    this.userService.getUsers().subscribe({
      next: data => {
        this.users = data;
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
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'image', header: 'Image' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
    ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  openNew() {
    this.user = {
      email: '',
      firstName: '',
      lastName: '',
      id: '',
      roles: [],
      fullName: '',
    };
    this.submitted = false;
    this.productDialog = true;
    this.isProductEdit = false;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.productDialog = true;
    this.isProductEdit = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ids = this.selectedProducts?.map(product => product.id!);

        if (!ids) {
          return;
        }

        this.userService.deleteUsers(ids).subscribe({
          next: () => {
            this.users = this.users.filter(
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
              severity: 'danger',
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

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.fullName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id!).subscribe({
          next: () => {
            this.users = this.users.filter(val => val.id !== user.id);
            this.user = {
              email: '',
              firstName: '',
              lastName: '',
              id: '',
              roles: [],
              fullName: '',
            };
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
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
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

  saveUser() {
    if (
      this.user.firstName.trim() &&
      this.user.lastName.trim() &&
      this.user.email.trim()
    ) {
      if (this.user.id) {
        this.users[this.findIndexById(this.user.id)] = this.user;
        this.user.profileImage = this.files;
        this.userService.editUser(this.user).subscribe({
          next: () => {
            this.submitted = true;

            this.productDialog = false; // TODO: FALSE
            this.loadDemoData();

            this.user = {
              email: '',
              firstName: '',
              lastName: '',
              id: '',
              roles: [],
              fullName: '',
            };

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
        this.user.profileImage = this.files;
        this.userService.addUser(this.user).subscribe({
          next: () => {
            this.users.push(this.user);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'User Created',
              life: 3000,
            });

            this.productDialog = false; // TODO: FALSE
            this.loadDemoData();

            this.user = {
              email: '',
              firstName: '',
              lastName: '',
              id: '',
              roles: [],
              fullName: '',
            };
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

  uploadEvent(callback: any) {
    callback();
  }

  getUserImage(user: User) {
    if (!user.profileImage)
      return environment.baseUrl + StaticFiles.NotFound;

    return 'data:image/png;base64,' + user.profileImage.bytes;
  }

  deleteImage(userId: string, fileId: string) {
    this.fileService.deleteFile(fileId).subscribe({
      next: () => {
        const userToModify = this.users.find(f => f.id === userId);

        const sourceImages = this.user.profileImage;

        userToModify!.profileImage = undefined;

        this.user.profileImage = undefined;

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
