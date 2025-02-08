import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('ParkingService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('Expect new parking spots to be returned by diff', () => {
    const oldContent = genOldFixture()
    const newContent = genNewFixture()
    const diff = service.calculateDiff(oldContent, newContent)
    
    diff.forEach(function(element) {
        if (element.item !== undefined){
            expect(JSON.stringify(element.item.rhs)).toBeDefined()
        }
        if (element.item !== undefined){
            expect(JSON.stringify(element.item.lhs)).toBeUndefined()
        }
      });
  });

  it('Expect removed parking spots to be returned by diff', () => {
    const oldContent = genNewFixture()
    const newContent = genOldFixture()
    const diff = service.calculateDiff(oldContent, newContent)
    
    diff.forEach(function(element) {
        if (element.item !== undefined){
            expect(JSON.stringify(element.item.rhs)).toBeUndefined()
        }
        if (element.item !== undefined){
            expect(JSON.stringify(element.item.lhs)).toBeDefined()
        }
      });
  });
});


function genOldFixture(): string{
    const oldContent = `
    [   {"parkingLink": "", "price": null},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-sf-marina-parking-covered/7776744656.html", "price": "$375"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-seeking-parking-space/7781607502.html", "price": "$0"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-wanted-storage-parking/7781455948.html", "price": "$0"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-one-car-parking-space/7779401622.html", "price": "$350"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-one-car-parking-in-secure/7777924051.html", "price": "$200"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-garage-motorcycle-parking/7774829885.html", "price": "$150"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-seeking-parking-space/7773888397.html", "price": "$0"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-storage-in-cow-hollow/7777861168.html", "price": "$100"}
    ]
 `
 return oldContent
}

function genNewFixture(): string{
    const newContent = `
    [
        {"parkingLink": "", "price": null},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-sf-marina-parking-covered/7776744656.html", "price": "$375"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-seeking-parking-space/7781607502.html", "price": "$0"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-wanted-storage-parking/7781455948.html", "price": "$0"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-one-car-parking-space/7779401622.html", "price": "$350"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-one-car-parking-in-secure/7777924051.html", "price": "$200"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-garage-motorcycle-parking/7774829885.html", "price": "$150"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-seeking-parking-space/7773888397.html", "price": "$0"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-storage-in-cow-hollow/7777861168.html", "price": "$100"},
        {"parkingLink": "https://sfbay.craigslist.org/sfc/prk/d/san-francisco-storage-in-cow-hollow/7765481580.html", "price": "$100"}
    ]
    `
    return newContent
}