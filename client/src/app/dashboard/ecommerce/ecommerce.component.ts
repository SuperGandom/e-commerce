import { Component, OnInit,ChangeDetectionStrategy,ViewChild,ElementRef,Renderer2 } from '@angular/core';
import { EcommerceService } from '../../_services/ecommerce.service';
import { Product } from './../../_model/user';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
  @ViewChild("clickButton", {static: false}) clickButton: ElementRef;



  categories :any;
  brands :any;
  categoryCheckedArr :any;
  brandCheckedArr  :any;

  categoryNameArr = [];
  brandNameArr = [];

  tmpTotalData = [];
  totalData = [];
  iteralData = [];
  latestIteralData = [];
  latestDisplay :boolean=false;
  display :boolean=false;
  latestLoadNumber = 3;
  loadNumber = 6;
  loadCnt = 1;

  minPrice=30;
  minSelectedPrice=30;
  maxPrice=5000;
  maxSelectedPrice=5000;

  _currentValues:any;

  sliderKey=false;


  constructor(
    private ecommerceService: EcommerceService,
    private renderer:Renderer2
    ) { }

  ngOnInit(): void {

    this.ecommerceService.getCategories('all').subscribe(res => {
      this.categories = res;
      console.log('this.categories')
      console.log(this.categories)

      if(this.categories && this.categories.length!==0){
        this.categories.forEach(item => {
          this.categoryCheckedArr.push(false);
        })
      }
  
    })

    this.ecommerceService.getBrands('all').subscribe(res => {
      this.brands = res;
      if(this.brands && this.brands.length!==0){
        this.brands&&this.brands.forEach(item => {
          this.brandCheckedArr.push(false)
        })
      }
      console.log('this.brands')
      console.log(this.brands)
    })

    this.ecommerceService.getAllProducts().subscribe(res => {
      console.log('res')
      console.log(res)
      this.tmpTotalData = res;

      console.log('this.tmpTotalDatasd')
      console.log(this.tmpTotalData)
      this.totalData = res;

      this.initData()


    })
  }

  initData() {
    this.latestIteralData = this.totalData.slice(0, this.latestLoadNumber);

    this.iteralData = this.totalData.slice(0, this.loadNumber);
    setTimeout(() => {
      this.latestDisplay = true;
      this.display = true;
      });
   

  //    this.renderer.listen(this.clickButton.nativeElement, 'click', () => {
  //     this.start();
  // });
  }


  loadMore() {
    this.loadCnt++;
    this.iteralData = this.totalData.slice(0, this.loadNumber * this.loadCnt);
  }
  getCheckValue(event, i, key) {

    if (key === "category") {
      if (event.target.checked) {
        this.categoryCheckedArr[i] = true;
      } else {
        this.categoryCheckedArr[i] = false
      }
    } else if (key === "brand") {
      if (event.target.checked) {
        this.brandCheckedArr[i] = true;
      } else {
        this.brandCheckedArr[i] = false
      }
    }


    this.categoryNameArr = [];
    this.brandNameArr = []

    this.categoryCheckedArr.forEach((item, idx) => {
      if (item === true) {
        this.categoryNameArr.push(this.categories[idx].name);
      }
    })

    this.brandCheckedArr.forEach((item, idx) => {
      if (item === true) {
        this.brandNameArr.push(this.brands[idx].name);
      }
    })

    this.totalData = [];


    this.categoryNameArr.forEach(first => {
      this.tmpTotalData.forEach(second => {
        if (first === second.category) {
          this.totalData.push(second)
        }
      })
    })

    this.brandNameArr.forEach(first => {
      this.tmpTotalData.forEach(second => {
        if (first === second.brand) {
          this.totalData.push(second)
        }
      })
    })



    let j = 0;
    let q = 1;
    while (j < this.totalData.length) {


      for (let i = q; i < this.totalData.length; i++) {
        if (this.totalData[j]._id === this.totalData[i]._id)
          this.totalData.splice(i, 1)
      }
      j++;
      q++;
    }




    this.initData();
  }
  Refine() {
    this.totalData = this.tmpTotalData;
    this.initData();
    this.categoryCheckedArr = [];
    this.categories.forEach(item => {
      this.categoryCheckedArr.push(false);
    })
    this.brandCheckedArr = [];
    this.brands.forEach(item => {
      this.brandCheckedArr.push(false)
    })
    this.sliderKey=true;
  }


  onSliderChange(selectedValues: number[]) {
    this.sliderKey=false;
    this._currentValues = selectedValues;
    console.log('this._currentValues')
    console.log(this._currentValues)
    let filterData = [];
    this.tmpTotalData.forEach(item => {
      if (item.salePrice >= this._currentValues[0] && item.salePrice <= this._currentValues[1]) {
        filterData.push(item);
      }
    })
    this.totalData=filterData;
    this.initData();
}
start(){
  console.log('start')
}

ngAfterViewInit() {
  }


}
