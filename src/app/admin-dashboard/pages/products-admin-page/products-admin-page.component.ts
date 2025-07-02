import { Component, inject, signal } from '@angular/core';
import { ProductTableComponent } from "../../../products/components/product-table/product-table.component";
import { ProductsService } from '@/products/services/products.service';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductImagePipe } from '@/products/pipes/product-image.pipe';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
  styles: ``
})
export class ProductsAdminPageComponent {
  productService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage()
    }),
    loader: ({request}) => {
      return this.productService.getProducts({
        offset: request.page * 9,
        limit: this.productsPerPage()
      });
    }
  });


}
