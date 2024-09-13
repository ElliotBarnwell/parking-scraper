import scrapy

class ParkingSpider(scrapy.Spider):
    name = 'sfbay.craigslist.org'
    allowed_domains = ['sfbay.craigslist.org']

    def __init__(self):
        self.start_urls = [
            "https://sfbay.craigslist.org/search/prk?postal=94123&query=marina%20parking&search_distance=1#search=1~gallery~0~0",
        ]
        
        super().__init__()

    def start_requests(self):
        yield scrapy.Request(url=self.start_urls[0],callback = self.parse, meta=None)

    def parse(self, response):
        links = response.css('li')
        for link in links:
            park_link = link.css('a::attr(href)').extract()
            price = link.css('.price::text').get()
            yield {
                'parkingLink': ''.join(park_link),
                'price': price
            }
        