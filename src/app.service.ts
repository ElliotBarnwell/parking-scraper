import { Injectable } from '@nestjs/common';
const { spawn } = require('child_process');
const { MailtrapClient } = require("mailtrap");
const diff = require('deep-diff').diff;
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';

const newFp = './parking-spots-new.json';
const oldFp = './parking-spots.json'
const TOKEN = '<MAILTRAP_TOKEN>';

const client = new MailtrapClient({
  token: TOKEN
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Parking scraper",
};
const recipients = [
  {
    email: "ejamesb93@gmail.com",
  }
];

@Injectable()
export class AppService {

  @Cron('0 0 13 * * *')
  emailParkingSpots(): string {
    this.fetchParkingSpots()
    this.checkForNewParkingSpots()
    return 'Parking scraper app!';
  }

  async fetchParkingSpots(): Promise<number> {
    const process = await spawn('python3', ['src/scraper/run_parking_spider.py']);

    process.stdout.on('data', (data) => {
      console.log(`Output: ${data}`);
      return 1;
    });
    
    process.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
      return -1;
    });
    
    process.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
      return code;
    });
    return 0;
  }

  checkForNewParkingSpots(): void {
    console.log("checking for new parking")
    const newContent = this.readNewParkingSpots()
    const oldContent = this.readOldParkingSpots()
    const difference = diff(JSON.parse(oldContent), JSON.parse(newContent));
    console.log(difference);
    const newSpots = [];
    const removedSpots = [];
    if (difference) {
      difference.forEach(function(element) {
        if (element.item !== undefined){
          newSpots.push(JSON.stringify(element.item.rhs));
        }
        if (element.item !== undefined){
          removedSpots.push(JSON.stringify(element.item.lhs));
        }
      });
      console.log(newSpots);
      console.log(removedSpots);
      fs.writeFile(oldFp, newContent, (err) => {
        if (err) {
            console.error('An error occurred:', err);
        } else {
            console.log('File has been overwritten successfully.');
        }
      });
      this.sendEmail(`New Spots: \n ${newSpots.join(",")}\n Removed Spots: \n ${removedSpots.join(",")}`);
      console.log("sent email")
    }



  }
  readNewParkingSpots(): string{
    console.log("reading file")
    const filePath = path.join(process.cwd(), newFp);
    const configFile = fs.readFileSync(filePath, 'utf-8').toString();
    return configFile;
  }
  readOldParkingSpots(): string{
    console.log("reading file")
    const filePath = path.join(process.cwd(), oldFp);
    const configFile = fs.readFileSync(filePath, 'utf-8').toString();
    return configFile;
  }

  updateParkingSpots(): void{

  }

  sendEmail(content): void {
    client
      .send({
        from: sender,
        to: recipients,
        subject: "New Parking Spaces!",
        text: content,
      })
      .then(console.log, console.error);
  }

  getSite(): string {
    return "Parking Spot SPIDERS"
  }
}
